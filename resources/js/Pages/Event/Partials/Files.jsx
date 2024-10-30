import FileGroups from "@/Components/FileGroups/FileGroups";

export default function Files({files=[], mandatoryFiles}){
    return(
        <FileGroups files={files} mandatoryFiles={mandatoryFiles}/>
    )
}