import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Todopage from './Pages/Todopage';


function App() {
  const [count, setCount] = useState(0);
  const [show , setShow] = useState(false)

  setTimeout(() => {
    
  }, 4000);

  return (
    <>
  {
    show ? <Loader/> :    <Routes>
    <Route path="/" exact element={<Todopage />} />
    <Route path="/todos" element={<Todopage />} />
  </Routes>
  }

   
    </>
  );
}

export default App;
