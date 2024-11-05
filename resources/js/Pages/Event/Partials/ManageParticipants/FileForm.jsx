export default function FileForm({data, setData, errors}){
    return(
        <div>
            <input 
                type="file"
                onChange={(e) => setData('file', e.target.files[0])}
            />
        </div>
    )
}