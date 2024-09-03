import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables, Colors } from 'chart.js';

const Graph = (props) => {

  const [users, setUsers] = useState([]);
  const socket = props.socket;

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

    socket.on('updateLogs', () => {
      fetchAllUsers();
    })
  }, [])
  
  //creating dynamic data sets
  const userPointData = users.map((user) => ({
    label: user.name,
    data: user.pointData,
    borderColor: user.name === props.name ? 'red' : 'black',
    backgroundColor: user.name === props.name ? 'red' : 'black',
    borderWidth: 1,
    pointRadius: 0
  }));
  
  console.log(userPointData);

  //longest length of transactions
  const longestPointDataLength = userPointData.reduce((maxLength, user) => {
    // Check if user has pointData and compare lengths
    return Math.max(maxLength, user.data?.length || 0);
  }, 0);

  console.log(longestPointDataLength);

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
  Chart.register(Colors);
  Chart.defaults.color = 'white'
  Chart.register(...registerables);

  return <Line data={data} options={options} />;
};

export default Graph;
