import FileGroups from "@/Components/FileGroups/FileGroups";
import { useState } from "react";

export default function Files({files=[], mandatoryFiles=[]}){
    const [mandatories, ] = useState([
        {id: mandatoryFiles[0].category.id, name: mandatoryFiles[0].category.name}
    ])

    return(
        <FileGroups files={files} mandatoryFiles={mandatories}/>
    )
}