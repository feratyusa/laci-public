import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { 
    ArrowPathIcon,
    PlusIcon,
    Cog8ToothIcon
 }
from "@heroicons/react/24/solid"
import {
  Card,  
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
  Chip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Collapse,
  Alert
} from "@material-tailwind/react";
import { Head, Link } from "@inertiajs/react";
import OptionButton from "@/Components/OptionButton";
import { useEffect, useState } from "react";
import Pagination from "@/Components/Pagination";
import Select from "react-select";
import Statuses from "@/Base/Statuses";
import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import DialogDelete from "@/Components/DialogDelete";

const LinkProposal = ({children, className='', id}) => {
    return(
        <Link className={"cursor-pointer "+className} href={route('proposal.show', [id])}>
            {children}
        </Link>
    )
}

export default function Index({ auth, status, code, proposals, paginator }) {
    // Collapse State
    const [open, setOpen] = useState(false)
    const  [collapseClass, setCollapseClass] = useState("")  
    // Dialog
    const [openDialog, setOpenDialog] = useState(false)
    function handleOpenDialog(){
        setOpenDialog(true)
    }
    function handleCloseDialog() {
        setOpenDialog(false)
    }

    function openCollapse(state){
        setOpen(state)
        if(state) setCollapseClass("overflow-visible");
        else setCollapseClass("");
    }  
    
    const columns = [
        "ID", "NAMA USULAN", "KATEGORI","KODE KURSUS", "TANGGAL MASUK", "STATUS", "OPSI"
    ];

    const years = [
        {value: '2024', label: '2024'},
        {value: '2023', label: '2023'},
        {value: '2022', label: '2022'},
        {value: '2021', label: '2021'},
        {value: '2020', label: '2020'},
    ]

    const months = [
        {value: '1', label: 'January'},
        {value: '2', label: 'February'},
        {value: '3', label: 'March'},
        {value: '4', label: 'April'},
        {value: '5', label: 'May'},
        {value: '6', label: 'June'},
        {value: '7', label: 'July'},
        {value: '8', label: 'August'},
        {value: '9', label: 'September'},
        {value: '10', label: 'October'},
        {value: '11', label: 'November'},
        {value: '12', label: 'December'},       
    ]

    const categories = [
        {value: 'In House Training', label: 'In House Training'},
        {value: 'Public Training', label: 'Public Training'},
    ]

    useEffect(() => {
        
    })

    return (
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'usulan'}/>}
        >
            <Head title="Usulan"/>
            
            <div className="container min-h-screen min-w-full p-5">
                <BreadcrumbMod menu="proposals" />
                <Card className="h-max mt-5">
                    <div className="flex justify-between mx-5 mt-5 mb-5">
                        <div className="w-max">
                            <Link href={route('proposal.create')}>
                                <Button className="flex items-center gap-3" color="green" variant="filled">
                                    <PlusIcon className="h-4 w-4"/>
                                    Usulan
                                </Button>                            
                            </Link>
                        </div>
                        <div className="flex gap-3">
                            <Input 
                                type="text"
                                label="Search"
                                variant="outlined"                            
                                className="border-0 focus:ring-0"
                            />
                            <IconButton className="p-5" color="red">
                                <MagnifyingGlassIcon className="h-5 w-5"/>
                            </IconButton>
                        </div>
                    </div>
                    <div className="container">                            
                        <Collapse open={open} className={collapseClass}>
                            <div className="flex gap-5 p-10 px-5">
                                <div className="flex flex-col gap-2">
                                    <Typography variant="h6">Tahun</Typography>
                                    <Select 
                                        classNamePrefix="select2-selection"
                                        placeholder="Tahun"
                                        className="min-w-36"
                                        options={years}
                                        isSearchable={true}
                                        isClearable={true}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Typography variant="h6">Bulan</Typography>
                                    <Select 
                                        isClearable={true}
                                        placeholder="Bulan"
                                        classNamePrefix="select2-selection"
                                        className="min-w-48"
                                        options={months} 
                                        isSearchable={true}                                            
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Typography variant="h6">Kategori</Typography>
                                    <Select 
                                        isClearable={true}
                                        placeholder="Kategori"
                                        classNamePrefix="select2-selection"
                                        className="min-w-36"
                                        options={categories} 
                                        isSearchable={true}                                            
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Typography variant="h6">Status</Typography>
                                    <Select 
                                        isClearable={true}
                                        placeholder="Status"
                                        classNamePrefix="select2-selection"
                                        className="min-w-36"
                                        options={Statuses} 
                                        isSearchable={true}                                            
                                    />
                                </div>
                            </div>
                        </Collapse>
                        <Button
                            className="flex items-center justify-center min-w-full gap-5"
                            variant="text"
                            onClick={() => openCollapse(!open)}>
                                <Typography
                                    variant="h6"
                                >
                                    Filter
                                </Typography>
                                {
                                    open 
                                    ? <ArrowUpIcon className="h-5 w-5"/>
                                    : <ArrowDownIcon className="h-5 w-5"/> 
                                }
                        </Button>
                    </div>  
                    <CardBody className="overflow-scroll px-0">
                        {status && 
                            <Alert color={code===0 ? "red" : code===1 ? 'green' : 'amber'}>
                                {status}
                            </Alert>}

                        <div className="table w-full mt-2">
                            <div className="table-header-group bg-red-600 text-center">
                                <div className="table-row">
                                    {
                                        columns.map((column, index) => (
                                          <div className="table-cell p-4 text-white text-bold"> 
                                                {column}
                                          </div>  
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="table-row-group text-center">
                                {                                    
                                    proposals?.map((proposal, index) => {
                                        const cellClassName = "table-cell border-y p-4 align-middle ";
                                        const dateoptions = {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }
                                        return (
                                            <div className="table-row hover:bg-gray-100" key={proposal.id} id={proposal.id}>
                                                <LinkProposal className={cellClassName + "w-16"} id={proposal.id}>
                                                    {proposal.id}
                                                </LinkProposal>
                                                <LinkProposal className={cellClassName + "w-72"} id={proposal.id}>
                                                    {proposal.name}
                                                </LinkProposal>
                                                <LinkProposal className={cellClassName + "w-30"} id={proposal.id}>
                                                    {proposal.event_category}
                                                </LinkProposal>
                                                <LinkProposal className={cellClassName + "w-30"} id={proposal.id}>
                                                    {proposal.kd_kursus}
                                                </LinkProposal>
                                                <LinkProposal className={cellClassName + "w-60"} id={proposal.id}>
                                                    {new Date(proposal.entry_date).toLocaleDateString('id', dateoptions)}
                                                </LinkProposal>
                                                <LinkProposal className={cellClassName + "w-16"} id={proposal.id}>
                                                    {
                                                        <Chip color={Statuses.find(status => status.value === proposal.status).color} 
                                                            value={proposal.status}
                                                            variant="ghost"
                                                        />
                                                    }
                                                </LinkProposal>
                                                <div className={cellClassName}>
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
                                                        handleClose={handleCloseDialog}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="flex justify-center">
                        {
                            paginator ? 
                            <Pagination paginator={paginator}/>
                            : ''
                        }
                    </CardFooter>
                </Card>
            </div>            
        </Authenticated>
    )
}