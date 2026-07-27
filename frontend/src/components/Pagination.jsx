function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="my-10 flex items-center justify-center gap-4">
      <button
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
        className="btn"
      >
        Previous
      </button>

      <span className="font-light text-white">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage((prev) => prev + 1)}
        className="btn  "
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;