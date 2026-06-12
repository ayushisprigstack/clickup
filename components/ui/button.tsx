type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn-dark rounded-3 px-4 py-2 custom-btn fw-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}