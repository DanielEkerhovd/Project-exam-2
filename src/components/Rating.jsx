export function Rating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {rating === 0 ? (
        <span className="text-gray-500 text-[10px] md:text-[14px]">
          No ratings
        </span>
      ) : (
        Array.from({ length: 5 }, (_, i) => (
          <img
            key={i}
            src={
              rating > i ? '/assets/rating-good.png' : '/assets/rating-bad.png'
            }
            className="size-4 md:size-5"
          />
        ))
      )}
    </div>
  );
}
