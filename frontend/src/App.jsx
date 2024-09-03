import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Entry from './components/Entry'
import Profile from './components/Profile'
import List from './components/List'
import Admin from './components/Admin'


function App(props) {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Entry socket = {props.socket} />
    },
    {
      path: '/profile/:name',
      element: <Profile socket = {props.socket}/>
    },
    {
      path: '/list',
      element: <List />
    },
    {
      path: '/admin',
      element: <Admin />
    }
  ])

  return (
    <div className='bg-slate-500 min-w-full min-h-screen p-4 flex pt-16 align-middle flex-col'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App