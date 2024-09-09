import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { useState } from "react";
import BudgetTable from "./BudgetTable";

function BudgetDetailTable({details=[]}){
    return(
        <table className="table-fixed w-full text-center">
            <thead>
                <tr className="bg-red-500 text-white">
                    <th className="p-2">ID</th>
                    <th>Nama</th>
                    <th>Anggaran</th>
                </tr>
            </thead>
            <tbody>
                {
                    details.length == 0 ?
                    <tr>
                        <td colSpan={3} className="bg-gray-300 text-white font-bold uppercase p-3">
                            <p>Kosong</p>
                        </td>
                    </tr>
                    :
                    details.map(detail => (
                        <tr className="border-b-2 border-red-200">
                            <td className="p-3">{detail.id}</td>
                            <td>{detail.name}</td>
                            <td>{`Rp ${Number(detail.value).toLocaleString()}`}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default function BudgetDetailShow({budget}){
    const [open, setOpen] = useState(false)

    return(
        <>
            <Tooltip content="Lihat Detail Anggaran">
                <IconButton size="sm" color="blue" onClick={() => setOpen(!open)}>
                    <EyeIcon className="w-full"/>
                </IconButton>
            </Tooltip>
            <Dialog 
                open={open} 
                onClose={() => setOpen(false)} 
                className="relative z-50"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/30 ease-in duration-200 data-[closed]:opacity-0"
                />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel 
                    transition
                    className="w-full max-w-2xl space-y-4 rounded-2xl bg-white p-12 ease-in duration-200 data-[closed]:opacity-0"
                >
                    <DialogTitle className="text-center">
                        <p className='uppercase font-bold'>{`Detail Anggaran Tahun ${budget.year}`}</p>
                        <p className='text-xs italic text-gray-500'>ID: {budget.id}</p>
                    </DialogTitle>
                    <div className='mb-5'>
                        <BudgetTable budget={budget} details={budget.details}/>
                    </div>
                    <div>
                        <BudgetDetailTable details={budget.details}/>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                    <Button onClick={() => setOpen(false)} color="red">Tutup</Button>
                    </div>
                </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}