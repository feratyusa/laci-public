import Authenticated from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import HeaderTitle from "@/Components/HeaderTitle";
import { Button, Card, CardBody, CardHeader, IconButton, Typography } from "@material-tailwind/react";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { Head, Link, useForm } from "@inertiajs/react";
import ReactSelect from "react-select";
import statuses from "@/Base/Statuses";
import MultipleFileInput from "@/Components/MultipleFileInput";
import InputError from "@/Components/InputError";

export default function Create({auth}){
    const today = new Date()
    const today_string = `${today.getFullYear()}-${('0'+(today.getMonth() + 1)).slice(-2)}-${('0'+(today.getDate())).slice(-2)}`
    
    const event_category = [
        {value:'In House Training', label:'In House Training'},
        {value:'Public Training', label:'Public Training'}
    ]
    
    const kd_kursus =[
        {value: '90051', label: '90051'},
        {value: '90050', label: '90050'},
        {value: '90049', label: '90049'},
        {value: '90048', label: '90048'},
        {value: '90047', label: '90047'},
        {value: '90046', label: '90046'},
        {value: '90045', label: '90045'},
        {value: '90044', label: '90044'},
        {value: '90043', label: '90043'},
        {value: '90042', label: '90042'},
    ]
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        event_category: event_category[0].value,
        entry_date: today_string,
        kd_kursus: '',
        status: statuses[0].value,
        files: '',
    });

    console.log(errors)

    function handleSubmit(e){
        e.preventDefault()
        console.log(data)
        post(route('proposal.store'), {forceFormData: true})
    }
    function handleCancel(){

    }
    


    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'buat usulan baru'}/>}
        >
            <Head title="Buat Usulan"/>

            <div className="m-10">
                <Card className="px-5 pb-10">
                    <CardHeader className="bg-red-500 flex justify-center p-2">
                        <IconButton
                            variant="text"
                            color="white"                            
                        >
                            <DocumentPlusIcon className="h-8 w-8"/>
                        </IconButton>
                    </CardHeader>
                    <CardBody>
                        <div className="flex justify-center my-4">
                            <Typography
                            variant="h4"
                            color="red"
                            className="uppercase"
                            >
                                Form Usulan Baru
                            </Typography>
                        </div>
                        <form onSubmit={handleSubmit} action="post" className="border-y-4 border-x px-5 py-10 rounded-lg border-red-500 flex flex-col gap-8" enctype="multipart/form-data">
                            <div className="table w-full">
                                <div className="table-row-group">
                                    <div className="table-row">
                                        <div className="table-cell pb-8 w-44">
                                            <InputLabel value="Nama" htmlFor="name" 
                                                className="text-red-500 font-bold text-lg" />
                                        </div>
                                        <div className="table-cell pb-8">
                                          <TextInput 
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                placeholder="Nama Usulan"
                                                autoComplete="name"
                                                isFocused={true}
                                                className="border-x-0 border-t-0 rounded-none border-b-red-500 focus:ring-red-500 focus:border-red-500"
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            <p className="text-sm italic text-gray-400">Alphanumeric only, maximum length 120 characters</p>

                                            <InputError message={errors.name} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                        </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="table-cell pb-8 w-44">
                                            <InputLabel value="Tanggal Masuk" htmlFor="entry-date" 
                                                className="text-red-500 font-bold text-lg" />
                                        </div>
                                        <div className="table-cell pb-8">
                                            <input 
                                                id="entry-date"
                                                name="entry-date"
                                                type="date"
                                                value={data.entry_date}
                                                className="focus:border-red-500 focus:ring-0"
                                                onChange={(e) => setData('entry_date', e.target.value)}
                                            />

                                            <InputError message={errors.entry_date} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                        </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="table-cell pb-8 w-44">
                                            <InputLabel value="Kategori Event" htmlFor="event-category" 
                                                className="text-red-500 font-bold text-lg" />
                                        </div>
                                        <div className="table-cell pb-8">
                                          <ReactSelect
                                                id="event-category"
                                                name="event-category"
                                                classNamePrefix="select2-selection"
                                                className="max-w-72 focus:border-red-500"
                                                options={event_category}
                                                value={event_category.find(v => v.value === data.event_category)}
                                                onChange={(e) => setData('event_category', e.value)}
                                                theme={(theme) => ({
                                                    ...theme,
                                                    colors: {
                                                      ...theme.colors,
                                                      primary: 'red',
                                                    },
                                                })}
                                          />

                                            <InputError message={errors.event_category} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                        </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="table-cell pb-8 w-44">
                                            <InputLabel value="Kode Kursus" htmlFor="kd-kursus" 
                                                className="text-red-500 font-bold text-lg" />
                                        </div>
                                        <div className="table-cell pb-8">
                                          <ReactSelect
                                                id="kd-kursus"
                                                name="kd-kursus"
                                                classNamePrefix="select2-selection"
                                                className="max-w-72 focus:border-red-500"
                                                value={kd_kursus.find(k => k.value === data.kd_kursus)}
                                                options={kd_kursus}
                                                onChange={(e) => setData('kd_kursus', e.value)}
                                                theme={(theme) => ({
                                                    ...theme,
                                                    colors: {
                                                      ...theme.colors,
                                                      primary: 'red',
                                                    },
                                                })}
                                          />

                                            <InputError message={errors.kd_kursus} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                        </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="table-cell pb-8 w-44">
                                            <InputLabel value="Status" htmlFor="status" 
                                                className="text-red-500 font-bold text-lg" />
                                        </div>
                                        <div className="table-cell pb-8">
                                          <ReactSelect
                                                id="status"
                                                classNamePrefix="select2-selection"
                                                className="max-w-72 focus:border-red-500"
                                                options={statuses}
                                                value={statuses.find(s => s.value === data.status)}
                                                onChange={(e) => setData('status', e.value)}
                                                theme={(theme, e) => ({
                                                    ...theme,
                                                    colors: {
                                                      ...theme.colors,
                                                      primary: 'red',
                                                    },
                                                })}
                                          />
                                          
                                          <InputError message={errors.status} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                        </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="table-cell pb-8 w-44">
                                            <InputLabel value="Upload File(s)" htmlFor="files" 
                                                className="text-red-500 font-bold text-lg" />
                                        </div>
                                        <div className="table-cell pb-8">
                                          <MultipleFileInput 
                                            id="files"
                                            onChange={(e) => setData('files', e.target.files)}
                                            files={data.files}
                                            multiple
                                          />

                                        <InputError message={errors['files.0']} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-10 justify-center">
                                <Button
                                    type="submit"
                                    color="red"
                                    onClick={(e) => handleSubmit(e)}>
                                    Submit 
                                </Button>
                                <Link href={route('proposal.index')}>
                                    <Button color="yellow">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>

        </Authenticated>
    )
}