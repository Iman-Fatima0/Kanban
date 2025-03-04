import { useState, useEffect,useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TodoPage from './Pages/Todopage';
import Loader from './Pages/Loader';
import SignUpform from './Pages/SignUpform';
import HistoryPage from './Pages/HistoryPage';
import Loginform from './Pages/Loginform';
import Navbar from './Components/Navbar';
import { DataContext } from './Context/UserContext';

function App() {
  const [show, setShow] = useState(true);
  const {user}=useContext(DataContext);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 4000);
    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      {show ? (
        <Loader />
      ) : (
        <>
      
          <Navbar  />
          <Routes>
            <Route path="/" element={user? <Navigate to='/Todopage'/> : <Loginform />} />
            <Route path="/Todopage" element={user ? <TodoPage/>:<Navigate to='/loginform'/>} />
            <Route path="/SignUp" element={user ? <Navigate to='/Todopage'/>:<SignUpform />} />
            <Route path="/Loginform" element={user ? <Navigate to='/Todopage'/>:<Loginform />} />
            <Route path="/History" element={user ? <HistoryPage/>:<Navigate to='/loginform'/>} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
