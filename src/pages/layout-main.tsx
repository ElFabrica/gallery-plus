import { Outlet } from "react-router";
import Text from "../components/text";
import MainHeader from "../components/main-header";


export default function LayoutMain() {
    return (
        <>
            <MainHeader className="mt-9" />
            <Text variant="heading-large">Viva ao layout main</Text>
            <hr />
            <Outlet />
        </>


    )
}