import { Button } from "@material-tailwind/react";

export default function DashboardModeSelection({
    mode,
    setMode,
    defaultMode,
    setDefaultMode,
}){
    return(
        <div className={`${defaultMode != mode ? 'grid grid-cols-8 gap-2' : ''}`}>
            <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className={`rounded-md w-full col-span-7 border-4 border-red-500`}
            >
                <option value="1">Berkas dan Anggaran</option>
                <option value="2">Sertifikasi Pegawai</option>
            </select>
            <Button
                className="col-span-1"
                onClick={() => {
                    setDefaultMode(mode)
                    localStorage.setItem('defaultDashboardMode', mode)
                }}
                hidden={defaultMode == mode}
                color="red"
            >
                Set as Default
            </Button>
        </div>
    )
}
