import React, { useEffect, useState } from "react";
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import {
  categoriesData,
  subCategory,
  footwearSubCategories,
  sleeveType,
  neckType,
  color,
  fabric,
  ratings,
  pattern,
  occasion,
  accessorySubCategories,
  shoeOccasions,
  fit,
  gender,
  fragrance,
} from "../../static/data";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { Hourglass } from "react-loader-spinner";

const CreateProduct = () => {
  // const { seller } = useSelector((state) => state.seller);

  let { id } = useParams();
  const seller = id;
  const { user } = useSelector((state) => state.user);

  // console.log("user._id",user._id)
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedShoesSubCategory, setSelectedShoesSubCategory] = useState([]);
  const [
    selectedAccessoriesSubCategory,
    setSelectedAccessoriesSubCategory,
  ] = useState([]);
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [ShopPrice, setShopPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [selectedSleeveType, setSelectedSleeveType] = useState([]);
  const [selectedNeckType, setSelectedNeckType] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  // const [selectedColor, setSelectedColor] = useState("");
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedFabric, setSelectedFabric] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState("");
  const [selectedPattern, setSelectedPattern] = useState([]);
  const [selectedFragrance, setSelectedFragrance] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState([]);
  const [selectedShoesOccasion, setSelectedShoesOccasion] = useState([]);
  const [selectedFit, setSelectedFit] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [sizesAndQuantities, setSizesAndQuantities] = useState([
    { size: "", quantity: 0 },
  ]);

  const sizes = [
    "Free Size",
    "3XS",
    "2XS",
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "2XL",
    "3XL",
    "4XL",
    "5XL",
    "6XL",
    "7XL",
    "8XL",
    "22",
    "24",
    "26",
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
    "40",
    "42",
    "44",
    "46",
    "48",
    "50",
    "52",
    "54",
    "56",
    "58",
    "60",
    "3",
    "3.5",
    "4",
    "4.5",
    "5",
    "5.5",
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "12.5",
    "13",
    "13.5",
    "14",
    "14.5",
    "15",
    "15.5",
    "16",
    "Free",
    "32B",
    "34B",
    "36B",
    "38B",
    "30B",
    "40B",
    "34C",
    "32C",
    "36C",
    "38C",
    "40C",
    "32A",
    "30A",
    "34A",
    "28A",
    "28B",
    "32D",
    "36D",
    "34D",
    "30C",
    "42C",
    "38D",
    "44C",
    "42B",
    "40D",
    "44B",
    "36A",
    "42D",
    "44D",
    "30D",
    "38A",
    "XXL",
    "40A",
    "28C",
    "34E",
    "36E",
    "32E",
    "XXS",
    "38E",
    "40E",
    "34DD",
    "46C",
    "32DD",
    "42E",
    "28D",
    "36F",
    "38DD",
    "46B",
    "40F",
    "36DD",
    "34F",
    "32F",
    "44E",
    "42A",
    "38F",
    "48C",
    "46D",
    "44A",
    "40DD",
    "48D",
    "50C",
    "50B",
    "42F",
    "42DD",
    "44F",
    "44DD",
    "38G",
    "40G",
    "30DD",
    "46E",
    "36G",
    "34G",
    "40H",
    "32H",
    "30E",
    "32G",
    "46F",
    "34H",
    "50D",
    "34Z",
    "36H",
    "30Z",
    "52C",
    "52B",
    "40I",
    "38I",
    "36I",
    "42G",
    "38Z",
    "38H",
    "36Z",
    "34I",
    "32Z",
    "32I",
    "30G",
    "44H",
    "42Z",
    "14D",
    "14C",
    "8E",
    "46H",
    "40Z",
    "28E",
    "14B",
    "46I",
    "46G",
    "40FF",
    "38FF",
    "30F",
    "14E",
    "14A",
    "8D",
    "50E",
    "48E",
    "44Z",
    "44I",
    "42I",
    "42H",
    "28DD",
    "18B",
    "16E",
    "16C",
    "12C",
    "12B",
    "10E",
    "10D",
    "10A",
    "10 ml","20 ml", "30 ml", "40 ml", "50 ml", "60 ml", "70 ml", "80 ml", "90 ml", "100 ml", "110 ml", "120 ml", "130 ml", "140 ml", "150 ml", "160 ml", "170 ml", "180 ml", "190 ml", "200 ml", "210 ml", "220 ml", "230 ml", "240 ml", "250 ml", "260 ml", "270 ml", "280 ml", "290 ml", "300 ml", "310 ml", "320 ml", "330 ml", "340 ml", "350 ml", "360 ml", "370 ml", "380 ml", "390 ml", "400 ml", "410 ml", "420 ml", "430 ml", "440 ml", "450 ml", "460 ml", "470 ml", "480 ml", "490 ml", "25 ml", "35 ml", "45 ml", "55 ml", "65 ml", "75 ml", "85 ml", "95 ml", "105 ml", "115 ml", "125 ml", "135 ml", "145 ml", "155 ml", "165 ml", "175 ml", "185 ml", "195 ml", "205 ml", "215 ml", "225 ml", "235 ml", "245 ml", "255 ml", "265 ml", "275 ml", "285 ml", "295 ml", "305 ml", "315 ml", "325 ml", "335 ml", "345 ml", "355 ml", "365 ml", "375 ml", "385 ml", "395 ml", "405 ml", "415 ml", "425 ml", "435 ml", "445 ml", "455 ml", "465 ml", "475 ml", "485 ml", "495 ml"

  ];
  useEffect(() => {
    if (error) {
      toast.error(error, {
        autoClose: 1000, // Duration in milliseconds
      });
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/admin-sellers");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  const handleAddSizeQuantity = () => {
    setSizesAndQuantities([...sizesAndQuantities, { size: "", quantity: 0 }]);
  };
  const handleColorChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add the color to the selectedColors array
      setSelectedColor((prevColors) => [...prevColors, value]);
    } else {
      // Remove the color from the selectedColors array
      setSelectedColor((prevColors) =>
        prevColors.filter((color) => color !== value)
      );
    }
  };
  const handleFabricChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedFabric((prevFabrics) => [...prevFabrics, value]);
    } else {
      setSelectedFabric((prevFabrics) =>
        prevFabrics.filter((fabric) => fabric !== value)
      );
    }
  };
  const handleRatingsChange = (event) => {
    const selectedRating = event.target.value;
    setSelectedRatings(selectedRating); // Update the state to store a single rating
  };
  

  const handlePatternChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedPattern((prevPatterns) => [...prevPatterns, value]);
    } else {
      setSelectedPattern((prevPatterns) =>
        prevPatterns.filter((pattern) => pattern !== value)
      );
    }
  };
  const handleFragranceChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedFragrance((prevFragrances) => [...prevFragrances, value]);
    } else {
      setSelectedFragrance((prevFragrances) =>
        prevFragrances.filter((fragrance) => fragrance !== value)
      );
    }
  };
  const handleOccasionChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedOccasion((prevOccasions) => [...prevOccasions, value]);
    } else {
      setSelectedOccasion((prevOccasions) =>
        prevOccasions.filter((occasion) => occasion !== value)
      );
    }
  };

  const handleFitChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedFit((prevFits) => [...prevFits, value]);
    } else {
      setSelectedFit((prevFits) => prevFits.filter((fit) => fit !== value));
    }
  };

  const handleSleeveTypeChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedSleeveType((prevSleeveTypes) => [...prevSleeveTypes, value]);
    } else {
      setSelectedSleeveType((prevSleeveTypes) =>
        prevSleeveTypes.filter((sleeveType) => sleeveType !== value)
      );
    }
  };

  const handleNeckTypeChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedNeckType((prevNeckTypes) => [...prevNeckTypes, value]);
    } else {
      setSelectedNeckType((prevNeckTypes) =>
        prevNeckTypes.filter((neckType) => neckType !== value)
      );
    }
  };

  const handleShoeOccasionsChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedShoesOccasion((prevShoeOccasions) => [
        ...prevShoeOccasions,
        value,
      ]);
    } else {
      setSelectedShoesOccasion((prevShoeOccasions) =>
        prevShoeOccasions.filter((shoeOccasion) => shoeOccasion !== value)
      );
    }
  };

  const handleAccessoriesSubCategoryChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedAccessoriesSubCategory((prevAccessoriesSubCategories) => [
        ...prevAccessoriesSubCategories,
        value,
      ]);
    } else {
      setSelectedAccessoriesSubCategory((prevAccessoriesSubCategories) =>
        prevAccessoriesSubCategories.filter(
          (accessorySubCategory) => accessorySubCategory !== value
        )
      );
    }
  };

  const handleFootwearSubCategoryChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedShoesSubCategory((prevFootwearSubCategories) => [
        ...prevFootwearSubCategories,
        value,
      ]);
    } else {
      setSelectedShoesSubCategory((prevFootwearSubCategories) =>
        prevFootwearSubCategories.filter(
          (footwearSubCategory) => footwearSubCategory !== value
        )
      );
    }
  };

  const handleSubCategoryChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedSubCategory((prevSubCategories) => [
        ...prevSubCategories,
        value,
      ]);
    } else {
      setSelectedSubCategory((prevSubCategories) =>
        prevSubCategories.filter((subCategory) => subCategory !== value)
      );
    }
  };

  const handleRemoveSizeQuantity = (index) => {
    const updatedSizesAndQuantities = [...sizesAndQuantities];
    updatedSizesAndQuantities.splice(index, 1);
    setSizesAndQuantities(updatedSizesAndQuantities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // console.log({
    //   name,
    //   description,
    //   category,
    //   tags,
    //   shopPrice,
    //   originalPrice,
    //   discountPrice,
    //   stock: sizesAndQuantities,
    //   images,
    //   sleeveType: selectedSleeveType,
    //   neckType: selectedNeckType,
    //   brand: selectedBrand,
    //   color: selectedColor,
    //   fabric: selectedFabric,
    //   occasion: selectedOccasion,
    //   fit: selectedFit,
    //   gender: selectedGender,
    //   shopId: seller._id,
    // });
    const stockData = sizesAndQuantities.map(({ size, quantity }) => ({
      size,
      quantity,
    }));

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("tags", tags);
    newForm.append("Shop's Price", ShopPrice);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("category", category);
    newForm.append("subCategory", selectedSubCategory.join(","));
    newForm.append("footwearSubCategories", selectedShoesSubCategory.join(","));
    newForm.append(
      "accessorySubCategories",
      selectedAccessoriesSubCategory.join(",")
    );
    newForm.append("neckType", selectedNeckType.join(","));
    newForm.append("fragrance", selectedFragrance.join(","));
    newForm.append("sleeveType", selectedSleeveType.join(","));
    newForm.append("brand", selectedBrand);
    newForm.append("color", selectedColor.join(","));
    newForm.append("fabric", selectedFabric.join(","));
    newForm.append("ratings", selectedRatings);
    newForm.append("pattern", selectedPattern.join(","));
    newForm.append("occasion", selectedOccasion.join(","));
    newForm.append("shoeOccasions", selectedShoesOccasion.join(","));
    newForm.append("fit", selectedFit.join(","));
    newForm.append("gender", selectedGender);
    newForm.append("shopId", seller._id);
    newForm.append("adminCreated", user._id);
    dispatch(
      createProduct({
        name,
        description,
        tags,
        ShopPrice,
        originalPrice,
        discountPrice,
        stock: stockData,
        category,
        footwearSubCategories: selectedShoesSubCategory,
        accessorySubCategories: selectedAccessoriesSubCategory,
        shoeOccasions: selectedShoesOccasion,
        subCategory: selectedSubCategory,
        neckType: selectedNeckType,
        sleeveType: selectedSleeveType,
        brand: selectedBrand,
        color: selectedColor,
        fragrance: selectedFragrance,
        fabric: selectedFabric,
        ratings: selectedRatings,
        pattern: selectedPattern,
        occasion: selectedOccasion,
        fit: selectedFit,
        gender: selectedGender,
        shopId: seller,
        adminCreated: user,
        images,
      })
    );
  };

  console.log("category", category);
  return (
    <div className="w-[90%] 800px:w-[50%] bg-blue-50 shadow h-[100vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <br />

        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags..."
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Shop's Price</label>
          <input
            type="number"
            name="price"
            value={ShopPrice}
            onChange={(e) => setShopPrice(e.target.value)}
            placeholder="Enter your product price..."
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product price..."
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product price with discount..."
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Size and Quantity</label>
          {sizesAndQuantities.map((item, index) => (
            <div key={index} className="flex mt-2">
              <select
                className="w-1/2 border h-[35px] rounded-[5px] mr-2"
                value={item.size}
                onChange={(e) => {
                  const updatedSizesAndQuantities = [...sizesAndQuantities];
                  updatedSizesAndQuantities[index].size = e.target.value;
                  setSizesAndQuantities(updatedSizesAndQuantities);
                }}
              >
                <option value="">Select size</option>
                {sizes.map((size) => (
                  <option value={size} key={size}>
                    {size}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const updatedSizesAndQuantities = [...sizesAndQuantities];
                  updatedSizesAndQuantities[index].quantity = parseInt(
                    e.target.value,
                    10
                  );
                  setSizesAndQuantities(updatedSizesAndQuantities);
                }}
                placeholder="Enter product quantity..."
                className="w-1/2 border h-[35px] rounded-[5px] mr-2 px-3"
              />
              {index === sizesAndQuantities.length - 1 && (
                <AiOutlinePlusCircle
                  size={30}
                  className="mt-1 cursor-pointer"
                  color="#555"
                  onClick={handleAddSizeQuantity}
                />
              )}
              {index !== sizesAndQuantities.length - 1 && (
                <AiOutlineMinusCircle
                  size={30}
                  className="mt-1 cursor-pointer"
                  color="red"
                  onClick={() => handleRemoveSizeQuantity(index)}
                />
              )}
            </div>
          ))}
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose a category</option>
            {categoriesData.map((i) => (
              <option value={i.title} key={i.title}>
                {i.title}
              </option>
            ))}
          </select>
        </div>
        {category === "Clothes" && (
          <div>
            <label className="pb-2">Subcategory</label>
            <div className="mt-2">
              {subCategory.map((type) => (
                <div key={type.title}>
                  <input
                    type="checkbox"
                    id={type.title}
                    value={type.title}
                    onChange={handleSubCategoryChange}
                    checked={selectedSubCategory.includes(type.title)}
                  />
                  <label htmlFor={type.title} className="ml-2">
                    {type.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        {category === "Footwear" && (
          <div>
            <label className="pb-2">Footwear Subcategories</label>
            <div className="mt-2">
              {footwearSubCategories.map((type) => (
                <div key={type.title}>
                  <input
                    type="checkbox"
                    id={type.title}
                    value={type.title}
                    onChange={handleFootwearSubCategoryChange}
                    checked={selectedShoesSubCategory.includes(type.title)}
                  />
                  <label htmlFor={type.title} className="ml-2">
                    {type.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        {category === "Accessories" && (
          <div>
            <label className="pb-2">Accessory Subcategories</label>
            <div className="mt-2">
              {accessorySubCategories.map((type) => (
                <div key={type.title}>
                  <input
                    type="checkbox"
                    id={type.title}
                    value={type.title}
                    onChange={handleAccessoriesSubCategoryChange}
                    checked={selectedAccessoriesSubCategory.includes(
                      type.title
                    )}
                  />
                  <label htmlFor={type.title} className="ml-2">
                    {type.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        <br />

        <br/>
        <br/>
        <br/>
        <br/>

        {selectedAccessoriesSubCategory[0] === "Perfumes" && (
          <div>
            <label className="pb-2">Fragrance</label>
            <div className="mt-2">
              {fragrance.map((type) => (
                <div key={type.type}>
                  <input
                    type="checkbox"
                    id={type.type}
                    value={type.type}
                    onChange={handleFragranceChange}
                    checked={selectedFragrance.includes(
                      type.type
                    )}
                  />
                  <label htmlFor={type.type} className="ml-2">
                    {type.type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <br/>
        <br/>
        <br/>

        {category === "Clothes" && (
          <div>
            <label className="pb-2">Neck Type</label>
            <div className="mt-2">
              {neckType.map((type) => (
                <div key={type.title}>
                  <input
                    type="checkbox"
                    id={type.title}
                    value={type.title}
                    onChange={handleNeckTypeChange}
                    checked={selectedNeckType.includes(type.title)}
                  />
                  <label htmlFor={type.title} className="ml-2">
                    {type.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <br />
        
        <div>
          <label className="pb-2">
            Brand <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            placeholder="Enter your product name..."
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        {category === "Clothes" && (
          <div>
            <label className="pb-2">Sleeve Type</label>
            <div className="mt-2">
              {sleeveType.map((type) => (
                <div key={type.title}>
                  <input
                    type="checkbox"
                    id={type.title}
                    value={type.title}
                    onChange={handleSleeveTypeChange}
                    checked={selectedSleeveType.includes(type.title)}
                  />
                  <label htmlFor={type.title} className="ml-2">
                    {type.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <br />
        <div>
          <label className="pb-2">Color</label>
          <div className="mt-2">
            {color.map((type) => (
              <div key={type.name}>
                <input
                  type="checkbox"
                  id={type.name}
                  value={type.name}
                  onChange={handleColorChange}
                  checked={selectedColor.includes(type.name)}
                />
                <label htmlFor={type.name} className="ml-2">
                  {type.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <br />
        {category === "Clothes" && (
          <div>
            <label className="pb-2">Fabric</label>
            <div className="mt-2">
              {fabric.map((type) => (
                <div key={type.type}>
                  <input
                    type="checkbox"
                    id={type.type}
                    value={type.type}
                    onChange={handleFabricChange}
                    checked={selectedFabric.includes(type.type)}
                  />
                  <label htmlFor={type.type} className="ml-2">
                    {type.type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <br />
        {category === "Clothes" && (
          <div>
            <label className="pb-2">Pattern</label>
            <div className="mt-2">
              {pattern.map((type) => (
                <div key={type.type}>
                  <input
                    type="checkbox"
                    id={type.type}
                    value={type.type}
                    onChange={handlePatternChange}
                    checked={selectedPattern.includes(type.type)}
                  />
                  <label htmlFor={type.type} className="ml-2">
                    {type.type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <br />
        {category === "Footwear" && (
          <div>
            <label className="pb-2">Shoe Occasions</label>
            <div className="mt-2">
              {shoeOccasions.map((type) => (
                <div key={type.type}>
                  <input
                    type="checkbox"
                    id={type.type}
                    value={type.type}
                    onChange={handleShoeOccasionsChange}
                    checked={selectedShoesOccasion.includes(type.type)}
                  />
                  <label htmlFor={type.type} className="ml-2">
                    {type.type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        {category === "Clothes" && (
          <div>
            <label className="pb-2">Occasion</label>
            <div className="mt-2">
              {occasion.map((type) => (
                <div key={type.type}>
                  <input
                    type="checkbox"
                    id={type.type}
                    value={type.type}
                    onChange={handleOccasionChange}
                    checked={selectedOccasion.includes(type.type)}
                  />
                  <label htmlFor={type.type} className="ml-2">
                    {type.type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        <br />
        {category === "Clothes" && (
          <div>
            <label className="pb-2">Fit</label>
            <div className="mt-2">
              {fit.map((type) => (
                <div key={type.type}>
                  <input
                    type="checkbox"
                    id={type.type}
                    value={type.type}
                    onChange={handleFitChange}
                    checked={selectedFit.includes(type.type)}
                  />
                  <label htmlFor={type.type} className="ml-2">
                    {type.type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <br />
        <div>
  <label className="pb-2">Ratings</label>
  <div className="mt-2">
    {ratings.map((type) => (
      <div key={type.type}>
        <input
          type="radio"
          id={type.type}
          name="rating" // Add a name attribute to group the radio buttons
          value={type.type}
          onChange={handleRatingsChange} // Ensure this handles single value selection
          checked={selectedRatings === type.type} // Update this condition
        />
        <label htmlFor={type.type} className="ml-2">
          {type.type}
        </label>
      </div>
    ))}
  </div>
</div>

          <br/>
          <br/>
          <br/>
        <div>
          <label className="pb-2">Gender</label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="">Choose Gender type</option>
            {gender.map((i) => (
              <option value={i.type} key={i.type}>
                {i.type}
              </option>
            ))}
          </select>
        </div>
        <br />
        <br/>
        <br/>
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>

          <div className="w-full flex items-center flex-wrap">
            {images &&
              images.map((image, index) => (
                <div key={index} className="relative m-2">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="h-[120px] w-[120px] object-cover"
                  />
                  <AiOutlineClose
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                  />
                </div>
              ))}

            {/* Label to show the file input when clicked */}
            <label htmlFor="upload" className="cursor-pointer m-2">
              <AiOutlinePlusCircle size={30} color="#555" />
            </label>
            <input
              type="file"
              id="upload"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div>
          <div>
            {loading ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Hourglass
                  height={50}
                  width={50}
                  color="cyan"
                  ariaLabel="circles-loading"
                />
              </div>
            ) : (
              <input
                type="submit"
                value="Create"
                className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;