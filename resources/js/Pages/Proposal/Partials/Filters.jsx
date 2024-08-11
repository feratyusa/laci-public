import { DATE, MULTISELECT, SELECT, TEXT } from "@/Base/FiltersInputType";
import statuses from "@/Base/Statuses";
import FiltersGroup from "@/Components/FiltersGroup/FiltersGroup";

export default function Filters({kursus, categories}){
    const filters = {
        name: '',
        entry_date: {start: '', end: ''},
        event_category: '',
        kd_kursus: [],
        status: []
    }

    const filtersAttribute = [
        {type: TEXT, name: 'name', placeholder: 'Nama Usulan'},
        {type: DATE, name: 'enry_date', placeholder: 'Tanggal Masuk'},
        {type: SELECT, name: 'event_category', placeholder: 'Kategori', options: categories},
        {type: MULTISELECT, name: 'kd_kursus', placeholder: 'Kursus', options: kursus, instruction: true},
        {type: MULTISELECT, name: 'status', placeholder: 'Status', options: statuses},
    ]

    return(
        <FiltersGroup 
            filters={filters}
            filtersAttribute={filtersAttribute}
            route={route('proposal.index')}
        />
    )
}