import FileGroups from "@/Components/FileGroups/FileGroups";

export default function Files({contentName, routeFile, files=[], mandatoryFiles}){
    return(
        <FileGroups contentName={contentName} routeFile={routeFile} files={files} mandatoryFiles={mandatoryFiles}/>
    )
}