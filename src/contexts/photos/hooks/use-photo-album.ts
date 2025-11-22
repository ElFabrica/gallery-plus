import { toast } from "sonner";
import { api } from "../../../helpers/api";
import { useQueryClient } from "@tanstack/react-query";

export default function usePhotoAlbums() {
  const querryClient = useQueryClient();

  async function managePhotoOnAlbum(photoId: string, albumsIds: string[]) {
    try {
      await api.put(`photos/${photoId}/albums`, {
        albumsIds,
      });

      querryClient.invalidateQueries({ queryKey: ["photo", photoId] });
      querryClient.invalidateQueries({ queryKey: ["photos"] });
      toast.success("Albums atualizados");
    } catch (error) {
      toast.error("Error ao gerenciar albums da foto");
      throw error;
    }
  }

  return {
    managePhotoOnAlbum,
  };
}
