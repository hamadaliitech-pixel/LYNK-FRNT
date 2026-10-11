import Lynk from "../assets/Lynk.png";
import Sprkl from "../assets/Sprkl.svg";
const Logo_content = ({text}) => {
  return (
    <div className="upper content flex w-full flex-col gap-1 p-5">
      <div className="justify-start">
        <div className="w-screen pl-25">
          <img src={Sprkl} alt="Sprkl Logo" className="w-10" />
        </div>
        <img src={Lynk} alt="Logo" className="w-30" />
      </div>
      <h1 className="font-sans text-[30px] font-semibold leading-[1.12] tracking-[-0.045em] text-white sm:text-[36px] lg:text-[40px] my-button">
        {text}
      </h1>
    </div>
  );
};

export default Logo_content;
