import { toast } from "sonner";
import { api } from "../../../helpers/api";
import { useQueryClient } from "@tanstack/react-query";

export default function usePhotoAlbums() {
  async function managePhotoAlbum(photoId: string, albumsIds: string[]) {
    const querryClient = useQueryClient();

    try {
      await api.put(`photos/${photoId}/albums`, {
        albumsIds,
      });

      querryClient.invalidateQueries({ queryKey: ["photo", photoId] });
      querryClient.invalidateQueries({ queryKey: ["album"] });
      toast.error("Albums atualizados");
    } catch (error) {
      toast.error("Error ao gerenciar algums de uma photo");
      throw error;
    }
  }

  return {
    managePhotoAlbum,
  };
}
