import type React from "react";
import { tv } from "tailwind-variants";

export const ImagemFilePreviewVariants = tv({
    base: `
    rounded-lg overflow-hidden
    `
})

export const ImageFilePreviewImageVariants = tv({
    base: `
    w-full h-full object-cover
    `
})

interface ImagemFilePreviewExtends extends React.ComponentProps<"img"> {
    imageClassNasme?: string
}

export default function ImagemPreview({
    className,
    imageClassNasme,
    ...props
}: ImagemFilePreviewExtends) {
    return <div className={ImagemFilePreviewVariants({ className })}>
        <img className={ImageFilePreviewImageVariants({ className: imageClassNasme })}{...props} />
    </div>
}