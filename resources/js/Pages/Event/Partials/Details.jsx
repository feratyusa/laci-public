import { Button, Chip, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { ArrowPathIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";
import DialogDelete from "@/Components/Dialogs/DialogDelete";
import OptionButton from "@/Components/OptionButton";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import EventPriceDetail from "./EventPriceDetail";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { get } from "lodash";

function ChangeDefaultPriceDialog({route}){
    const {put, processing} = useForm()
    const [open, setOpen] = useState(false)

    function handleOpen(){
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    function handleDelete(){
        put(route, {
            preserveScroll: true,
            onSuccess: handleClose()
        })
    }

    return(
        <>            
            <Tooltip content="Ganti Status Anggaran">
                <IconButton size="sm" color="green" variant="text" onClick={() => handleOpen()}>
                    <ArrowPathIcon className="w-full"/>
                </IconButton>
            </Tooltip>                
            <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={handleClose}>
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black/30" />

                {/* Dialog Content */}
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                            >
                            <Typography variant="h5" className="mb-8">
                                Reset Anggaran menjadi Anggaran Awal
                            </Typography>
                            <Typography variant="paragraph">
                                Anggaran yang telah dimasukkan akan dihapus dan tidak dapat dikembalikan
                            </Typography>
                            <div className="flex flex-row justify-center gap-5 mt-8">
                                <Button
                                    color="yellow"
                                    onClick={handleClose}
                                    >
                                    Cancel
                                </Button>
                                <Button
                                    color="red"
                                    loading={processing}
                                    onClick={handleDelete}
                                    >
                                    Reset
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </> 
    )
}

function BudgetStatus({defaultPrices}){
    const color = defaultPrices ? "red" : "green"

    return(
        <Chip 
            className="w-fit"
            color={color}
            value={defaultPrices ? "Anggaran Awal" : "Anggaran Realisasi"}
        /> 
    )
}

function TableRow({name, value=null, color="red", option=null, link=null}){        
    return(
        <div className="grid grid-cols-6 border-b-2 mr-10">
            <div className={"col-span-2 flex items-center py-3 px-2 max-w-60"}>
                <p className="font-bold">{name}</p>
            </div>
            <div className={"col-span-4 flex items-center pl-5 bg-gray-50"}>
                {
                    option == 'budgetStatus' ? 
                    <div className="flex gap-2">
                        <BudgetStatus defaultPrices={value?.defaultPrices}/>                        
                        <ChangeDefaultPriceDialog route={route('event.changeDefaultPrices', [value.id])} />
                    </div>
                    :
                    option == 'price' ?
                    <EventPriceDetail event={value} details={value.prices}/>
                    :
                    option == "chip" ?
                    <Chip 
                        className="w-fit"
                        color={color}
                        value={value}
                    /> 
                    : 
                    option == "link" ?
                    <Link href={link} className="underline hover:text-red-900 hover:underline">
                        <p className="text-blue-500 hover:text-red-500">{"["+value.id+"] "+value.name+" ("+value.entry_date+")"}</p>      
                    </Link> 
                    :
                    option == 'number_type' ?
                    <div className="flex items-center gap-3">
                        <Chip 
                            className="w-fit"
                            color={color}
                            value={value}
                        /> 
                        <Tooltip content="Ganti Tipe">
                            <Link href={link} method="put" as="div">
                                <IconButton color="green" size="sm" variant="text">
                                    <ArrowPathIcon className="w-full"/>
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </div>
                    :
                    <p className="">{value}</p>
                }
            </div>
        </div>
    )
}

export default function EventDetails({event, categories, proposalRoute}){
    const [color, ] = useState(event.participant_number_type == "DYNAMIC" ? 'purple' : 'teal')
    const dateoptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    return(
        <div>
            <div className="lg:grid lg:grid-rows-8 md:grid-flow-col">
                <TableRow name={"ID Event"} value={event.id} />
                <TableRow name={"Nama Event"} value={event.name} />
                <TableRow name={"Proposal"} option={'link'} link={proposalRoute} value={event.proposal} />
                <TableRow name={"Kategori"} value={event.proposal.event_category} />
                <TableRow name={"Kursus"} value={`(${get(event, 'proposal.kd_kursus', '0')}) ${get(event, 'proposal.kursus.lengkap', 'Kursus')}`}  />
                <TableRow name={"Lembaga"} value={`(${get(event, 'proposal.kd_lembaga', '0')}) ${get(event, 'proposal.vendor.lengkap', 'Vendor')}`}  />
                <TableRow name={"Tanggal Mulai"} value={new Date(event.start_date).toLocaleDateString('id', dateoptions)}  />
                <TableRow name={"Tanggal Selesai"} value={new Date(event.end_date).toLocaleDateString('id', dateoptions)}  />
                <TableRow name={"Tipe Jumlah Partisipan"} value={event.participant_number_type} option={'number_type'} color={color} link={route('event.number-type', [event.id])}/>
                <TableRow name={"Jumlah Partisipan"} value={event.participant_number_type == 'FIXED' ? event.participant_number : event.participants.length} />
                <TableRow name={"Anggaran"} option={'price'} value={event}/>
                <TableRow name={"Total Anggaran"} value={`Rp ${Number(event?.total_prices).toLocaleString()}` ?? 0} />
                <TableRow name={"Status Anggaran"} value={event} option={"budgetStatus"} />
                <TableRow name={"Dibuat Oleh"} value={event.created_by ?? 'NULL'} />
                <TableRow name={"Assign Kepada"} value={event.assign_to ?? 'NULL'} />
                <TableRow name={"Lokasi"} value={event?.location?.name ?? 'NULL'} />
                <TableRow name={"Tanggal Dibuat"} value={new Date(event.created_at).toLocaleTimeString('id', dateoptions)} />
                <TableRow name={"Tanggal Diupdate"} value={new Date(event.updated_at).toLocaleTimeString('id', dateoptions)}/>
                <TableRow name={"Sudah Migrasi"} value={get(event, 'is_migrated', 0) == 0 ? 'Belum' : 'Sudah'} />
                <div className="grid grid-cols-6 border-b-2 mr-10">
                    <div className={"col-span-2 flex items-center py-4"}>
                        <Typography variant="h6">
                            Options
                        </Typography>
                    </div>
                    <div className={"col-span-4 py-4 pl-10 bg-gray-50"}>
                        <div className="flex items-center gap-5">
                            <OptionButton tip="Edit Proposal" link={route('event.edit', [event.id])} color="yellow" variant="filled">
                                <Cog8ToothIcon className="w-5"/>
                            </OptionButton>
                            <DialogDelete
                                key={event.id}
                                content="Event"
                                title={"Hapus Event?"}
                                message={"Event "+event.name+" akan dihapus. Event yang telah dihapus tidak dapat dikembalikan."}
                                route={route('event.destroy', [event.id])}
                            /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}