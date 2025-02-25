import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Todopage from './Pages/Todopage';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
  

      <Routes>
        <Route path="/" exact element={<Todopage />} />
        <Route path="/todos" element={<Todopage />} />
      </Routes>
    </>
  );
}

export default App;
