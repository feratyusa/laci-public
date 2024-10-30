import { BookOpenIcon } from "@heroicons/react/24/solid"

export default function GuideContents({children, title, summary, toc}){
    return(
        <div className="mb-10">
            <div className="mb-5">
                <div className="flex items-center gap-5 text-red-500 mb-5">
                    <BookOpenIcon className="w-10"/>
                    <p className="font-bold text-4xl">{title}</p>
                </div>
                
                <p className="text-lg mb-5">{summary}</p>

                <ol className="list-[upper-alpha] list-inside pl-5 text-lg">
                    {
                        toc.map(list => (
                            <div className="mb-2">
                            <li className="underline text-blue-500 hover:text-red-500">
                                <a href={list.content}>{list.title}</a>
                            </li>
                            {
                                list?.child &&
                                <ol className="list-decimal list-inside pl-5">
                                    {
                                        list.child.map(child => (
                                            <li className="underline text-blue-500 hover:text-red-500">
                                                <a href={child.content}>{child.title}</a>
                                            </li>
                                        ))
                                    }
                                </ol>
                            }
                            </div>
                        ))
                    }
                </ol>

                <div className="w-full h-1 bg-red-100 mt-10 mb-10"></div>
            </div>
            {children}
        </div>
    )
}