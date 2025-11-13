import Lottie from "lottie-react";
import howItWorksAnim from "../assets/animations/HowItWorks.json";
import missionAnim from "../assets/animations/Mission.json";

const StaticSections = () => {
  return (
    <>
      {/* ---------- HOW IT WORKS ---------- */}
      <section
        className="bg-base-200 py-20 rounded-lg overflow-hidden mt-0"
        data-aos="fade-up"
      >
        {/* TOP: Title + Lottie */}
        <div className="text-center flex flex-col items-center gap-6 mb-16 px-4">
          <h2 className="text-4xl font-extrabold text-primary">
            How It Works 🍴
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sharing food is simple — follow these three easy steps to make a
            difference in your community.
          </p>

          {/* Animation centered and responsive */}
          <div
            data-aos="zoom-in"
            data-aos-delay="100"
            className="flex justify-center w-full"
          >
            <Lottie
              animationData={howItWorksAnim}
              loop
              className="w-64 sm:w-80 md:w-96"
            />
          </div>
        </div>

        {/* BOTTOM: 3 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {/* Step 1 */}
          <div
            className="p-6 bg-base-100 rounded-xl shadow hover:shadow-xl transition-all duration-200 border-t-4 border-primary text-center flex flex-col justify-between"
            data-aos="fade-up"
          >
            <h3 className="font-bold text-xl mb-3 text-primary">
              1️⃣ Post Food
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Add your surplus meal details — name, portion size, and pickup
              location — and make it available to others.
            </p>
          </div>

          {/* Step 2 */}
          <div
            className="p-6 bg-base-100 rounded-xl shadow hover:shadow-xl transition-all duration-200 border-t-4 border-success text-center flex flex-col justify-between"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="font-bold text-xl mb-3 text-success">
              2️⃣ Find Food
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Browse shared meals near you, view full details, and request what
              fits your needs. It’s that easy!
            </p>
          </div>

          {/* Step 3 */}
          <div
            className="p-6 bg-base-100 rounded-xl shadow hover:shadow-xl transition-all duration-200 border-t-4 border-accent text-center flex flex-col justify-between"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="font-bold text-xl mb-3 text-accent">
              3️⃣ Collect Food
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Coordinate pickup with the donor, collect your meal, and share the
              joy of reducing food waste together!
            </p>
          </div>
        </div>
      </section>

      {/* ---------- OUR MISSION ---------- */}
      <section
        className="text-center py-20 bg-base-100 max-w-5xl mx-auto"
        data-aos="fade-up"
      >
        {/* Title + Animation */}
        <h2 className="text-4xl font-extrabold text-primary mt-4">
            Our
          </h2>
        <div className="flex flex-col items-center justify-center mb-8">
          <Lottie
            animationData={missionAnim}
            loop
            className="w-44 sm:w-56 md:w-64"
            data-aos="zoom-in"
          />
          
        </div>

        {/* Text */}
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed px-4">
          Our goal is to reduce food waste and strengthen community bonds.
          Together, we can create a sustainable world where every plate serves
          a purpose and none go empty.
        </p>
      </section>
    </>
  );
};

export default StaticSections;