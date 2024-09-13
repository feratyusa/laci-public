import { useReactTable } from "@tanstack/react-table";

export default function FiltersTable({table=useReactTable({}), filters=[]}){
    return(
        <div className="w-full">
            <div className="flex justify-center items-center gap-5">
                <div className="flex items-center gap-5">
                    <label htmlFor="id">
                        ID
                    </label>
                    <input
                        className="rounded-md"
                        id="id" 
                        placeholder="ID"
                        onChange={(e) => table.getColumn('id').setFilterValue(e.target.value)}                     
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="name">
                        Nama Usulan
                    </label>
                    <input
                        className="rounded-md"
                        id="name" 
                        placeholder="Nama Usulan"
                        onChange={(e) => table.getColumn('name').setFilterValue(e.target.value)}                     
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="course">
                        Kursus
                    </label>
                    <input
                        className="rounded-md"
                        id="course" 
                        placeholder="Kursus"
                        onChange={(e) => table.getColumn('course').setFilterValue(e.target.value)}                     
                    />
                </div>
            </div>
            <Button className="w-full rounded-none" onClick={() => setOpen(!open)}>
                More Filter
            </Button>
            <div className={`${open == false ? "h-0 opacity-0" : ''}`}>
                <div>
                    
                </div>
            </div>
        </div>
    )
}