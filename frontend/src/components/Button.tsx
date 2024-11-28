/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon: any;
  endIcon?: any;
  onClick: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <button className={`${props.variant == "primary" ? "" : ""}`}>
      {props.text}
    </button>
  );
};

export default Button;
