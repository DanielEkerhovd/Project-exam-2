export function Filters() {
  return (
    <div>
      {/* Dropdown filter */}
      <select
        name="filter"
        id="filter"
        className="p-2 border-gray-100 border-[2px] rounded-sm w-1/2 max-w-[300px]"
      >
        <option value="rating">Rating</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}
