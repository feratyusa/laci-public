import FileGroups from "@/Components/FileGroups/FileGroups";


export default function Files({files=[]}){
    const mandatoryFiles = [{
        id: "USULAN", name: "SURAT USULAN"
    }]    
    return(
        <FileGroups files={files} mandatoryFiles={mandatoryFiles}/>
    )
}