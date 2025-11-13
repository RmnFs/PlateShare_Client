import { Link } from "react-router";
import Lottie from "lottie-react";
import heroFood from "../assets/animations/heroFood.json";
import donateAnim from "../assets/animations/donate.json";
import FeaturedFoods from "../components/FeaturedFoods";
import StaticSections from "../components/StaticSections";
import ExpiringSoon from "../components/ExpiringSoon";

const Home = () => {

return (

<>

{/* ---------- HERO SECTION ---------- */}


      <section
        className="relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-center lg:gap-12 xl:gap-16
                   bg-base-100 overflow-hidden px-6 md:px-16 max-w-7xl mx-auto"
      >

{/* LEFT: Text Block */}


        <div
          className="relative z-10 flex-1 text-center lg:text-left space-y-6 py-20"
          data-aos="fade-right"
        >
          {/* Small floating decoration animation - above title, desktop only */}
          <div className="hidden lg:block absolute -top-16 -left-8 w-32 opacity-80 -rotate-12">
            <Lottie animationData={donateAnim} loop />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary">
            Share Food, <br className="hidden md:block" /> Spread Joy 🍽️
          </h1>
          <p className="max-w-xl text-gray-600 text-lg leading-relaxed mx-auto lg:mx-0">
            Connect with your neighbors, share surplus meals, and help reduce
            food waste in your community. Every plate counts!
          </p>
          <div className="pt-4">
            <Link
              to="/available-foods"
              className="btn btn-primary btn-wide shadow-md hover:scale-105 transition-transform duration-200"
            >
              View Available Foods
            </Link>
          </div>
        </div>
{/* RIGHT: Main Animation */}


        <div
          className="relative flex-1 flex justify-center lg:justify-end mt-10 lg:mt-0"
          data-aos="zoom-in-left"
        >
          <Lottie
            animationData={heroFood}
            loop
            className="w-72 md:w-96 drop-shadow-lg"
          />
        </div>
      </section>
{/* ---------- FEATURED FOODS ---------- */}


      <section className="bg-base-100" data-aos="fade-up">
        <FeaturedFoods />
      </section>
      
{/* ---------- STATIC SECTIONS ---------- */}


      <section className="bg-base-100" data-aos="fade-up">
        <StaticSections />
      </section>
      <ExpiringSoon />
    </>

);

};

export default Home;