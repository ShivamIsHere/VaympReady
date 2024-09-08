import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { server } from '../../server';
const SignUpPage = () => {
    const handleGoogleLoginSuccess = () => {
        window.location.href = 'http://localhost:8000/api/v2/authRoutes/google';
      };
  const login = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: () => {
      toast.error("Google Login Failed!");
    }
  });

  return (
    <div className="relative w-full flex justify-center py-2">
      <button
        onClick={() => login()}
        className="bg-white text-black font-semibold py-2 px-4 rounded flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors duration-300"
      >
        <img
          src={`${process.env.PUBLIC_URL}/googlelogo.png`}
          alt="Google Logo"
          className="w-5 h-5 mr-2"
        />
        Sign Up with Google
      </button>
    </div>
  );
};

export default SignUpPage;
