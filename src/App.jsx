import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Todopage from './Pages/Todopage';
import Loader from './Pages/Loader';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import HistoryPage from './Pages/HistoryPage';

function App() {
  const [show, setShow] = useState(true);
  useEffect(() => {    const timer = setTimeout(() => {
      setShow(false);
    }, 4000);
    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      {show ? <Loader  /> :  
        <Routes>
          <Route path="/" element={<Todopage />} />
          <Route path="/todos" element={<Todopage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/History" element={<HistoryPage/>}/>
        </Routes>
      }
    </>
  );
}

export default App;
