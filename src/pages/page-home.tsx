import Container from "../components/container";
import PhotosList from "../contexts/photos/components/photo-list";


export default function PageHome() {
    return (
        <Container>
            <PhotosList
                loading
                photos={[
                    { id: "123123", albums: [], imageId: "portrait-tower.png", title: "Nada" },
                    { id: "321", albums: [], imageId: "portrait-tower.png", title: "Nada" },
                    { id: "432", albums: [], imageId: "portrait-tower.png", title: "Nada" },
                    { id: "345", albums: [], imageId: "portrait-tower.png", title: "Nada" }
                ]}
            />
        </Container>
    )
}