import Button from "../../../components/button";
import { Dialog, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../../components/dialog";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import type { Photo } from "../../photos/models/photos";
import SelectCheckboxIllustration from "../../../assets/images/select-checkbox.svg?react"
import Skeleton from "../../../components/skeleton";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable";

interface AlbumNewDialogProps {
    trigger: React.ReactNode;
}


export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
    const isLoadingPhotos = false
    const photos: Photo[] = [
        { id: "321", albums: [], imageId: "portrait-tower.png", title: "Nada" },
        { id: "432", albums: [], imageId: "portrait-tower.png", title: "Nada" },
        { id: "345", albums: [], imageId: "portrait-tower.png", title: "Nada" }

    ]

    function handleTogglePhoto(selected: boolean, photoId: string) {
        console.log(selected, photoId)
    }

    return <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
            <DialogHeader>Criar álbum</DialogHeader>
            <DialogBody className="flex flex-col gap-5">
                <InputText placeholder="Adicionar um título" />

                <div className="space-y-3">
                    <Text as="div" variant="label-small" className="mb-3">Fotos cadastradas</Text>

                    {
                        !isLoadingPhotos && photos.length >= 1 &&
                        <div className="flex flex-wrap gap-2">
                            {photos.map((photo) => <PhotoImageSelectable
                                imageClassNasme="w-20 h-20"
                                key={photo.id}
                                src={`/images/${photo.imageId}`}
                                title={photo.title}
                                onSelectImage={(selected) => handleTogglePhoto(selected, photo.id)}

                            />)}
                        </div>

                    }
                    {isLoadingPhotos && <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 4 }).map((_, index) =>
                            <Skeleton key={`photo-loading-${index}]`}
                                className="w-20 h-20 rounded-lg"
                            />)}
                    </div>
                    }




                    {!isLoadingPhotos && photos.length === 0 && (
                        <div className="w-full flex-col justify-center items-center gap-3">
                            <SelectCheckboxIllustration />
                            <Text variant="paragraph-medium" className="text-center">
                                Nenhuma foto disponível para seleção
                            </Text>
                        </div>
                    )}
                </div>
            </DialogBody>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="secondary">Cancelar</Button>
                </DialogClose>
                <Button>Criar</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}