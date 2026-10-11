import img from "../assets/LynkHome.png";
import Logo_content from "../Components/Logo_content";
import ButtonSignup from "../Components/btns/ButtonSignup";
const Home = () => {
  return (
    <div>
      <div
        className="flex h-screen w-full items-end justify-center bg-cover bg-center bg-no-repeat pb-5"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="All-content-container flex flex-col h-screen justify-between w-screen pt-50">
          <Logo_content text={"Your Social Media Accounts"}/>

          <div className="lower-content btn flex justify-center">
            <ButtonSignup />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
