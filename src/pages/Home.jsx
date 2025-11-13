import FeaturedFoods from "../components/FeaturedFoods";

const Home = () => {
  return (
    <>
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Welcome to PlateShare 🍽️
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Share surplus food and help your community reduce food waste.
        </p>
        <button className="btn btn-primary mt-8">View Available Foods</button>
      </section>

      <FeaturedFoods />
    </>
  );
};

export default Home;