import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartAnnotation from 'chartjs-plugin-annotation';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const data = {
//     labels,
//     datasets: [
//         {
//             label: "Dataset 1",
//             data: labels.map(() =>
//                 faker.datatype.number({ min: -1000, max: 1000 })
//             ),
//             borderColor: "rgb(255, 99, 132)",
//             backgroundColor: "rgba(255, 99, 132, 0.5)",
//         },
//         {
//             label: "Dataset 2",
//             data: labels.map(() =>
//                 faker.datatype.number({ min: -1000, max: 1000 })
//             ),
//             borderColor: "rgb(53, 162, 235)",
//             backgroundColor: "rgba(53, 162, 235, 0.5)",
//         },
//     ],
// };

function Chart1(props) {
    const labels = props.labels;
    const data = {
        labels,
        datasets: [
            {
                label: props.label,
                data: props.sales,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            // {
            //     label: "Dataset 2",
            //     data: labels.map(() =>
            //         faker.datatype.number({ min: -1000, max: 1000 })
            //     ),
            //     borderColor: "rgb(53, 162, 235)",
            //     backgroundColor: "rgba(53, 162, 235, 0.5)",
            // },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: props.text
            },
            
        },
       
    };
    return <Line options={options} data={data} />;
}

export default Chart1;
