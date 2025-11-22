import { useTransition } from "react";
import { useParams } from "react-router";
import Text from "../components/text";
import Container from "../components/container";
import Skeleton from "../components/skeleton";
import PhotosNavigator from "../contexts/photos/components/photos-navigator";
import ImagemPreview from "../components/image-preview";
import Button from "../components/button";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";
import useAlbums from "../contexts/albums/hooks/use-albums";
import usePhoto from "../contexts/photos/hooks/use-photo.ts";
import type { Photo } from "../contexts/photos/models/photos";
import usePhotos from "../contexts/photos/hooks/use-photo.ts";

export default function PagePhotoDetails() {
  const { id } = useParams();
  const { isLoadingPhoto, nextPhotoId, photo, previousPhotoId } = usePhoto(id);
  const { deletePhoto } = usePhotos();
  const { albums, isLoadingAlbums } = useAlbums();
  const [isDeletingPhoto, setIsDeletingPhoto] = useTransition();

  function handleDeletPhoto() {
    setIsDeletingPhoto(async () => await deletePhoto(photo!.id));
  }

  if (!photo && !isLoadingPhoto) {
    return <div>Photo not found</div>;
  }
  return (
    <Container>
      <header className="flex items-center justify-between gap-8 my-8">
        {!isLoadingPhoto ? (
          <Text variant="heading-large" as="h2">
            {photo?.title}
          </Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}
        <PhotosNavigator
          previousPhotoId={previousPhotoId}
          nextPhotoId={nextPhotoId}
          loading={isLoadingPhoto}
        />
      </header>
      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <ImagemPreview
              src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
              title={photo?.title}
              imageClassNasme={`h-[21rem]`}
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}
          {!isLoadingPhoto ? (
            <Button variant="destructive" onClick={handleDeletPhoto}>
              {isDeletingPhoto ? "Excluindo..." : "Excluir"}
            </Button>
          ) : (
            <Skeleton className="w-20 h-10" />
          )}
        </div>

        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-6">
            Álbuns
          </Text>
          <AlbumsListSelectable
            albums={albums}
            loading={isLoadingAlbums}
            photo={photo as Photo}
          />
        </div>
      </div>
    </Container>
  );
}
