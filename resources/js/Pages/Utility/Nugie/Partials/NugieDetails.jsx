import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Button, IconButton } from "@material-tailwind/react"
import NugieDetailForm from "./NugieDetailForm"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { useState } from "react"
import { Cog8ToothIcon, EyeIcon } from "@heroicons/react/24/solid"
import DialogDelete from "@/Components/Dialogs/DialogDelete"
import { useEffect } from "react"
import axios from "axios"
import LoadingCircle from "@/Components/Loading/LoadingCircle"

function DetailRow({nugie, detail, setEmployees}){
    const [emps, setEmps] = useState(null)
    const [open, setOpen] = useState(false)    

    useEffect(() => {
        axios.get(`/api/nugies/${nugie.id}/nugieData/${detail.id}`)
            .then((response) => {
                setEmps(response.data.employees)
            })
    }, [detail])

    return(
        <>
            <tr className="group border-t-2 border-red-500">
                <td className="p-3">{detail.name}</td>
                {
                    emps == null ? 
                    <td>
                        <div className="flex justify-center">
                            <LoadingCircle size="h-2 w-2"/>
                        </div>
                    </td> 
                    : 
                    <td className="text-green-500">{emps?.in?.length}</td>
                }
                {
                    emps == null ? 
                    <td>
                        <div className="flex justify-center">
                            <LoadingCircle size="h-2 w-2"/>
                        </div>
                    </td> 
                    : 
                    <td className="text-red-500">{emps?.not?.length}</td>
                }                
                <td>
                    <div className="flex justify-center gap-2">
                        {
                            emps == null ?
                            <div className="w-fit">
                                <LoadingCircle size="h-2 w-2"/>
                            </div>
                            :
                            <IconButton size="sm" color="blue" onClick={() => setEmployees({name: detail.name, empIn: emps?.in, empOut: emps?.not})}>
                                <EyeIcon className="w-full"/>
                            </IconButton>

                        }
                        <IconButton size="sm" color={open ? "red" : "amber"} onClick={() => setOpen(!open)}>
                            {
                                open == false ?
                                <Cog8ToothIcon className="w-full"/>
                                :
                                <XMarkIcon className="w-full"/>
                            }
                        </IconButton>
                        <DialogDelete 
                            content={'Nugie Detail'}
                            title={`Hapus ${detail.name}`}
                            message={'Aksi ini tidak dapat dikembalikan'}
                            route={route('nugie.destroy.details', {id: nugie.id, detail_id: detail.id})}
                            buttonSize="sm"
                        />
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan={4} className={`text-left`}>
                    <div className={`transition-full duration-300 ease-out ${open == false ? 'opacity-0 hidden' : 'p-5'}`}>
                        <NugieDetailForm mode="edit" nugie={nugie} detail={detail.rules}/>              
                    </div>
                </td>
            </tr>
        </>
    )
}

function ReportTable({nugie, details, setEmployees}){       
    return(
        <table className="w-full table-fixed text-center border-2 border-red-500">
            <thead className="bg-red-500 text-white">
                <tr>
                    <th className="p-3">Nama</th>
                    <th>Pegawai Sudah</th>
                    <th>Pegawai Belum</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {
                    details.map(detail => (
                        <DetailRow nugie={nugie} detail={detail} setEmployees={setEmployees}/>
                    ))
                }
            </tbody>

        </table>
    )
}

function AddNugieDetailDisclosure({nugie}){
    return(
        <Disclosure>
            {({open}) => (
                <>
                    <DisclosureButton>
                        {
                            open == false ? 
                            <Button size="md" color="blue" className="flex gap-3" >
                                <PlusIcon className="w-5"/>
                                Tambah Detail Nugie
                            </Button>
                            :
                            <Button size="md" color="red" className="flex gap-3" >
                                <XMarkIcon className="w-5"/>
                                Tutup
                            </Button>
                        }
                    </DisclosureButton>
                    <DisclosurePanel
                        transition
                        className="transition duration-300 ease-out p-5 data-[closed]:-translate-y-6 data-[closed]:opacity-0"
                    >
                        <NugieDetailForm nugie={nugie}/>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}

export default function NugieDetails({
    nugie,
    details,
    setEmployees
}){
    return(
        <div>
            <div className="flex items-center gap-3 mb-5">
                <AddNugieDetailDisclosure nugie={nugie}/>
                <a href={route('nugie.export', [nugie.id])} target="__blank">
                    <Button color="amber">
                        Export Nugie
                    </Button>
                </a>
            </div>
            <ReportTable nugie={nugie} details={details} setEmployees={setEmployees}/>
        </div>
    )
}