import Selection from "@/Components/Form/Selection";
import isObjectEmpty from "@/helpers/isObjectEmpty";
import { PlusIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import { Button, IconButton } from "@material-tailwind/react";
import axios from "axios";
import { get } from "lodash";
import { useState } from "react";
import { useEffect } from "react";

function DetailRuleForm({rule, rule_type, index, columns, verbs, prefixes, handleDataChange, handleDeleteRule}){    
    return(
        <div className="grid grid-cols-8 gap-5 items-start mb-3">
            <div>
                <label htmlFor="index">Index</label>
                <input
                    id="index"
                    type="number"
                    value={rule.index}
                    onChange={(e) => handleDataChange(rule_type, e.target.value, 'index', index)}
                    className="w-full"
                />
            </div>
            <div>
                <label htmlFor="child">Child</label>
                <input
                    id="child"
                    type="number"
                    value={rule.child}
                    onChange={(e) => handleDataChange(rule_type, e.target.value, 'child', index)}
                    className="w-full"
                />
            </div>
            <div>
                <label htmlFor="prefix">Prefix</label>
                <Selection 
                    id="prefix"
                    options={prefixes}
                    value={get(rule, 'prefix', null)}
                    onChange={(e) => handleDataChange(rule_type, e.target.value, 'prefix', index)}
                    className="w-full"
                />
            </div>
            <div>
                <label htmlFor="column">Kolom</label>
                <Selection 
                    id="column"
                    options={columns}
                    value={rule.column}
                    onChange={(e) => handleDataChange(rule_type, e.target.value, 'column', index)}
                    className="w-full"
                />
            </div>
            <div>
                <label htmlFor="verb">Verb</label>
                <Selection 
                    id="verb"
                    options={verbs}
                    value={rule.verb}
                    onChange={(e) => handleDataChange(rule_type, e.target.value, 'verb', index)}
                    className="w-full"
                />
            </div>
            <div className="col-span-2">
                <label htmlFor="parameter">Parameter</label>
                <textarea
                    id="parameter"
                    type="text"
                    value={rule.parameter}
                    onChange={(e) => handleDataChange(rule_type, e.target.value, 'parameter', index)}
                    className="w-full"
                />
                <p className="text-sm italic text-gray-500">setiap value dipisah dengan titik koma (;)</p>
            </div>
            <IconButton className="mt-5" size="md" color="red" onClick={() => handleDeleteRule(rule_type, index)}>
                <TrashIcon className="w-full"/>
            </IconButton>
        </div>
    )
}

function RulesForm({data, setData}){
    const [diklatCols, setDiklatCols] = useState([])
    const [empCols, setEmpCols] = useState([])
    const [verbs, setVerbs] = useState([])
    const [prefixes, setPrefixes] = useState([])

    function handleDataChange(rule_type, value, key, index){
        const newRule = [...data[rule_type]]
        
        newRule[index][key] = value
        
        setData(rule_type, newRule)
    }

    function handleAddRule(rule_type, type){
        const rule = {
            type: type,
            index: data[rule_type].length + 1,
            child: '1',
            prefix: 'null',
            column: type == 'course' ? 'kd_kursus' : 'nip',
            verb: 'in',
            parameter: '',
        }

        const newRules = [...data[rule_type], rule]
        
        setData(rule_type, newRules)
    }

    function handleDeleteRule(rule_type, index){
        const newRule = [...data[rule_type]]        
        newRule.splice(index, 1)
        setData(rule_type, newRule)        
    }

    useEffect(()=>{
        axios.get('/api/input/diklatColumns')
            .then((response) => {
                setDiklatCols(response.data.diklatColumns)
        })

        axios.get('/api/input/employeeColumns')
            .then((response) => {
                setEmpCols(response.data.empColumns)
            })
        axios.get('/api/input/verbs')
            .then((response) => {
                setVerbs(response.data.verbs)
        })

        axios.get('/api/input/prefixes')
            .then((response) => {
                setPrefixes(response.data.prefixes)
        })

    }, [])

    return(
        <div>
            <p className="text-red-500 font-bold text-lg">Rules(s)</p>
            <div className="mb-5">
                <p className="font-bold">Tabel Diklat</p>
                {
                    data.course_rules.map((rule, index) => (
                        <DetailRuleForm  
                            rule_type={'course_rules'}   
                            index={index}
                            rule={rule}
                            columns={diklatCols}
                            verbs={verbs}
                            prefixes={prefixes}
                            handleDataChange={handleDataChange}
                            handleDeleteRule={handleDeleteRule}                                        
                        />
                    ))
                }
                <Button size="sm" color="green" className="flex gap-5" onClick={() => handleAddRule('course_rules', 'course')}>
                    <PlusIcon className="w-5"/>
                    Tambah Diklat Rule
                </Button>
            </div>
            <div className="mb-5">
                <p className="font-bold">Tabel Pegawai</p>
                {
                    data.emp_rules.map((rule, index) => (
                        <DetailRuleForm  
                            rule_type={'emp_rules'}   
                            index={index}
                            rule={rule}
                            columns={empCols}
                            verbs={verbs}
                            prefixes={prefixes}
                            handleDataChange={handleDataChange}
                            handleDeleteRule={handleDeleteRule}                                        
                        />
                    ))
                }
                <Button size="sm" color="green" className="flex gap-5" onClick={() => handleAddRule('emp_rules', 'employee')}>
                    <PlusIcon className="w-5"/>
                    Tambah Pegawai Rule
                </Button>
            </div>
        </div>
    )

}

export default function NugieDetailForm({
    mode='create', 
    nugie, 
    detail={
        id: '', 
        name: '',
        nugie_id: '', 
        course_rules: [{type: 'course', index: '1', child: '1', prefix: 'null', column: 'kd_kursus', verb: 'in', parameter: ''}], 
        emp_rules: [{type: 'employee', index: '1', child: '1', prefix: 'null', column: 'nip', verb: 'in', parameter: ''}],
        sql: ''
    }
    }){
    const [defaultDetail, ] = useState(structuredClone(detail))

    const {data, setData, post, put, clearErrors, processing, errors} = useForm({
        name: detail.name,
        nugie_id: nugie.id,
        course_rules:
            detail.course_rules.length != 0
            ? [...detail.course_rules]
            : [{type: 'course', index: '1', child: '1', prefix: 'null', column: 'kd_kursus', verb: 'in', parameter: ''}],
        emp_rules:
            detail.emp_rules.length != 0
            ? [...detail.emp_rules]
            : [{type: 'employee', index: '1', child: '1', prefix: 'null', column: 'nip', verb: 'in', parameter: ''}]
    })

    const [generatedSQL, setGeneratedSQL] = useState(detail.sql)
    const [valid, setValid] = useState([])

    function checkValidDetail(){
        function generateError(table, index, mess){
            if(table == 'diklat'){                
                return String(mess.replaceAll(/:index/gi, `diklat.${index}`).replace(':table', 'Tabel Diklat'))
            }
            else{
                return String(mess.replaceAll(/:index/gi, `pegawai.${index}`).replace(':table', 'Tabel Pegawai'))
            }
        }

        let flag = []

        if(data.course_rules.length == 0) flag.push(generateError('diklat', null, "rule :table harus lebih dari 0"))
        data.course_rules.forEach((rule, index) => {
            let prefix = rule.prefix == 'null' ? null : rule.prefix
            if(index == 0 && (rule.index != 1 || rule.child != 1)) flag.push(generateError('diklat', index, "nilai :index.index dan :index.child :table urutan pertama harus bernilai 1"))
            if(rule.index > data.course_rules.length || Number(rule.index) < 1) flag.push(generateError('diklat', index, 'nilai :index.index :table harus kurang dari jumlah rule dan tidak kurang dari 1'))
            if(rule.child > data.course_rules.filter(r => r.index == rule.index).length || rule.child < 1) flag.push(generateError('diklat', index, 'nilai :index.child :table harus kurang dari jumlah rule di index yang sama dan tidak kurang dari 1'))
            if(data.course_rules.filter(r => r.index == rule.index).filter(p => p.child == rule.child).length > 1) flag.push(generateError('diklat', index, 'nilai :index.child :table pada index yang sama harus unik'))
            if((prefix != null) && rule.index == 1 && rule.child == 1) flag.push(generateError('diklat', index, 'nilai :index.prefix :table pada index 1 harus bernilai null'))
            if((prefix == null) && rule.index != 1 && rule.child == 1) flag.push(generateError('diklat', index, 'nilai :index.prefix :table selain index 1 tidak boleh bernilai null'))
            if(rule.parameter == '') flag.push(generateError('diklat', index, 'nilai :index.parameter :table tidak boleh kosong'))
        })

        if(data.emp_rules.length == 0) flag.push(generateError('pegawai', null, "rule :table harus lebih dari 0"))
        data.emp_rules.forEach((rule, index) => {
            let prefix = rule.prefix == 'null' ? null : rule.prefix
            if(index == 0 && (rule.index != 1 || rule.child != 1)) flag.push(generateError('pegawai', index, "nilai :index.index dan :index.child :table urutan pertama harus bernilai 1"))
            if(rule.index > data.emp_rules.length || rule.index < 1) flag.push(generateError('pegawai', index, 'nilai :index.index :table harus kurang dari jumlah rule dan tidak kurang dari 1'))
            if(rule.child > data.emp_rules.filter(r => r.index == rule.index).length || rule.child < 1) flag.push(generateError('pegawai', index, 'nilai :index.child :table harus kurang dari jumlah rule di index yang sama dan tidak kurang dari 1'))
            if(data.emp_rules.filter(r => r.index == rule.index).filter(p => p.child == rule.child).length > 1) flag.push(generateError('pegawai', index, 'nilai :index.child :table pada index yang sama harus unik'))
            if((prefix != null) && rule.index == 1 && rule.child == 1) flag.push(generateError('pegawai', index, 'nilai :index.prefix :table pada index 1 harus bernilai null'))
            if((prefix == null) && rule.index != 1 && rule.child == 1) flag.push(generateError('pegawai', index, 'nilai :index.prefix :table selain index 1 tidak boleh bernilai null'))
            if(rule.parameter == '') flag.push(generateError('pegawai', index, 'nilai :index.parameter :table tidak boleh kosong'))
        })
        return flag
    }

    function handleReset(){        
        setData((structuredClone(defaultDetail)))
        clearErrors()
    }

    function handleSQLCheck(){
        setGeneratedSQL(false)
        axios.post('/api/nugies/generateSQL', data)
            .then((response) => {
                console.log(response)
                setGeneratedSQL(response.data.sql)
            })
    }

    function handleSubmit(){  
        if(mode == 'edit'){
            put(route('nugie.update.details', {id: nugie.id, detail_id: detail.id }), {
                preserveScroll: true,             
            })
        }
        else{
            post(route('nugie.store.details', [nugie.id]), {
                preserveScroll: true,                
            })
        }   
    }

    useEffect(() => {
        setValid(checkValidDetail())
    }, [data])   

    return(
        <form>
            {
                isObjectEmpty(errors) == false &&
                <div className="bg-red-100 p-3 font-bold rounded-lg border-2 border-red-500 mb-2 mt-5">
                    <div className="flex gap-2 text-red-500 mb-1">
                        <XCircleIcon className="w-5"/>
                        <p className="text-lg">Form Error</p>
                    </div>
                    <div className="pl-5">
                        {
                            Object.keys(errors).map(key => (
                                <p>* {errors[key]}</p>
                            ))
                        }
                    </div>
                </div>
            }          
            <div className="mb-2">
                <label htmlFor="name" className="font-bold text-red-500 text-lg">Nama Detail</label>
                <input
                    id="name"
                    placeholder="Nama Detail"
                    className="w-full"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
            </div>
            {
                valid.length > 0 &&
                <div className="bg-red-100 p-3 font-bold rounded-lg border-2 border-red-500 mb-2 mt-5">
                    <div className="flex gap-2 text-red-500 mb-1">
                        <XCircleIcon className="w-5"/>
                        <p className="text-lg">Rule Error</p>
                    </div>
                    <div className="pl-5">
                        {
                            valid.map(error => (
                                <p>* {error}</p>
                            ))
                        }
                    </div>
                </div>
            }
            <RulesForm 
                data={data}
                setData={setData}
            />
            {
                generatedSQL != '' &&
                <div className="p-3 mb-5 text-white bg-blue-500 border-2 border-blue-900">
                    <p className="text-xl font-bold">Generated SQL:</p>
                    <p className="pl-5">{generatedSQL}</p>
                </div>
            }
            <div className="flex gap-5 mb-5">
                <Button color="green" loading={processing} disabled={valid.length > 0} onClick={() => handleSubmit()}>
                    Simpan
                </Button>
                <Button color="amber" disabled={valid.length > 0} onClick={() => handleSQLCheck()}>
                    Cek SQL
                </Button>
                <Button color="blue" onClick={() => handleReset()}>
                    Reset
                </Button>
            </div>
        </form>            
    )
}