import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoPage from './Pages/Todopage';
import Loader from './Pages/Loader';
import SignUpform from './Pages/SignUpform';
import HistoryPage from './Pages/HistoryPage';
import Loginform from './Pages/Loginform';
import Navbar from './Components/Navbar';

function App() {
  const [show, setShow] = useState(true);

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
      
          <Navbar />
          <Routes>
            <Route path="/" element={<Loginform />} />
            <Route path="/Todopage" element={<TodoPage />} />
            <Route path="/SignUp" element={<SignUpform />} />
            <Route path="/Loginform" element={<Loginform />} />
            <Route path="/History" element={<HistoryPage />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
