import { useNavigate } from "react-router-dom";

const ButtonSignup = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate("/SignUp")}
        className="lynk-button"
      >
        Sign up
      </button>
    </div>
  );
};

export default ButtonSignup;
