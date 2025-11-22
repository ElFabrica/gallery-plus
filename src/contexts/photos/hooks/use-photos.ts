import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../helpers/api";
import type { Photo } from "../models/photos";

interface PhotoDetailsResponse extends Photo {
  nextPhotoId?: string;
  previousPhotoId?: string;
}

export default function usePhoto(id?: string) {
  const { data, isLoading } = useQuery<PhotoDetailsResponse>({
    queryKey: ["photo", id],
    queryFn: () => fetcher(`/photos/${id}`),
    enabled: id !== null ? true : false,
  });

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previeousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
  };
}
