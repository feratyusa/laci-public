export default function FiltersForm({}){
    const {data, setData, get, transform, isDirty, reset, processing} = useForm({
        search: filters ? filters.search : '',
        start_date: filters ? filters.start_date : '',
        end_date: filters ? filters.end_date : '',
        category: filters ? filters.category : '',
        kursus: filters ? filters?.kursus : [],
        status: filters ? filters?.status : [],
    })
 
    // Collapse State
    const [open, setOpen] = useState(false)
    const  [collapseClass, setCollapseClass] = useState("") 

    const [openSelect, setOpenSelect] = useState(false)

    const filterClassName = "flex flex-col gap-2"

    function openCollapse(state){
        setOpen(state)
        if(state) setCollapseClass("overflow-visible");
        else setCollapseClass("");
    }

    function handleSelectChange(property, e, multi=false){
        if(multi){
            var elements = []
            e.forEach(element => {
                elements.push(element.value)
            });
        }
        if(property === 'status'){
            setData('status', [...elements])
        }
        else if(property === 'kursus'){
            setData('kursus', [...elements])
        }
        else{
            setData('category', e?.value ?? "")
        }
    }

    function handleInputChange(s){
        if(s.length > 2) setOpenSelect(true)
        else setOpenSelect(false)
    }
    
    function handleSubmit(e){
        e.preventDefault()
        get(route, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: openCollapse(false)           
        })
    }

    return(
        <div className="flex flex-col gap-5 px-5 mt-5 mb-10">
            <div className={filterClassName}>
                <InputLabel htmlFor="search">
                    <Typography variant="h6">Nama Usulan</Typography>
                </InputLabel>
                <TextInput
                    id="search"
                    name="search"
                    placeholder="Nama"
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                />
            </div>
            <div className={filterClassName}>
                <Typography variant="h6">Tanggal Masuk</Typography>
                <div className="flex gap-5">
                    <div className="w-full max-w-lg">
                        <InputLabel htmlFor="start_date">
                            <Typography>
                                Dari
                            </Typography>
                        </InputLabel>
                        <InputDate
                            id="start_date"
                            name="start_date" 
                            value={data.start_date}
                            onChange={(e) => setData('start_date',e.target.value) }
                        />
                    </div>
                    <div className="w-full max-w-lg">
                        <InputLabel htmlFor="end_date">
                            <Typography>
                                Sampai
                            </Typography>
                        </InputLabel>
                        <InputDate 
                            id="end_date"
                            name="end_date"
                            value={data.end_date}
                            onChange={(e) => setData('end_date', e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className={filterClassName}>
                <InputLabel htmlFor="category">
                    <Typography variant="h6">Kategori</Typography>
                </InputLabel>
                <ReactSelect
                    id="category"
                    name="category" 
                    placeholder="Kategori"
                    classNamePrefix="select2-selection"
                    className="min-w-36"
                    options={[...categories]}
                    value={categories.find(c => c.value === data.category) ?? ""}                             
                    isClearable  ={true}                                                                                    
                    onChange={(e) => handleSelectChange('category', e)}
                />
            </div>
            <div className={filterClassName}>
                <InputLabel htmlFor="kursus">
                    <Typography variant="h6">Kursus</Typography>
                </InputLabel>
                <ReactSelect
                    id="kursus"
                    name="kursus"
                    classNamePrefix="select2-selection"
                    className="max-w-5xl focus:border-red-500"
                    value={kursus.length != 0 ? kursus.filter(k => data.kursus.includes(k.value)) : ''}
                    options={[...kursus]}
                    openMenuOnClick={false}
                    onChange={(e) => handleSelectChange('kursus', e, true)}
                    onInputChange={(s) => handleInputChange(s)}
                    menuIsOpen={openSelect}
                    isSearchable
                    isClearable
                    isMulti
                    menuShouldBlockScroll
                />
                <InputInstruction text="Ketik 3 karakter"/>
            </div>
            <div className={filterClassName}>
                <InputLabel htmlFor="status">
                    <Typography variant="h6">Status</Typography>
                </InputLabel>
                <ReactSelect 
                    id="status"
                    name="status[]"
                    placeholder="Status"
                    classNamePrefix="select2-selection"
                    className="w-full"
                    options={[...statuses]} 
                    isSearchable={true}                     
                    isMulti
                    isClearable
                    value={data.status.length != 0 ? statuses.filter(s => data.status.includes(s.value)) : ''}
                    onChange={(e) => handleSelectChange('status', e, true)}
                />
            </div>
            <div className="flex gap-5 justify-center">
                <Button
                    className="flex items-center gap-2 py-3 pr-5 pl-3"
                    type="submit"
                    color="green"
                    onClick={(e) => handleSubmit(e)}
                    loading={processing}
                >
                    <MagnifyingGlassIcon className="w-5"/>
                    Apply
                </Button>
                <Button
                    className="flex items-center gap-2 w-fit py-3 pr-5 pl-3"
                    // onClick={handleReset}
                    onClick={() => reset()}
                    color="orange"
                >
                    <XMarkIcon className="w-5"/>
                    Reset
                </Button>
            </div>
        </div>  
    )
}