import AlertStatusFile from "./AlertStatusFile";
import DisclosureFile from "./DisclosureFile";
import FileCard from "./FileCard";
import FileDropInput from "./FileDropInput";

export default function FileCategory({contentName='', routeFile='', category_id='', files, title=null}){
    return(
        <div className="mb-5 border-b-2 pb-5 border-gray-500">
            {
                title ? 
                <DisclosureFile
                    title={title}
                    className="my-5"
                    isOpen={false}
                    warning={files.length == 0}
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
                    <div className="mt-10">
                        <FileDropInput category_id={category_id} route={routeFile} name={contentName}/>
                    </div>
                </DisclosureFile>
                :
                <>
                    
                    <DisclosureFile
                        title={"LAINNYA"}
                        className="my-5"
                        isOpen={false}
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
                </>
            }
        </div>
    )
}