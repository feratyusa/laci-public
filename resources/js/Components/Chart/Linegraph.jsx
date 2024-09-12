import { Line } from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title, Legend} from 'chart.js'

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title, Legend
)

export default function Linegraph({data}){
    const options = {}
    return(
        <Line options={options} data={data}/>
    )
}