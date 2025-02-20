export function ErrorMessage() {
  const refresh = () => {
    window.location.reload();
  };

  return (
    <section className="mx-auto flex flex-col items-center gap-5">
      <p>Something went wrong</p>
      <button
        className="bg-holidaze-dark text-white p-2 rounded-sm"
        onClick={refresh}
      >
        Try again
      </button>
    </section>
  );
}
