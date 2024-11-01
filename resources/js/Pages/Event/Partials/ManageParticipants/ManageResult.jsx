import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import ParticipantResult from "./ParticipantsResult";
import DeletedParticipantsResult from "./DeletedParticipants";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import Participants from "../Participants";
import { router } from "@inertiajs/react";
import { data } from "autoprefixer";
import { Button } from "@material-tailwind/react";
import ConfirmationDialog from "@/Components/Dialogs/ConfirmationDialog";

export default function ManageResult({
    event_id='',
    participants,
    setParticipants,
    deletedParticipants,
    setDeletedParticipants,
}){
    const tabClass = "py-2 px-5 bg-red-100 uppercase font-bold text-red-500 data-[hover]:bg-red-300 data-[hover]:text-white data-[selected]:bg-red-500 data-[selected]:text-white border-0 ring-0"

    function handleSave(){
        console.log(participants.map(p => p.nip))
        router.put(route('event.participant.update', [event_id]), {nip: participants.map(p => p.nip)}, {
            preserveState: false            
        })
    }

    function handleSaveAndReplace(){

    }

    return(
        <div>
            <div className="mb-10 text-red-500">
                <div className="flex items-center gap-5">
                    <UserGroupIcon className="w-10"/>
                    <p className="font-bold text-2xl">Hasil Filter Peserta</p>
                </div>
            </div>
            <TabGroup className={'mb-10'}>
                <TabList className={'grid grid-cols-2 mb-5'}>
                    <Tab className={tabClass}>Hasil</Tab>
                    <Tab className={tabClass}>Terhapus</Tab>
                </TabList>
                <TabPanels>                    
                    <TabPanel>
                        <ParticipantResult participants={participants} setParticipants={setParticipants} setDeletedParticipants={setDeletedParticipants} deletedParticipants={deletedParticipants}/>
                    </TabPanel>
                    <TabPanel>
                        <DeletedParticipantsResult deletedParticipants={deletedParticipants} setDeletedParticipants={setDeletedParticipants} participants={participants} setParticipants={setParticipants} />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
            <div className="flex items-center gap-5 mb-10">
                <ConfirmationDialog 
                    buttonText="Simpan Peserta" 
                    handleConfirmation={() => handleSave()}
                    title="Simpan Peserta"
                    message="Peserta di atas akan ditambahkan menjadi peserta event. Peserta lama akan tetap ada."
                />
                <ConfirmationDialog 
                    buttonColor="blue" 
                    buttonText="Simpan dan Gantikan Peserta" 
                    handleConfirmation={() => handleSaveAndReplace()}
                    title="Simpan dan Gantikan Peserta"
                    message="Peserta di atas akan menggantikan Peserta yang lama. Aksi ini tidak dapat dikembalikan."
                />
            </div>
        </div>
    )
}