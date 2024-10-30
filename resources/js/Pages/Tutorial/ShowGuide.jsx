import { Button, Card } from "@material-tailwind/react";
import DashboardGuide from "./Partials/DashboardGuide";
import ProposalGuide from "./Partials/ProposalGuide";
import TableOfContents from "./Partials/TOC";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import EventGuide from "./Partials/EventGuide";

export default function ShowGuide({
    guide='dashboard',
    setGuide
}){
    return(
        <>
            {
                guide &&
                <Button className="flex gap-2 mb-5" size="md" color="red" onClick={() => setGuide(null)}>
                    <ChevronLeftIcon className="w-5"/>
                    Ke Daftar Isi 
                </Button>
            }
            
            <Card>
                <div className="p-5">
                    {
                        guide == 'dashboard' ? 
                        <DashboardGuide />
                        :
                        guide == 'proposal' ?
                        <ProposalGuide />
                        :
                        guide == 'event' ? 
                        <EventGuide />
                        :
                        <TableOfContents setGuide={setGuide}/>
                    }
                </div>
            </Card>
        </>
    )
}