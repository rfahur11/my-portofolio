// src/app/components/HeroSection.js

const HeroSection = () => {
  return (
    <div className="relative flex flex-col items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6 p-8">
      <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10">
        <div className="text-left">
          <h2 className="text-md font-extrabold leading-10 tracking-tight text-fuchsia-100 sm:text-2xl sm:leading-none md:text-md font-preahvihear">
            I'm a Software Engineer.|
          </h2>
          <p className="text-fuchsia-50 max-w-md mx-auto mt-3 text-base sm:text-lg md:mt-5 md:text-sm md:max-w-3xl">
            Currently, I'm a Software Engineer at Facebook,
          </p>
          <p className="max-w-md mx-auto mt-3 text-base text-fuchsia-50 sm:text-sm md:mt-5 md:text-lg md:max-w-3xl">
            A self-taught UI/UX designer, functioning in the industry for 3+
            years now. I make meaningful and delightful digital products that
            create an equilibrium between user needs and business goals.
          </p>
        </div>
      </div>
      <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pl-10">
        <div className="relative w-full p-3 rounded md:p-8">
          <div className="rounded-lg">
            <img src="/picture.png" alt="Hero" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
