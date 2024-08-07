import DisclosureFile from "@/Components/DisclosureFile";
import FileCard from "@/Components/FileCard";

export default function Files({files}){
    <div className="flex flex-col justify-start">
        <p className="">File(s)</p>
        <div className="w-full">
            <DisclosureFile>
                {
                    files.map((file) => (
                        <FileCard 
                            file={file}
                        />
                    ))
                }
            </DisclosureFile>
        </div>
        <div className="grid grid-cols-5 max-w-full border-y-2 gap-4 my-5 p-2">
        </div>
    </div>
}