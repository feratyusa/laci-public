import FileCategory from "./FileCategory";
import FileGroupTitle from "./GroupTitle";

export default function FileGroups({files=[], mandatoryFiles=[]}){
    return(
        <div className="flex flex-col justify-start gap-2">
            <FileGroupTitle title={"File(s)"}/>
            <div className="w-full border-2 border-gray-500 px-5 py-5 rounded-lg">
                {
                    mandatoryFiles.map((mandatory) => (
                        <FileCategory files={files.filter(f => f.category.id === mandatory?.id)} title={mandatory.name}/>
                    ))
                }
                <FileCategory files={files.filter(f => ! mandatoryFiles.find(m => m.id == f.category.id) )}/>
            </div>
        </div>
    )
}