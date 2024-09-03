import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Entry(props) {

  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const socket = props.socket;

  async function fetchAllUsers(){
    const response = await fetch('http://192.168.0.188:8000/', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const usersJson = await response.json();
    console.log(usersJson);
    setUsers(usersJson);
  }

  useEffect(() => {
    fetchAllUsers();

    socket.on('newUser', () => {
      fetchAllUsers();
    })
  }, [])
  

  async function handleSubmit(e){

    e.preventDefault();

    const regex = /^[a-zA-Z\s]+$/; // Regular expression for letters only
    if (regex.test(name)) {

      try {
    
        console.log(name);
      const response = await fetch ("http://192.168.0.188:8000/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"name": name}),
      });
      const data = await response.json();
      console.log(data.name);
      navigate(`/profile/${data.name}`);
  
      } catch (error) {
        console.log("frontend Post err", error);
      }
      
    }else{
      alert("No Special Chars");
    }
    
  }

  async function handlechange(e){
    setName(e.target.value)
  }

  return (
    <div>
      <form className='flex flex-col gap-4 place-content-around' onSubmit={handleSubmit}>
        <h1 className='text-5xl text-center'>Welcome to Monopoly!</h1>
        <div className='flex flex-col align-middle justify-center'>
        <input className=' rounded p-2 mt-2 text-center'  placeholder="Your Name" name="name" value={name} onChange={handlechange}></input>
        <button className='bg-red-900 rounded p-2 text-white mt-4'>Enter Game</button>
        </div>
      </form>
      <div className='text-center mt-2 font-bold'>In Game Right Now</div>
      {users.map((user, index) => (
        <div className='text-yellow-800 bg-black p-2 rounded mt-2 text-center' key={index}>{user.name}</div>
      ))}
      </div>
  )
}

export default Entry