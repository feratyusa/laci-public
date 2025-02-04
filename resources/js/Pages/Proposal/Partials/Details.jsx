import { Button, Chip, Typography } from "@material-tailwind/react";
import { Cog8ToothIcon, PlusIcon } from "@heroicons/react/24/solid";
import DialogDelete from "@/Components/Dialogs/DialogDelete";
import OptionButton from "@/Components/OptionButton";
import DialogEventList from "./DialogEventList";
import { Link } from "@inertiajs/react";
import ProposalPriceDetail from "./ProposalPriceDetail";

function TableRow({name, value=null, color="red", option=null, proposal=null, events=null, ...props}){    
    return(
        <div className="grid grid-cols-6 items-center border-b-2">
            <div className={"col-span-2 max-w-60"}>
                <Typography variant="h6">
                    {name}
                </Typography>
            </div>
            <div className={"col-span-4 p-4 bg-gray-50"}>
                {
                    option == 'prices' ?
                    <ProposalPriceDetail proposal={proposal} details={proposal.prices}/>
                    :
                    option == "chip" ?
                    <Chip 
                        className="w-fit"
                        color={color}
                        value={value}
                    /> :
                    option == 'event' ?
                    <div className="flex items-center gap-5">
                        <Link href={route('event.create')} method="get" data={{proposal_id: proposal.id}}>
                            <Button className="flex items-center gap-2" color="green" size="sm">
                                <PlusIcon className="w-5"/>
                                Event
                            </Button>
                        </Link>
                        <DialogEventList events={events} proposal={proposal}/>
                    </div>
                    :
                    <Typography variant="h6">
                        {value}
                    </Typography>
                }
            </div>
        </div>
    )
}


export default function ProposalDetails({proposal, color, events, categories}){
    const dateoptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }    

    return(
        <div className="">
            <TableRow name={"ID Usulan"} value={proposal.id} />
            <TableRow name={"Nama Usulan"} value={proposal.name}  />
            <TableRow name={"Kategori"} value={proposal.event_category}  />
            <TableRow name={"Kursus"} value={`(${proposal.kd_kursus}) ${proposal.kursus.lengkap}`}  />
            <TableRow name={"Tanggal Masuk Usulan"} value={new Date(proposal.entry_date).toLocaleDateString('id', dateoptions)}  />
            <TableRow name={"Anggaran Awal"} option={'prices'} proposal={proposal} />
            <TableRow name={"Dibuat Oleh"} value={proposal.created_by} />
            <TableRow name={"Assign Kepada"} value={proposal.assign_to} />
            <TableRow name={"Tanggal Dibuat"} value={new Date(proposal.created_at).toLocaleTimeString('id', dateoptions)} color={color} />
            <TableRow name={"Tanggal Diupdate"} value={new Date(proposal.updated_at).toLocaleTimeString('id', dateoptions)} color={color} />
            <TableRow name={"Event(s)"} option={'event'} proposal={proposal} events={events} />
            <div className="grid grid-cols-6 items-center border-b-2">
                <div className={"col-span-2 w-60"}>
                    <Typography variant="h6">
                        Options
                    </Typography>
                </div>
                <div className={"col-span-4 p-4 bg-gray-50"}>
                    <div className="flex flex-row gap-5">
                        <OptionButton tip="Edit Proposal" link={route('proposal.edit', [proposal.id])} color="amber" variant="filled">
                            <Cog8ToothIcon className="w-5"/>
                        </OptionButton>
                        <DialogDelete
                            key={proposal.id}
                            content="Proposal"
                            title={"Hapus Proposal?"}
                            message={"Proposal "+proposal.name+" akan dihapus. Proposal yang telah dihapus tidak dapat dikembalikan."}
                            route={route('proposal.destroy', [proposal.id])}
                        /> 
                    </div>
                </div>
            </div>
        </div>
    )
}