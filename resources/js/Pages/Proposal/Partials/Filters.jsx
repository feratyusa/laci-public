import { DATE, MULTISELECT, SELECT, TEXT } from "@/Base/FiltersInputType";
import statuses from "@/Base/Statuses";
import FiltersGroup from "@/Components/FiltersGroup/FiltersGroup";

export default function Filters({kursus, categories}){
    const filters = {
        search: '',
        entry_date: {start: '', end: ''},
        category: '',
        kursus: [],
        status: []
    }

    const filtersAttribute = [
        {type: TEXT, name: 'search', placeholder: 'Nama Usulan'},
        {type: DATE, name: 'enry_date', placeholder: 'Tanggal Masuk'},
        {type: SELECT, name: 'category', placeholder: 'Kategori', options: categories},
        {type: MULTISELECT, name: 'kursus', placeholder: 'Kursus', options: kursus, instruction: true},
        {type: MULTISELECT, name: 'status', placeholder: 'Status', options: statuses},
    ]

    return(
        <FiltersGroup 
            filters={filters}
            filtersAttribute={filtersAttribute}
            kursus={kursus}
            categories={categories}
            route={route('proposal.index')}
        />
    )
}