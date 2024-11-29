/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon: any;
  endIcon?: any;
  onClick: () => void;
}

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-600",
};
const sizeStyles = {
  sm: "py-1 px-2",
  md: "px-4 py-2",
  lg: "px-6 py-4",
};
const defaultStyles = "rounded-md flex";

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${variantStyles[props.variant]} ${
        sizeStyles[props.size]
      } ${defaultStyles} `}
    >
      {props.startIcon}
      {props.text}
    </button>
  );
};

export default Button;
