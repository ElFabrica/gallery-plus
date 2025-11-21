import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import useAlbums from "../contexts/albums/hooks/user-albums";
import PhotosList from "../contexts/photos/components/photo-list";
import usePhotos from "../contexts/photos/hooks/use-photos";

export default function PageHome() {
  const { albums, isLoadingAlbums } = useAlbums();
  const { isLoadingPhoto, photos } = usePhotos();

  return (
    <Container className="py-10">
      <AlbumsFilter
        albums={albums}
        className="mb-9"
        loading={isLoadingAlbums}
      />
      <PhotosList photos={photos} loading={isLoadingPhoto} />
    </Container>
  );
}
