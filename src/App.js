import React, {useContext} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard"
import AdminLayout from './layout/AdminLayout';
import LoginForm from './pages/login/LoginForm';
import Trade from "./pages/trade/Trade";
import Profile from './pages/profile/Profile';
import SignupForm from './pages/signup/SignupForm';
import Home from "./pages/home/Home";
import { AuthContext } from "./context/AuthContext";
import Analysis from './pages/analysis/Analysis';





function App(){
      const {currentUser} = useContext(AuthContext);

     const RequireAuth = ({children})=>{
         return currentUser ? (children) : <Navigate to="/login" />
      }

      
    return (
       <BrowserRouter>
          
        <Routes>
         
         <Route path="/" element={<RequireAuth><AdminLayout/></RequireAuth>}>
           <Route index element={<RequireAuth><Dashboard/></RequireAuth>}/>
           <Route path="dashboard" element={<RequireAuth><Dashboard/></RequireAuth>} />
           <Route path="trade" element={<RequireAuth><Trade /></RequireAuth>} />
           <Route path="profile" element={<RequireAuth><Profile/></RequireAuth>}/>
           <Route path="analysis" element={<RequireAuth><Analysis/></RequireAuth>}/>
         </Route>
         <Route path="/login" element={<LoginForm />} /> 
         <Route path="/signup" element={<SignupForm/>}/>
       </Routes>
       
       </BrowserRouter>
     
        );
}

export default App;


