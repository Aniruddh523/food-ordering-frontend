const categories = [
  "All",
  "pizza",
  "burger",
  "Momos",
  "dessert",
  "drink",
  "paniPuri",
];

const CategoryFilter = ({ category, setCategory }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">
        Browse Categories
      </h2>

      <div className="flex flex-wrap gap-4">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() =>
              setCategory(item === "All" ? "" : item.toLowerCase())
            }
            className={`px-5 py-2 rounded-full font-medium transition duration-300 ${
              category === (item === "All" ? "" : item.toLowerCase())
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-orange-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;