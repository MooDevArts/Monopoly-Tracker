import React from 'react'
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import io from 'socket.io-client'
const socket = io('http://192.168.0.5:8000')


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App socket = {socket}/>
  </React.StrictMode>,
)
