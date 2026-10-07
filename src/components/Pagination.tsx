interface Props {
  page: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  onPageChange: (p: number) => void;
}
export function Pagination({
  page,
  totalPages,
  first,
  last,
  onPageChange,
}: Props) {
  if (!totalPages) return null;
  return (
    <div className="pagination">
      <button disabled={first} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>
      <span>
        Page <strong>{page + 1}</strong> of <strong>{totalPages}</strong>
      </span>
      <button disabled={last} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </div>
  );
}
