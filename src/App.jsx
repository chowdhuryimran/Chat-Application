
import './App.css'
import Registration from './Pages/Registration'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Header from './Components/Header'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Chat from './Pages/Chat'



function App() {
  
  return (
    <>
     <ToastContainer />
      
      <Routes>
        <Route path='/Home' element={<Home/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Registration' element={<Registration/>}></Route>
        <Route path='/Chat' element={<Chat/>}></Route>
        <Route path='*' element={<h1>404 Not Found</h1>}></Route>
      </Routes> 
    </>
  )
}

export default App
