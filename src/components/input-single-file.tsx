import { type VariantProps, tv } from "tailwind-variants";
import Icon from "./icon";
import Text, { textVariants } from "./text";
import UploadFileIcon from "../assets/icons/upload-file.svg?react"
import React from "react";
import FileImageIcon from "../assets/icons/image.svg?react"
import { useWatch } from "react-hook-form"


export const inputSingleFileVariants = tv({
    base: `
        flex flex-col items-center justify-center w-full
        border border-solid border-border-primary
        group-hover:border-border-active
        rounded-lg gap-1 transition       
        `,
    variants: {
        size: {
            md: "px-5 py-6"
        }
    },
    defaultVariants: {
        size: "md"
    }
})

export const inputSingleFileIconVariants = tv({
    base: `fill-placeholder`,
    variants: {
        size: {
            md: "h-8 w-8"
        }
    },
    defaultVariants: {
        size: "md"
    }
})

interface InputSingleFileProps extends VariantProps<typeof inputSingleFileVariants>, Omit<React.ComponentProps<"input">, "size"> {
    form: any
    allowedExtensions: string[];
    maxFileSizeInMB: number;
    error?: React.ReactNode;
    replaceBy: React.ReactNode;
}

export default function InputSingleFile({
    size,
    error,
    form,
    allowedExtensions,
    maxFileSizeInMB,
    replaceBy,
    ...props
}: InputSingleFileProps) {

    const formValues = useWatch({ control: form.control })
    const name = props.name || ""
    const formFile: File = React.useMemo(() => formValues[name]?.[0], [formValues, name])
    const { fileExtention, fileSize } = React.useMemo(() => ({
        fileExtention: formFile?.name?.split(".")?.pop()?.toLowerCase() || "",
        fileSize: formFile?.size || 0
    }), [formFile])
    function isValidExtention() {
        return allowedExtensions.includes(fileExtention)
    }

    function isValidSize() {
        console.log(fileSize <= maxFileSizeInMB * 1024 * 1024)
        return fileSize <= maxFileSizeInMB * 1024 * 1024
    }

    function isValidFile() {
        return isValidExtention() && isValidSize()
    }

    return (

        <div>
            {!formFile || !isValidFile() ?
                (
                    <>
                        <div className="w-full relative group cursor-pointer">
                            <input type="file"
                                className={`
                absolute top-0 right-0 h-full w-full
                opacity-0 cursor-pointer
                `
                                }
                                {...props}
                            />
                            <div className={inputSingleFileVariants({ size })}>
                                <Icon svg={UploadFileIcon} className={inputSingleFileIconVariants()} />
                                <Text variant="label-medium" className="text-placeholder text-center">
                                    Arraste o arquivo aqui<br />
                                    ou clique para selecionar
                                </Text>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 mt-1">

                            {formFile && !isValidExtention() && (
                                <Text variant="label-small" className="text-accent-red">
                                    Tipo de arquivo inválido
                                </Text>
                            )}
                            {formFile && !isValidSize() && (
                                <Text variant="label-small" className="text-accent-red">
                                    O tamanho do arquivo ultrapassa o máximo (50MB)
                                </Text>
                            )}
                            {error &&
                                <Text variant="label-small" className="text-accent-red">
                                    Erro no campo
                                </Text>
                            }
                        </div>
                    </>) : (
                    <>
                        {replaceBy}



                        <div className={`flex gap-3 items-center 
            border border-solid border-border-primary mt-5
            p-3 rounded
            `}>
                            <Icon svg={FileImageIcon} className="fill-white h-6 w-6" />
                            <div className="flex flex-col">
                                <div className="truncate max-w-80">
                                    <Text variant="label-medium" className="text-placeholder "> {formFile.name}</Text>
                                </div>
                                <div className="flex">
                                    <button
                                        type="button"
                                        className={textVariants({
                                            variant: "label-small",
                                            className: "text-accent-red cursor-pointer hover:underline"

                                        })}
                                        onClick={() => form.setValue(name, undefined)}
                                    >Remover</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
        </div>

    )
}