import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, fetcher } from "../../../helpers/api";
import type { Photo } from "../models/photo";
import type { PhotoNewFormSchema } from "../schemas";
import { toast } from "sonner";
import usePhotoAlbums from "./use-photo-albums";

interface PhotoDetailResponse extends Photo {
  nextPhotoId?: string;
  previousPhotoId?: string;
}

export default function usePhoto(id?: string) {
  const { data, isLoading } = useQuery<PhotoDetailResponse>({
    queryKey: ["photo", id],
    queryFn: () => fetcher(`/photos/${id}`),
    enabled: Boolean(id),
  });

  const queryClient = useQueryClient();
  const { managePhotoOnAlbum } = usePhotoAlbums();

  async function createPhoto(payload: PhotoNewFormSchema) {
    try {
      // renaming data to photo, destructuring and using alias
      const { data: photo } = await api.post<Photo>("/photos", {
        title: payload.title,
      });

      await api.post(
        `/photos/${photo.id}/image`,
        {
          file: payload.file[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (payload.albumsIds && payload.albumsIds.length) {
        await managePhotoOnAlbum(photo.id, payload.albumsIds);
      }

      // invalida a lista de fotos em cache para que a foto atual apareça na lista
      queryClient.invalidateQueries({ queryKey: ["photos"] });

      toast.success("Foto criada com sucesso");
    } catch (error) {
      toast.error("Erro ao criar foto");
      throw error;
    }
  }

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
    createPhoto,
  };
}
