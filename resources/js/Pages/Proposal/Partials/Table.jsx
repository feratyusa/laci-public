import DialogDelete from "@/Components/Dialogs/DialogDelete";
import OptionButton from "@/Components/OptionButton";
import { ArrowPathIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { Chip, IconButton, Menu, MenuHandler, MenuItem, MenuList, Tooltip } from "@material-tailwind/react";
import Statuses from "@/Base/Statuses";

const LinkProposal = ({children, className='', id}) => {
    return(
        <Link className={"cursor-pointer "+className} href={route('proposal.show', [id])}>
            {children}
        </Link>
    )
}

export default function TableProposal({proposals}){
    const columns = [
        "ID", "NAMA USULAN", "KATEGORI","KURSUS", "TANGGAL MASUK", "STATUS", "OPSI"
    ];

    return(
        <div className="table w-full mt-2">
            <div className="table-header-group bg-red-600 text-center">
                <div className="table-row">
                    {
                        columns.map((column, index) => (
                            <div className="table-cell p-4 text-white text-bold align-middle"> 
                                {column}
                            </div>  
                        ))
                    }
                </div>
            </div>
            <div className="table-row-group text-center">
                {                                    
                    proposals?.map((proposal, ) => {
                        const cellClassName = "table-cell border-y p-4 align-middle text-sm ";
                        const dateoptions = {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }
                        return (
                            <div className="table-row hover:bg-gray-100" key={proposal.id} id={proposal.id}>
                                <LinkProposal className={cellClassName + ""} id={proposal.id}>
                                    {proposal.id}
                                </LinkProposal>
                                <LinkProposal className={cellClassName + ""} id={proposal.id}>
                                    {proposal.name}
                                </LinkProposal>
                                <LinkProposal className={cellClassName + ""} id={proposal.id}>
                                    {proposal.event_category}
                                </LinkProposal>
                                <LinkProposal className={cellClassName + ""} id={proposal.id}>
                                    {proposal.kursus.Lengkap}
                                </LinkProposal>
                                <LinkProposal className={cellClassName + ""} id={proposal.id}>
                                    {new Date(proposal.entry_date).toLocaleDateString('id', dateoptions)}
                                </LinkProposal>
                                <LinkProposal className={cellClassName + ""} id={proposal.id}>
                                    {
                                        <Chip color={Statuses.find(status => status.value === proposal.status).color} 
                                            value={proposal.status}
                                            variant="ghost"
                                        />
                                    }
                                </LinkProposal>
                                <div className={cellClassName + "w-40"}>
                                    <Menu>
                                        <Tooltip content="Ganti Status">
                                            <MenuHandler>
                                                <IconButton variant="text" color="green">
                                                    <ArrowPathIcon className="h-5 w-5"/>
                                                </IconButton>
                                            </MenuHandler>
                                        </Tooltip>
                                        <MenuList className="rounded-lg border-none">
                                            <MenuItem key={'id'} disabled>
                                                <Chip value={"ID "+ proposal.id} 
                                                        variant="outlined"
                                                        className="text-center"
                                                />
                                            </MenuItem>
                                            {
                                                Statuses.map((status, index) => 
                                                    status.value !== proposal.status ?
                                                    (
                                                        <Link method="post" 
                                                            href={route('proposal.status', [proposal.id])}
                                                            data={{'status': status.value}}
                                                        >
                                                            <MenuItem key={proposal.id}>
                                                                <Chip value={"SET TO " + status.value}
                                                                    color={status.color}
                                                                    variant="ghost"
                                                                />
                                                            </MenuItem>
                                                        </Link>

                                                    ) : ''
                                                )
                                            }
                                        </MenuList>
                                    </Menu>
                                    <OptionButton tip="Edit Proposal" color="yellow" link={route('proposal.edit', [proposal.id])}>
                                        <Cog8ToothIcon className="h-5 w-5"/>
                                    </OptionButton>
                                    <DialogDelete 
                                        key={proposal.id}
                                        content="Proposal"
                                        title={"Hapus Proposal?"}
                                        variant="text"
                                        message={"Proposal "+proposal.name+" akan dihapus. Proposal yang telah dihapus tidak dapat dikembalikan."}
                                        route={route('proposal.destroy', [proposal.id])}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}