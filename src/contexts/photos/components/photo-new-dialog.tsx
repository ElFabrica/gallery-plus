import { useForm } from "react-hook-form"
import Alert from "../../../components/alert"
import Button from "../../../components/button"
import { Dialog, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../../components/dialog"
import ImagemPreview from "../../../components/image-preview"
import InputSingleFile from "../../../components/input-single-file"
import InputText from "../../../components/input-text"
import Skeleton from "../../../components/skeleton"
import Text from "../../../components/text"
import type { Album } from "../../albums/models/album"
import useAlbums from "../../albums/hooks/user-albums"

interface PhotoNewDialogProps {
    trigger: React.ReactNode
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {

    const { albums, isLoadingAlbums } = useAlbums()


    const form = useForm()

    return <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
            <DialogHeader>Adicionar foto</DialogHeader>
            <DialogBody className="flex flex-col gap-5">
                <InputText
                    placeholder="Adicionar um título"
                    maxLength={255}
                />
                <Alert> Tamanho máximo: 50mb
                    <br />
                    Você pode selecionar arquivo em PNG, JPG ou JPEG
                </Alert>
                <InputSingleFile
                    form={form}
                    allowedExtensions={["png", "jpg", "jpeg"]}
                    maxFileSizeInMB={50}
                    replaceBy={
                        <ImagemPreview className="w-full h-56" />
                    }
                />
                <div className="space-y-3">
                    <Text variant="label-small"> Selecionar albuns</Text>
                    <div className="flex flex-wrap gap-3">

                        {!isLoadingAlbums && albums.length > 0 && albums.map((album) =>
                            <Button
                                key={album.id}
                                variant="ghost"
                                size="sm"
                                className="truncate"
                            >
                                {album.title}
                            </Button>
                        )}

                        {isLoadingAlbums && Array.from({ length: 5 }).map((_, index) =>
                            <Skeleton key={`album-loading-${index}`} className="h-7 w-20" />
                        )}
                    </div>
                </div>
            </DialogBody>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="secondary">Cancelar</Button>
                </DialogClose>
                <Button>Adicionar</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}