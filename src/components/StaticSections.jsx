const StaticSections = () => {
  return (
    <>
      {/* How It Works Section */}
      <section className="my-20 bg-base-200 py-14 rounded-lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-3">
            How It Works 🍴
          </h2>
          <p className="text-gray-600">
            Sharing food is as easy as 1-2-3 with PlateShare.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="p-6 bg-base-100 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">1️⃣ Post Food</h3>
            <p>Add surplus food details and make them available to the community.</p>
          </div>

          <div className="p-6 bg-base-100 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">2️⃣ Find Food</h3>
            <p>Browse listings near you and request anything you need.</p>
          </div>

          <div className="p-6 bg-base-100 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">3️⃣ Collect Food</h3>
            <p>Coordinate pickup with the donor and reduce food waste together.</p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="my-20 text-center py-16">
        <h2 className="text-3xl font-bold text-primary mb-4">Our Mission 🌍</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Our goal is simple — to reduce food waste and help communities connect. 
          Together, we can create a sustainable world where no plate goes empty.
        </p>
      </section>
    </>
  );
};

export default StaticSections;