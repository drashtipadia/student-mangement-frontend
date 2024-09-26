import loading from "../loading.svg";

export function Loading({ message = "Loading..." }) {
  return (
    <>
      <div className="container py-5">
        <img src={loading} className="rounded mx-auto d-block" height={100} width={100} alt={message} />

      </div>
    </>
  );
}
