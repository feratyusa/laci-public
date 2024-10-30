import InDevelopment from "@/Components/InDevelopment";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button, Card } from "@material-tailwind/react";
import TableOfContents from "./Partials/TOC";
import HeaderTitle from "@/Components/HeaderTitle";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";
import ShowGuide from "./ShowGuide";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function Index({
    auth,
}){
    const [guide, setGuide] = useState(null)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        setGuide(urlParams.get('guide'))
    }, [])

    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'Panduan'}/>}
        >            
            <Head title="Panduan"/>
            {/* <InDevelopment /> */}
            <div className="m-5">
                <ShowGuide guide={guide} setGuide={setGuide}/>
            </div>
        </Authenticated>
    )
}