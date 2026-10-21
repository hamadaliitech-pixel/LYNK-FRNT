import ellipse from "../assets/fig/ellipse.svg";
import vector from "../assets/fig/vector.svg";

const Fig = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f1ed] p-6">
      <div className="flex h-[420px] w-[420px] max-w-full items-center justify-center rounded-[32px] border border-[#221d1a]/5 bg-[#fcfbf9] shadow-[0_22px_48px_rgba(31,22,17,0.08)]">
        <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44">
          <img
            src={ellipse}
            alt=""
            className="absolute inset-0 h-full w-full select-none object-contain"
          />
          <img
            src={vector}
            alt=""
            className="absolute inset-[7%_4%_11%_11%] h-[82%] w-[82%] select-none object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.65)]"
          />
        </div>
      </div>
    </main>
  );
};

export default Fig;
