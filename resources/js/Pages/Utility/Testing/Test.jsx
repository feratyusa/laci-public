import FileDropInput from "@/Components/FileGroups/FileDropInput";

export default function Test({}){
    return(
        <div>
            <p>Test</p>
            <FileDropInput
                category_id={'USULAN'}
                title="Tambah File Usulan"
                route={route('file.store.proposal', [1])}
            />
        </div>
    )
}