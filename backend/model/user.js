const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
  },
  password:{
    type: String,
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  phoneNumber:{
    type: Number,
  },
  addresses:[
    {
      userName:{
        type: String,
      },   
      city:{
        type: String,
      },
      address1:{
        type: String,
      },
      address2:{
        type: String,
        default:"",
      },
      zipCode:{
        type: Number,
      },
      altphoneNumber:{
        type: Number,
        default:"",
      },
      landmark:{
        type:String,
        default:"",
      },
      state:{
        type:String,
        default:"",
      },
      phoneNumber:{
        type:Number,
      },
      addressType:{
        type: [String],
      default: [],
      },
      isLastUsed: {
        type: Boolean,
        default: false,
      },    
    }
  ],
  role:{
    type: String,
    default: "user",
  },
  avatar:{
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
 },
  googleId: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT token generation
userSchema.methods.getJwtToken = function() {
  return jwt.sign({ id: this._id, googleId: this.googleId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '90d',
  });
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
