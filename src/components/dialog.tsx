import * as DialogPrimitive from "@radix-ui/react-dialog"

export const Dialog = DialogPrimitive.Root

export const DialogTrigger = DialogPrimitive.Trigger

export const DialogClose = DialogPrimitive.Close

export function DialogContent({
    className,
    ref,
    children,
    ...props }:
    React.ComponentProps<typeof DialogPrimitive.Content>) {
    <DialogPrimitive.Portal>
        <DialogPrimitive.Content ref={ref}>{children}</DialogPrimitive.Content>
    </DialogPrimitive.Portal>
}