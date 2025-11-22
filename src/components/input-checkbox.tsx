import Icon from "./icon";
import CheckIcon from "../assets/icons/check.svg?react";
import { type VariantProps, tv } from "tailwind-variants";
import type React from "react";

export const inputCheckboxWrapperVariants = tv({
  base: `
        inline-flex items-center justify-center relative group:
    `,
  variants: {
    disabled: {
      true: `pointer-events-none opacity-80`,
    },
  },
});

export const inputCheckBoxVariants = tv({
  base: `
    appearance-none peer items-center justify-center 
    cursor-pointer transition overflow-hidden
    `,

  variants: {
    variant: {
      default: `
                border-2 border-solid
                border-border-primary hover:border-border-active
                checked:border-accent-brand checked:bg-accent-brand
                group-hover:checked:border-accent-brand-light
                group-hover:checked:bg-accent-brand-light
                hover:checked:border-accent-brand-light 
            `, //El fábrica ajeitou essa ultima linha
    },
    size: {
      sm: `w-3 h-3 rounded-sm`,
      md: "w-5 h-5 rounded-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    disabled: false,
  },
});

export const inputCheckboxIconVarianta = tv({
  base: `
    absolute top-1/2 -translate-y-1/2
    hidden peer-checked:block fill-white
    cursor-pointer  
    `,
  variants: {
    size: {
      sm: "w-3 h-3 left-px",
      md: "w-4 h-4 left-0.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface InputCheckboxProps
  extends VariantProps<typeof inputCheckBoxVariants>,
    Omit<React.ComponentProps<"input">, "size"> {}

export default function InputChecbox({
  variant,
  size,
  disabled,
  className,
  ...props
}: InputCheckboxProps) {
  return (
    <label className={inputCheckboxWrapperVariants({ className, disabled })}>
      <input
        type="checkbox"
        {...props}
        className={inputCheckBoxVariants({ variant, size })}
      />
      <Icon svg={CheckIcon} className={inputCheckboxIconVarianta({ size })} />
    </label>
  );
}
