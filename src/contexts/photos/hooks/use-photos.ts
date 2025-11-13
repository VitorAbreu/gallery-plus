import { useQuery } from "@tanstack/react-query";
import type { Photo } from "../models/photo";
import { fetcher } from "../../../helpers/api";
import {useQueryState, createSerializer, parseAsString} from "nuqs";

// quando chamar toSearchParams retornará a função que serializa o albumId e o torna uma query para os filtros
const toSearchParams = createSerializer({
  albumId: parseAsString,
  q: parseAsString,
});

export default function usePhotos() {
  // useQueryState precisa de uma chave no caso albumId
  const [albumId, setAlbumId] = useQueryState("albumId");
  const [q, setQ] = useQueryState("q");

  const {data, isLoading} = useQuery<Photo[]>({
    // ao passar o albumId na queryKey torna a dependencia variavel o que faz ela se tornar dinâmica
    queryKey: ["photos", albumId, q],
    // toSearchParams evita você de ter que passar na mão ?albumId=xxxx
    queryFn: () => fetcher(`/photos${toSearchParams({albumId, q})}`),
  })

  return {
    photos: data || [],
    isLoadingPhotos: isLoading,
    filters: {
      albumId,
      setAlbumId,
      q,
      setQ
    }
  }
}