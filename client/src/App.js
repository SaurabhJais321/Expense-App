import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import PublicRoutes from './components/Routes/PublicRoutes';
import ProfilePage from './pages/ProfilePage';


function App() {
  return (
   <>
<Routes>
  <Route path="/" element={<ProtectedRoutes><HomePage/></ProtectedRoutes>}/>
  <Route path="/register" element={<PublicRoutes><Register/></PublicRoutes>}/>
  <Route path="/login" element={<PublicRoutes><Login/></PublicRoutes>}/>
  <Route path="/profile" element={<ProtectedRoutes><ProfilePage/></ProtectedRoutes>}/>
</Routes>
   </>
  );
}

export default App;
