import FileGroups from "@/Components/FileGroups/FileGroups";
import { useState } from "react";

export default function Files({files=[], mandatoryFiles=[]}){
    return(
        <FileGroups files={files} mandatoryFiles={mandatoryFiles}/>
    )
}