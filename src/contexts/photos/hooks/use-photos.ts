import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Photo } from "../models/photos";
import { api, fetcher } from "../../../helpers/api";
import { useQueryState, createSerializer, parseAsString } from "nuqs";
import type { PhotoNewFormSchema } from "../schema";

const toSearchParams = createSerializer({
  albumId: parseAsString,
  q: parseAsString,
});

export default function usePhotos() {
  const [albumId, setAlbumId] = useQueryState("albumId");
  const [q, setSearchFoto] = useQueryState("q");

  const { data, isLoading } = useQuery<Photo[]>({
    queryKey: ["photos", albumId, q],
    queryFn: () => fetcher(`/photos${toSearchParams({ albumId, q })}`),
  });

  const querryClient = useQueryClient();

  async function createPhoto(payload: PhotoNewFormSchema) {
    try {
      const { data } = await api.post<Photo>("/photos", {
        title: payload.title,
      });

      await api.post(
        `/photos/${data.id}/image`,
        {
          file: payload.file[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (payload.albumsIds && payload.albumsIds.length > 0) {
        await api.put(`/photos/${data.id}/albums`, {
          albumsIds: payload.albumsIds,
        });
      }
      querryClient.invalidateQueries({ queryKey: ["photos"] });
    } catch (error) {
      throw error;
    }
  }

  return {
    photos: data || [],
    isLoadingPhoto: isLoading,
    filters: {
      albumId,
      setAlbumId,
      q,
      setSearchFoto,
    },
    createPhoto,
  };
}
