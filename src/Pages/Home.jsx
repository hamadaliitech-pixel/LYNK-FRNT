
import img from "../assets/LynkHome.png";
import Logo_content from "../Components/Logo_content";
import ButtonSignup from "../Components/btns/ButtonSignup";

const Home = () => {
  return (
   <main className="relative h-screen w-full overflow-hidden">
  {/* Background image */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <img
      src={img}
      alt=""
      className="h-full w-full object-cover object-center"
    />
  </div>

  <div className="absolute inset-0 pointer-events-none" />

  <div className="relative z-10 flex h-full w-full flex-col justify-start pt-12 pb-5">
    <header>
      <Logo_content text={"Your Social Media Accounts"} />
    </header>

    <div className="flex justify-start p-2">
      <ButtonSignup />
    </div>
  </div>
</main>
  );
};

export default Home;
