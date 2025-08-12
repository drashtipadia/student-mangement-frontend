/**
 * @typedef {{
 * size?: "baseline" | "medium" | "large";
 * type?: "tonal" | "base";
 * variant?: "primary" | "secondary" | "tertiary";
 * } & React.HTMLAttributes<HTMLButtonElement>} FABProps
 */

/**
 * @param {FABProps} props
 */
export default function FloatingActionButton(props) {
  const {
    type = "tonal",
    size = "baseline",
    variant = "primary",
    children,
    onClick,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      onClick={onClick}
      className={`fab-${size} fab-${type}-${variant} cursor-pointer`}
    >
      {children}
    </button>
  );
}
