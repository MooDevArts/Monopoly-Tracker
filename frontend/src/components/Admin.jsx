import React from 'react'
import { useNavigate } from 'react-router-dom';
import GraphColor from './GraphColor'

const Admin = () => {

    const navigate = useNavigate();

    async function handleClick() {
        const response = await fetch(`http://192.168.0.188:8000/reset`, {
            method: "GET"
        })
        const result = await response.json();
        console.log(result);
        navigate('/');
    }

  return (
    <>
    <button onClick={handleClick} className='bg-red-800 rounded p-3 text-xl text-white mb-8'>Reset</button>
    <GraphColor />
    </>
  )
}

export default Admin