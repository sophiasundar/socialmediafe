import { Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './Components/pages/Register';
import Login from './Components/pages/Login';
import Profile from './Components/pages/Profile';
import Home from './Components/pages/Home';
import { useSelector } from 'react-redux';
import ProtectedRoute from './Components/protectedRoute/protectedRoute';
import ExploreUsers from './Components/pages/ExploreUser';



const App = () =>{
  
  const {theme} = useSelector((state)=>state.theme);
  
  


  return (
    <div data-theme={theme} className="w-full min-h-[100vh]">
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/' element={<Login />}></Route>
      

          
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
    
    <Route path='/explore-people' element={
       <ProtectedRoute>
        <ExploreUsers />
        </ProtectedRoute>
          }></Route>


      </Routes>

      
    </div>
  );
}

export default App;
