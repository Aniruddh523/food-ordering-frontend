const Pagination = ({ page, setPage, totalPages }) => {
  totalPages = 5
  return (

    <div className="flex items-center justify-center gap-5 mt-8">
     
      <button
      type="button"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={`px-5 py-2 rounded-lg text-white ${
          page === 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        Prev
      </button>

      <span className="text-lg font-semibold">
        Page {page} of {totalPages}
      </span>

      <button
      type="button"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={`px-5 py-2 rounded-lg text-white ${
          page === totalPages
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;