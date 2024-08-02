import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { Card, CardBody } from "@material-tailwind/react";
import { filesize } from "filesize";
import fileCategory from "@/Base/FileCategory";

export default function FileCard({file}){
    const border_color = fileCategory.find(c => c.value === file.category).border_color
    const bg_color = fileCategory.find(c => c.value === file.category).bg_color
    const text_color = fileCategory.find(c => c.value === file.category).text_color

    return(
        <Card className={"w-80 border-2 "+border_color+" "+text_color}>
            <CardBody>
                <div className="flex flex-col space-between">
                    <div className="flex items-center">
                        <DocumentTextIcon className={"max-w-32"}/>
                        <div className="flex flex-col overflow-hidden">
                            <p className="truncate text-base">
                                {file.name}
                            </p>
                            <p className="uppercase text-base">
                                {file.mime_type}
                            </p>
                            <p className="text-base">
                                {filesize(file.size)}
                            </p>
                        </div>
                    </div>
                    <div className={"rounded-lg text-white text-center text-xs p-1 "+bg_color}>
                        <p className="font-bold">{file.category}</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}