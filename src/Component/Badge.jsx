export function Badge({
  children = "*",
  style = { color: "red", fontWeight: "bold" },
}) {
  return (
    <>
      <span style={style}>{children}</span>
    </>
  );
}
