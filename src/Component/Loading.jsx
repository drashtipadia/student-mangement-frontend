import loading from "../images/loading.svg";

export function Loading({ message = "Loading..." }) {
  return (
    <>
      <img
        src={loading}
        className="rounded d-block"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
        }}
        alt={message}
      />
    </>
  );
}
