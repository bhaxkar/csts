interface ButtonProps {
  type: "button" | "submit" | "reset";
  label?: string;
  icon: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  onPress,
  disabled,
  type,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className="w-fit px-3 md:px-6 lg:px-8 py-2 font-mono text-btn-text bg-btn-bg hover:bg-btn-hover-bg rounded-md shadow-md cursor-pointer flex items-center"
      onClick={onPress} disabled={disabled}
    >
      <span className="text-2xl font-bold inline-block mr-2">{icon}</span>
      <span className="text-center"> {label} </span>
    </button>
  );
};

export default Button;
