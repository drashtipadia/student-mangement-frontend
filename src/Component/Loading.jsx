import loading from "../loading.svg";

export function Loading({ message = "Loading..." }) {
  return (
    <>
      <img src={loading} height={100} width={100} alt={message} />
    </>
  );
}
