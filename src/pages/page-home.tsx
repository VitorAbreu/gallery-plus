import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import useAlbums from "../contexts/albums/hooks/use-albums";
import PhotosList from "../contexts/photos/components/photos-list";

export default function PageHome() {
  const { albums, isLoadingAlbums } = useAlbums();
  return (
    <Container>
      <AlbumsFilter
        albums={albums}
        loading={isLoadingAlbums}
        className="mb-9"
      />
      <PhotosList
        photos={[
          {
            id: "123",
            title: "Teste",
            imageId: "portrait-tower.png",
            albums: [
              { id: "4321", title: "Album 1" },
              { id: "431", title: "Album 2" },
              { id: "421", title: "Album 3" },
            ],
          },
          {
            id: "123",
            title: "Teste",
            imageId: "portrait-tower.png",
            albums: [
              { id: "4321", title: "Album 1" },
              { id: "431", title: "Album 2" },
              { id: "421", title: "Album 3" },
            ],
          },
        ]}
      />
    </Container>
  );
}
