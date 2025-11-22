import { useTransition } from "react";
import Divider from "../../../components/divider";
import InputChecbox from "../../../components/input-checkbox";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import usePhotoAlbums from "../../photos/hooks/use-photo-album";
import type { Photo } from "../../photos/models/photos";
import type { Album } from "../models/album";

interface AlbumsListSelectableProps {
  loading?: boolean;
  albums: Album[];
  photo: Photo;
}

export default function AlbumsListSelectable({
  loading,
  albums,
  photo,
}: AlbumsListSelectableProps) {
  const { managePhotoAlbum } = usePhotoAlbums();
  const [isUdatingPhoto, setIsUpdatingPhoto] = useTransition();
  function isChecked(albumId: string) {
    return photo?.albums?.some((album) => album.id === albumId);
  }

  function handlePhtoOnAlbums(albumId: string) {
    let albumsId = [];

    if (isChecked(albumId)) {
      albumsId = photo.albums
        .filter((album) => album.id !== albumId)
        .map((album) => album.id);
    } else {
      albumsId = [...photo.albums.map((album) => album.id), albumId];
    }

    setIsUpdatingPhoto(async () => managePhotoAlbum(photo.id, albumsId));
  }

  return (
    <ul className="flex flex-col gap-4">
      {!loading &&
        albums.length > 0 &&
        albums.map((album, index) => (
          <li key={album.id}>
            <div className="flex items-center justify-between gap-1">
              <Text variant="paragraph-large" className="truncate">
                {album.title}
              </Text>
              <InputChecbox
                defaultChecked={isChecked(album.id)}
                onChange={() => handlePhtoOnAlbums(album.id)}
                disabled={isUdatingPhoto}
              />
            </div>
            {index !== albums.length - 1 && <Divider className="mt-4" />}
          </li>
        ))}
      {loading &&
        Array.from({ length: 5 }).map((album) => (
          <li key={`albums-list${album}`}>
            <Skeleton className="h-[2.5rem]" />
          </li>
        ))}
    </ul>
  );
}
