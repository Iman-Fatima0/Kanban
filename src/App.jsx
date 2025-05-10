import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Todopage from './Pages/Todopage';
import Loader from './Pages/Loader';
function App() {
  const [show, setShow] = useState(true);
  useEffect(() => {    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      {show ? <Loader className=".colorss" /> :  
        <Routes>
          <Route path="/" element={<Todopage />} />
          <Route path="/todos" element={<Todopage />} />
        </Routes>
      }
    </>
  );
}

export default App;
