import React from 'react'
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import io from 'socket.io-client'
import {ip} from './../../ip-front.js'
const socket = io(`http://${ip}:8000`)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App socket = {socket}/>
  </React.StrictMode>,
)
