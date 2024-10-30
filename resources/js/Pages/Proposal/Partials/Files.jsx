import FileGroups from "@/Components/FileGroups/FileGroups";

export default function Files({contentName, routeFile, files=[], mandatoryFiles=[]}){
    return(
        <FileGroups 
            files={files} 
            mandatoryFiles={mandatoryFiles}
            routeFile={routeFile}
            contentName={contentName}
        />
    )
}