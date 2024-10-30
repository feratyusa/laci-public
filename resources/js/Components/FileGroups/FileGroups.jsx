import FileCategory from "./FileCategory";

export default function FileGroups({contentName='', routeFile, files=[], mandatoryFiles=[]}){
    return(
        <div className="flex flex-col justify-start gap-2">
            <div className="w-full border-2 border-gray-500 px-5 py-5 rounded-lg">
                {
                    mandatoryFiles.map((mandatory) => (
                        <FileCategory
                            contentName={contentName}
                            files={files.filter(f => f.category.id === mandatory?.id)} 
                            category_id={mandatory.id} 
                            title={mandatory.name}
                            routeFile={routeFile}
                        />
                    ))
                }
                <FileCategory files={files.filter(f => ! mandatoryFiles.find(m => m.id == f.category.id) )}/>
            </div>
        </div>
    )
}