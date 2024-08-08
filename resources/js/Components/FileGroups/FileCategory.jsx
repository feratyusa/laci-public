import AlertStatusFile from "./AlertStatusFile";
import DisclosureFile from "./DisclosureFile";
import FileCard from "../FileCard";

export default function FileCategory({files, title=null}){
    return(
        <div className="mb-5 border-b-2 pb-5 border-gray-500">
            {
                title ? 
                    <DisclosureFile
                        title={title}
                        className="my-5"
                        isOpen={true}
                    >
                        {
                            files.length != 0 ? 
                            files.map((file) => (
                                <FileCard 
                                    file={file}
                                />
                            )) :
                            <AlertStatusFile title={title + " Belum Ada/Diupload"} status="danger" />
                        }
                    </DisclosureFile>
                :
                    <DisclosureFile
                        title={"LAINNYA"}
                        className="my-5"
                        isOpen={true}
                    >
                    {
                        files.length != 0 ? 
                        files.map((file) => (
                            <FileCard 
                                file={file}
                            />
                        )) :
                        <AlertStatusFile title={"File Kosong"} />
                    }
                    </DisclosureFile>
            }
        </div>
    )
}