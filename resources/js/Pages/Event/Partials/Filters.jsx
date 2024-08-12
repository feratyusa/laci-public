import { DATE, MULTISELECT, NUMBER, SELECT, TEXT } from "@/Base/FiltersInputType";
import statuses from "@/Base/Statuses";
import FiltersGroup from "@/Components/FiltersGroup/FiltersGroup";

export default function Filters({kursus, categories}){
    const filters = {
        name: '',
        start_date: {start: '', end: ''},
        end_date: {start: '', end: ''},
        event_category: '',
        participant_number: {start: '', end: ''},
        training_price: {start: '', end: ''},
        accomodation_price: {start: '', end: ''},
        kd_kursus: []
    }

    const filtersAttribute = [
        {type: TEXT, name: 'name', placeholder: 'Nama Usulan'},
        {type: DATE, name: 'start_date', placeholder: 'Tanggal Mulai'},
        {type: DATE, name: 'end_date', placeholder: 'Tanggal Selesai'},
        {type: SELECT, name: 'event_category', placeholder: 'Kategori', options: categories},
        {type: NUMBER, name: 'participant_number', placeholder: 'Partisipan'},
        {type: NUMBER, name: 'training_price', placeholder: 'Biaya Pendidikan'},
        {type: NUMBER, name: 'accomodation_price', placeholder: 'Biaya Pelatihan'},
        {type: MULTISELECT, name: 'kd_kursus', placeholder: 'Kursus', options: kursus, instruction: true},
    ]
    
    return(
        <FiltersGroup 
            filters={filters}
            filtersAttribute={filtersAttribute}
            route={route('event.index')}
        />
    )
}