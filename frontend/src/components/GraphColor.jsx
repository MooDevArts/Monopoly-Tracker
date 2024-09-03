import React, { useEffect, useState } from 'react'
import { Line, PolarArea, Bar } from 'react-chartjs-2';
import { Chart, registerables, Colors, scales } from 'chart.js';

const GraphColor = () => {
  const [users, setUsers] = useState([]);

  //user Data
  async function fetchAllUsers(){
    const response = await fetch('http://192.168.0.188:8000/', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const usersJson = await response.json();
    const onlyUsers = usersJson.slice(1);
    setUsers(onlyUsers);
  }

  useEffect(() => {
    fetchAllUsers();
  }, [])
  
  //creating dynamic data sets
  const userPointData = users.map((user) => ({
    label: user.name,
    data: user.pointData,
    borderWidth: 2,
    pointRadius: 1
  }));

  //creating user name array
  const userNames = users.map(user => user.name);

  //creating economic contribution Data
  const userEcoData = users.map((user) => user.spent.total)

  //total economy
  let economy = 0;
for (let i = 0; i < userEcoData.length; i++) {
  economy += userEcoData[i]; // Add each element to the sum
}
  
  console.log(users);

  //longest length of transactions
  const longestPointDataLength = userPointData.reduce((maxLength, user) => {
    // Check if user has pointData and compare lengths
    return Math.max(maxLength, user.data?.length || 0);
  }, 0);

  const usersEarned = users.map(user => user.recd.total);
  console.log(usersEarned);

  //creating labels array
  function generateNumberList(num) {
    const numberArray = [];
    for (let i = 1; i <= num; i++) {
      numberArray.push(i);
    }
    return numberArray;
  }

  const labels = generateNumberList(longestPointDataLength);

  // Data for the line graph
  const data = {
    labels: labels,
    datasets: userPointData,
  };

  // Options for the line graph
  const options = {
    scales: {
      x: {
        ticks: {
          color: 'white', // Change to your desired color for x-axis numbers
        },
      },
      y: {
        ticks: {
          color: 'white', // Change to your desired color for y-axis numbers
        }
  }}};

  //data for Radar
  const polarData = {
    labels: userNames,
    datasets: [{
      label: 'contribution',
      data: userEcoData,
      borderWidth: 0,
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',  // Light pink
        'rgba(54, 162, 235, 0.5)',  // Light blue
        'rgba(255, 206, 86, 0.5)',  // Light orange
        'rgba(67, 36, 157, 0.5)',  // Light purple
        'rgba(139, 195, 74, 0.5)',  // Light green
        'rgba(255, 159, 67, 0.5)',  // Light orange-red
        'rgba(150, 40, 27, 0.5)',   // Light maroon
        'rgba(98, 181, 181, 0.5)',  // Light teal
      ],
    }]
  }

  //options for Polar
  const polarOptions = {
  }

  Chart.register(Colors);
  Chart.defaults.color = 'white'
  Chart.defaults.backgroundColor = 'red'
  Chart.register(...registerables);

  return <div className='flex flex-col items-start'>
    <h1 className='text-white text-6xl'>Timeline:</h1>
  <Line className=' m-h' data={data} options={options} />
  <h1 className='text-white text-6xl mt-10'>Total Cash Flow: <span className='text-yellow-600'><span className=''>₩</span> {economy}</span></h1>
  <h1 className='text-white text-3xl mt-4'>Contribution by player:</h1>
  <PolarArea className='m-h'  data ={polarData}  options={polarOptions} />
  <h1 className='text-white text-3xl mt-4'>₩ earned by player:</h1>
  <Bar className='m-h' data={{
  labels: userNames,
  datasets: [{
    label: '₩',
    data: usersEarned
  }]
}} />
  </div>
};

export default GraphColor