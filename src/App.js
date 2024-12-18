import { Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './Components/pages/Register';
import Login from './Components/pages/Login';
import PasswordReset from './Components/pages/PasswordReset';
import Profile from './Components/pages/Profile';
import Home from './Components/pages/Home';
import { useSelector } from 'react-redux';
import ProtectedRoute from './Components/protectedRoute/protectedRoute';

const App = () =>{
  const {theme} = useSelector((state)=>state.theme);

  return (
    <div data-theme={theme} className="w-full min-h-[100vh]">
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/' element={<Login />}></Route>
        <Route path='/reset-password' element={<PasswordReset/>}></Route>

          
        <Route path='/home' element={
            <ProtectedRoute>
              <Home  />
            </ProtectedRoute>
          }></Route>
       <Route path='/profile/:id?' element={
        <ProtectedRoute>
        <Profile/>
        </ProtectedRoute>
          }></Route>
    
      </Routes>
    </div>
  );
}

export default App;
