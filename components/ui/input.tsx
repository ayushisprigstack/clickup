type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`form-control rounded-3 px-3 py-2-5 custom-input ${className}`}
      {...props}
    />
  );
}