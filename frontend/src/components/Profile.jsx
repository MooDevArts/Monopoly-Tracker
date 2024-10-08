import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Form from './Form';
import Logs from './Logs';
import { useNavigate } from 'react-router-dom';
import Graph from './Graph';
import sound from '../sounds/snd_fragment_retrievewav-14728.mp3'

const Profile = (props) => {

  const { name } = useParams();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const[pay, setPay] = useState(false);
  const socket = props.socket;
  const navigate = useNavigate();
  const [audio, setAudio] = useState(null);

  //sound preparation
  const prepareSound = async () => {
    try {
      const audioObject = new Audio(sound); 
      setAudio(audioObject);
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  };

  //sound play
  const playSound = () => {
    if (audio) {
      audio.play(); // Play the audio
    } else {
      console.warn('Audio is not prepared yet.');
    }
  };

  const fetchUser = async () => {
    const response = await fetch(`http://192.168.0.188:8000/${name}`);
    const userData = await response.json();
    await setUser(userData);
  }

  async function fetchAllUsers(){
    const response = await fetch('http://192.168.0.188:8000/', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const usersJson = await response.json();
    setUsers(usersJson);
  }

  function showPaymentForm(){
    setPay(!pay);
  }

  useEffect(() => {
    fetchUser(); 
    fetchAllUsers();
    prepareSound();

    socket.on('udateUser', () => {
      fetchUser();
    });

    socket.on('newUser', () => {
      fetchAllUsers();
    });

    socket.on('reset', () => {
      navigate('/');
    });
  }, [])
  

  return (
    <div className='flex flex-col'>
      { user &&<div>
      <h1 className='font-bold text-3xl text-center text-white'>{user.name}</h1>
      <div className='grid grid-cols-2 gap-4 mb-4 mt-4'>
        <div className='col-span-2'><p className={`text-center p-1 bg-yellow-200 rounded transition-all duration-500 `}>Balance: {user.balance}</p></div>
        <p className='text-center p-1 bg-red-300 rounded'>Spent: {user.spent.total}</p>
        <p className='text-center p-1 bg-green-200 rounded'>Earned: {user.recd.total}</p>
      </div>
      </div>}
      <button onClick={showPaymentForm} className='bg-red-900 rounded p-2 text-white'>Payment Form</button>
      {pay && <Form playSound ={playSound} socket = {socket} users = {users} currUser = {user.name} fetchuser={fetchUser} showPaymentForm = {showPaymentForm} balance = {user.balance}/>}
      
      {name !== "Bank" && <Graph name = {name} socket = {socket}/>}

      <Logs socket = {socket}/>

    </div>
  )
}

export default Profile