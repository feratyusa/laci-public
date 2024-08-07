import { Alert, Chip, Typography } from "@material-tailwind/react";
import { CheckBadgeIcon, CheckIcon, Cog8ToothIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import DialogDelete from "@/Components/DialogDelete";
import OptionButton from "@/Components/OptionButton";
import DialogAddFile from "@/Components/DialogAddFile";
import { useEffect, useState } from "react";


const AlertStatusFile = ({status, text}) => {    
    return(
        <div className={"text-white flex items-center max-w-md rounded-full px-5 py-1 gap-5 " + (status ? "bg-green-600" : "bg-red-600")}>
            <>
                {status == 0 ? <XCircleIcon className="w-5"/> : <CheckBadgeIcon className="w-5"/>}
                <p className="font-bold">{text}</p>
            </>
        </div>
    )
}

const ProposalFileStatus = ({files=[]}) => {
    const [status, setStatus] = useState(true)
    const mandatoryFile = ["USULAN"]
    const alertClass = "flex flex-row items-center max-w-lg"
    var alertStatus = []
    console.log(files.find(f => f.id === mandatoryFile[0]))
    console.log(alertStatus)
    useEffect(() => {
        var flag = false
        mandatoryFile.forEach((mandatory) => {
            if(! files.find(f => f.id === mandatory) == null){
                setStatus(false)
                flag = true
                alertStatus.push(<AlertStatusFile status={0} text={"Surat Usualan Mbolong"}/>)
            }
        })
        if(flag) alertStatus.push(<AlertStatusFile status={1} text={"Aman"}/>)
    }, [])
    return alertStatus

}

function TableRow({files=null, name, value=null, color="red", option=null}){    
    return(
        <div className="table-row">
            <div className={"table-cell border-b-2 py-4 max-w-60"}>
                <Typography variant="h6">
                    {name}
                </Typography>
            </div>
            <div className={"table-cell border-b-2 py-4 pl-10 bg-gray-50"}>
                {
                    option == "status" ?
                    <ProposalFileStatus files={files}/> :
                    option == "chip" ?
                    <Chip 
                        className="w-fit"
                        color={color}
                        value={value}
                    /> :
                    <Typography variant="h6">
                        {value}
                    </Typography>
                }
            </div>
        </div>
    )
}


export default function ProposalDetails({proposal, color, categories}){
    const dateoptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    // console.log(proposal.files)

    return(
        <div className="table w-full p-2 mb-5">
            <div className="table-row-group">
                <TableRow name={"ID Usulan"} value={proposal.id} />
                <TableRow name={"Nama Usulan"} value={proposal.name}  />
                <TableRow name={"Kategori"} value={proposal.event_category}  />
                <TableRow name={"Kursus"} value={`(${proposal.kd_kursus}) ${proposal.kursus.Lengkap}`}  />
                <TableRow name={"Tanggal Masuk Usulan"} value={new Date(proposal.entry_date).toLocaleDateString('id', dateoptions)}  />
                <TableRow name={"Status"} value={proposal.status} color={color} option={'chip'} />
                <TableRow name={"Tanggal Dibuat"} value={new Date(proposal.created_at).toLocaleTimeString('id', dateoptions)} color={color} />
                <TableRow name={"Tanggal Diupdate"} value={new Date(proposal.created_at).toLocaleTimeString('id', dateoptions)} color={color} />
                <TableRow name={"Status"} value={""} files={proposal.files} option={"status"}/>
                <div className="table-row">
                    <div className={"table-cell border-b-2 py-4 w-60"}>
                        <Typography variant="h6">
                            Options
                        </Typography>
                    </div>
                    <div className={"table-cell border-b-2 py-4 pl-10 bg-gray-50"}>
                        <div className="flex flex-row gap-5">
                            <DialogAddFile 
                                content={"proposal"} 
                                content_id={proposal.id} 
                                content_name={proposal.name} 
                                categories={categories} 
                                route={route('file.store')}
                            />
                            <OptionButton tip="Edit Proposal" link={route('proposal.edit', [proposal.id])} color="yellow" variant="filled">
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
        </div>
    )
}