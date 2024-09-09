import DialogDelete from "@/Components/Dialogs/DialogDelete";
import OptionButton from "@/Components/OptionButton";
import { Link } from "@inertiajs/react";

import Statuses from "@/Base/Statuses";
import { Cog8ToothIcon, EyeIcon } from "@heroicons/react/24/solid";
import { DropdownMenuOption } from "@/Components/DropdownOptions";
import { MenuItem } from "@headlessui/react";

const LinkProposal = ({children, className='', id}) => {
    return(
        <Link className={"cursor-pointer "+className} href={route('proposal.show', [id])}>
            {children}
        </Link>
    )
}

export default function TableProposal({proposals}){
    const columns = [
        "ID", "NAMA USULAN", "KATEGORI","KURSUS", "TANGGAL MASUK", "OPSI"
    ];

    return(
        <div className="table table-auto w-full mt-2 text-xs">
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
                                    {proposal.kursus.lengkap}
                                </LinkProposal>
                                <LinkProposal className={cellClassName + ""} id={proposal.id}>
                                    {new Date(proposal.entry_date).toLocaleDateString('id', dateoptions)}
                                </LinkProposal>
                                {/* <LinkProposal className={cellClassName + ""} id={proposal.id}>
                                    {
                                        <Chip color={Statuses.find(status => status.value === proposal.status).color} 
                                            value={proposal.status}
                                            variant="ghost"
                                        />
                                    }
                                </LinkProposal> */}
                                <div className={cellClassName + "w-40"}>
                                    {/* <Menu>
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
                                    </Menu> */}
                                    <DropdownMenuOption>
                                        <MenuItem>
                                            <Link href={route('proposal.show', [proposal.id])} className="block p-2 data-[focus]:bg-blue-100">
                                                <div className="flex items-center gap-2 text-blue-500">
                                                    <EyeIcon className="w-5"/>
                                                    Lihat Usulan
                                                </div>
                                            </Link>   
                                        </MenuItem>
                                        <MenuItem>
                                            <Link href={route('proposal.edit', [proposal.id])} className="block p-2 data-[focus]:bg-amber-100">
                                                <div className="flex items-center gap-2 text-amber-500">
                                                    <Cog8ToothIcon className="w-5"/>
                                                    Edit Usulan
                                                </div>
                                            </Link>   
                                        </MenuItem>
                                        <MenuItem>
                                            <DialogDelete mode="text" route={route('proposal.destroy', [proposal.id])} content={'event'} title={'Hapus Usulan'} message={`Yakin ingin menghapus (${proposal.name})? Usulan yang telah dihapus tidak dapat dikembalikan`}/>  
                                        </MenuItem>
                                    </DropdownMenuOption>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}