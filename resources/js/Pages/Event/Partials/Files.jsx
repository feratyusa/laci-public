import { IHTMandatoryCategories, PTMandatoryCategories } from "@/Base/MandatoryFileCategories";
import FileGroups from "@/Components/FileGroups/FileGroups";
import { useState } from "react";

export default function Files({files=[], mandatoryFiles}){
    const [mandatories, ] = useState(mandatoryFiles)

    return(
        <FileGroups files={files} mandatoryFiles={mandatoryFiles}/>
    )
}