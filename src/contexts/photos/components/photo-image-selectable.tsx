import { tv } from "tailwind-variants";
import ImagemPreview from "../../../components/image-preview";
import React from "react";
import InputChecbox from "../../../components/input-checkbox";

export const PhotoImageSelectableVariants = tv({
  base: "cursor-pointer relative rounded-lg",

  variants: {
    select: {
      true: "outline-2 outline-accent-brand",
      false: "",
    },
  },
});

interface PhotoImageSelectableProps
  extends React.ComponentProps<typeof ImagemPreview> {
  selected?: boolean;
  onSelectImage?: (selected: boolean) => void;
}

export default function PhotoImageSelectable({
  className,
  selected,
  onSelectImage,
  ...props
}: PhotoImageSelectableProps) {
  const [isSelected, setIsSelected] = React.useState(selected);

  function handleSelect() {
    const newValue = !isSelected;

    setIsSelected(newValue);
    onSelectImage?.(newValue);
  }

  return (
    <label
      className={PhotoImageSelectableVariants({
        className,
        select: isSelected,
      })}
    >
      <InputChecbox
        size="sm"
        defaultChecked={isSelected}
        onChange={handleSelect}
        className="absolute top-1 left-1"
      />
      <ImagemPreview {...props} />
    </label>
  );
}
