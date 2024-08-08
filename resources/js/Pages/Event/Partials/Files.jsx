import { IHTMandatoryCategories, PTMandatoryCategories } from "@/Base/MandatoryFileCategories";
import FileGroups from "@/Components/FileGroups/FileGroups";

export default function Files({files=[], event_category="IHT"}){
    const mandatoryFiles = event_category === "IHT" ? IHTMandatoryCategories : PTMandatoryCategories

    return(
        <FileGroups files={files} mandatoryFiles={mandatoryFiles}/>
    )
}