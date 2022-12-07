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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
var moment = require("moment");
moment().format();

function Analytics(props) {
  let datas = props.datas;
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Analytics for ${props.name} `,
      },
    },
  };
  let arrdata = [];
  arrdata = datas.map((d, index) => d.createdAt);
  arrdata = arrdata.sort();
  let yearstart = 2021;
  const yearend = moment().year();
  let yearall = [];
  let monthyear = [[]];
  let monthdata = [[]];

  for (let i = 0; i < yearend - yearstart + 1; i++) {
    yearall.push(yearstart + i);
    monthyear[i] = arrdata.filter((a) => moment(a).year() == yearstart + i);
  }
  for (let i = 0; i < yearend - yearstart + 1; i++) {
    let m = monthyear[i];
    let l = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let k = 0; k < 12; k++) {
      let count = 0;
      m.map((m) => {
        if (moment(m).month() == k) count++;
      });
      l[k] = count;
    }
    monthdata[i] = l;
  }
  let m = [{}];
  const colours = ["red", "blue", "green", "orange"];
  for (let k = 0; k < yearend - yearstart + 1; k++) {
    m[k] = {
      label: yearall[k],
      data: monthdata[k],
      borderColor: colours[k],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    };
  }

  // console.log(m)
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: m.map((m) => m),
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
}

export default Analytics;
