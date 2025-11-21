import { useQuery } from "@tanstack/react-query";
import type { Photo } from "../models/photos";
import { fetcher } from "../../../helpers/api";
import { useQueryState, createSerializer, parseAsString } from "nuqs";

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

  return {
    photos: data || [],
    isLoadingPhoto: isLoading,
    filters: {
      albumId,
      setAlbumId,
      q,
      setSearchFoto,
    },
  };
}
