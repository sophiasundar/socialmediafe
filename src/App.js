import { Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Register from './Components/pages/Register';
import Login from './Components/pages/Login';
import PasswordReset from './Components/pages/PasswordReset';
import Profile from './Components/pages/Profile';
import Home from './Components/pages/Home';
import { useSelector } from 'react-redux';



 function Layout(){
  // 
     const  { user }  = useSelector(state=> state.user);
     
     const location = useLocation()
    //  console.log(user);
     return user?.token? (
      <Outlet/>
     ):(
      <Navigate to='/login' state={{from: location }} replace/>
     )
 }

function App() {
  return (
    <div className="w-full min-h-[100vh]">
      <Routes>
      <Route element={<Layout/>}>

    <Route path='/' element={<Home/>}></Route>
    <Route path='/profile/:id?' element={<Profile/>}></Route>

    </Route>

        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/reset-password' element={<PasswordReset/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
