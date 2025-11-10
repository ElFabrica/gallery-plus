import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import useAlbums from "../contexts/albums/hooks/user-albums";
import PhotosList from "../contexts/photos/components/photo-list";


export default function PageHome() {

    const { albums, isLoadingAlbums } = useAlbums()

    return (
        <Container>
            <AlbumsFilter albums={albums} className="mb-9"
                loading={isLoadingAlbums}
            />
            <PhotosList
                photos={[
                    {
                        id: "123123", albums: [
                            { id: "1", title: "Album 1" },
                            { id: "2", title: "Album 2" },
                            { id: "3", title: "Album 3" }
                        ], imageId: "portrait-tower.png", title: "Nada"
                    },
                    { id: "321", albums: [], imageId: "portrait-tower.png", title: "Nada" },
                    { id: "432", albums: [], imageId: "portrait-tower.png", title: "Nada" },
                    { id: "345", albums: [], imageId: "portrait-tower.png", title: "Nada" }
                ]}
            />
        </Container>
    )
}