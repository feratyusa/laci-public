import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { changes } from "@/Base/ChangeLogs"

export default function ChangeLogList(){
    return(
        <div className="prose p-5 w-full">         
            {
                changes.map(element => (
                    <div className="mb-10 pb-5 border-b-2 border-gray-500">
                        <p className="my-0 text-red-500 text-xl font-bold tracking-wide">{element.title}</p>
                        <div className="prose p-5">
                            <Markdown remarkPlugins={[remarkGfm]}>
                                {element.md}
                            </Markdown>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}