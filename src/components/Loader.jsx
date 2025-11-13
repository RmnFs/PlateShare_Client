const Loader = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <span className="loading loading-ring loading-lg text-primary"></span>
    <p className="mt-3 text-primary font-semibold animate-pulse">
      Loading ...
    </p>
  </div>
);

export default Loader;