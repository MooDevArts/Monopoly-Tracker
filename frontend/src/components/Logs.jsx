import React, { useEffect, useState } from 'react'

const Logs = (props) => {

    const [logs, setLogs] = useState([]);
    const [rLogs, setRLogs] = useState([]);
    const socket = props.socket;
    const reversedLogs = [...logs].reverse();
    const [highlight, setHighlight] = useState(false);

    const fetchLogs = async () => {
        const response = await fetch(`http://192.168.0.188:8000/logs`, {
            method: "GET"
        });
        const allLogs = await response.json();
        await setLogs(allLogs);
    }
    
    useEffect(() => {
      fetchLogs();
      socket.on('updateLogs', () => {
        fetchLogs();
        setHighlight(true);
      setTimeout(() => setHighlight(false), 1000);
      });
    }, [])
    

  return (
    <div className={`mt-2 p-2 max-h-80 overflow-y-scroll logs-wrapper ${highlight ? 'updated-logs-wrapper' : ''}`}>
        {reversedLogs.map((item, index) => (
            <div className='text-yellow-800 bg-black p-2 rounded mt-2 text-center transition-all duration-500' key={index}>
                {item.log}
            </div>
        ))}
    </div>
  )
}

export default Logs