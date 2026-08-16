const SortDropdown = ({ sort, setSort }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end">

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="">Sort By</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>

    </div>
  );
};

export default SortDropdown;