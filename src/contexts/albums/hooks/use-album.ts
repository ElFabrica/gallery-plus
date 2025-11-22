import { toast } from "sonner";
import type { AlbumNewFormSchema } from "../schema";
import { api } from "../../../helpers/api";
import type { Album } from "../models/album";
import { useQueryClient } from "@tanstack/react-query";
import usePhotos from "../../photos/hooks/use-photo.ts";
import usePhotoAlbums from "../../photos/hooks/use-photo-album";

export default function useAlbum() {
  const queryClient = useQueryClient();
  const { photos } = usePhotos();
  const { managePhotoOnAlbum } = usePhotoAlbums();

  async function CreateAlbum(payload: AlbumNewFormSchema) {
    try {
      const { data: album } = await api.post<Album>("/albums", {
        title: payload.title,
      });

      if (payload.photoIds && payload.photoIds.length > 0) {
        await Promise.all(
          payload.photoIds.map((photoId) => {
            const photoAlbumsIds =
              photos
                .find((photo) => photo.id === photoId)
                ?.albums?.map((album) => album.id) || [];

            return managePhotoOnAlbum(photoId, [...photoAlbumsIds, album.id]);
          })
        );
        queryClient.invalidateQueries({ queryKey: ["albums"] });
        queryClient.invalidateQueries({ queryKey: ["photos"] });

        toast.success("Album criado com sucesso");
      }
    } catch (error) {
      toast.error("Error ao criar álbum");
      throw error;
    }
  }
  return {
    CreateAlbum,
  };
}
