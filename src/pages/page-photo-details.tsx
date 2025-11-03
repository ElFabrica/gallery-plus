import { useParams } from "react-router";
import Text from "../components/text";
import Container from "../components/container";
import Skeleton from "../components/skeleton";
import PhotosNavigator from "../contexts/photos/components/photos-navigator";
import ImagemPreview from "../components/image-preview";
import Button from "../components/button";


export default function PagePhotoDetails() {
    const { id } = useParams()
    const isLoadingPhoto = true
    const photo = {
        id: "123123", albums: [
            { id: "1", title: "Album 1" },
            { id: "2", title: "Album 2" },
            { id: "3", title: "Album 3" }
        ], imageId: "portrait-tower.png", title: "Viva a imagem"
    }

    return (
        <Container>
            <header className="flex items-center justify-between gap-8 my-8">
                {!isLoadingPhoto ? (
                    <Text variant="heading-large">
                        {photo.title}
                    </Text>
                ) : (
                    <Skeleton className="w-48 h-8" />
                )}
                <PhotosNavigator loading={isLoadingPhoto} />
            </header>
            <div className="grid grid-cols-[21rem] gap-24">
                <div className="space-y-3">
                    {!isLoadingPhoto ?
                        (<ImagemPreview
                            src={`/images/${photo?.imageId}`}
                            title={photo.title}
                            imageClassNasme={`h-[21rem]`}
                        />
                        ) : (
                            <Skeleton className="h-[21rem]" />
                        )}
                    {!isLoadingPhoto ?
                        <Button variant="destructive">
                            Excluir
                        </Button>
                        :
                        <Skeleton className="w-20 h-10" />

                    }
                </div>
            </div>
        </Container>
    )
}