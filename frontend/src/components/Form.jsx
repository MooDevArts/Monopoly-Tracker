import React, { useEffect, useState } from 'react'

const Form = (props) => {
    const [selectedUser, setSelectedUser] = useState('');
    const [value, setValue] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const socket = props.socket;
    const filteredUsers = props.users.filter(user => user.name !== props.currUser && user.balance > 0);
  
    const handleUserChange = (event) => {
      setSelectedUser(event.target.value);
      setIsFormValid(true);
    };
    
    useEffect(() => {
      socket.on('connect', () => {
        console.log('connected form')
      })
    }, [])
    const handleValueChange = (event) => {
      setValue(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(value > 0 && value <= props.balance){
        const response  = await fetch(`http://192.168.0.188:8000/pay/${selectedUser}/${props.currUser}/${value}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
        })
        props.fetchuser();
        props.showPaymentForm();
        props.playSound();
      }else{
        alert("Invalid Amount")
      }
      // Add your form submission logic here
      
    };
  
    return (
      <form className='mt-4 p-2 rounded ' onSubmit={handleSubmit}>
        <div>
          <label className='font-bold'>Who to pay?</label>
          <div className='flex flex-col gap-2 mt-2'>
            {filteredUsers.map((user, index) => (
              <div className='hover:bg-red-50 rounded hover:text-red-800 text-white' key={index}>
                <label className='w-full block p-1 rounded border-red-50 border '>
                <input
                  className='mr-4 '
                  type="radio"
                  id={user.id}
                  name="user"
                  value={user.name}
                  checked={selectedUser === user.name}
                  onChange={handleUserChange}
                />
                {user.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-2'>
          <label className='font-bold'>Enter a value:</label>
          <input
            className='mt-2 rounded mb-4 p-1 w-full'
            type="text"
            value={value}
            onChange={handleValueChange}
            required
            inputMode="numeric"
          />
        </div>
        {isFormValid && <button disabled={!isFormValid} className='bg-red-900 p-2 rounded text-white w-full' type="submit">Pay {selectedUser} ₩ {value}</button>}
      </form>
    );
}

export default Form