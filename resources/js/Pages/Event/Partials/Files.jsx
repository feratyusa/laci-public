import FileGroups from "@/Components/FileGroups/FileGroups";

export default function Files({contentName, routeFile, files=[], mandatoryFiles}){
    console.log(routeFile)
    return(
        <FileGroups contentName={contentName} routeFile={routeFile} files={files} mandatoryFiles={mandatoryFiles}/>
    )
}