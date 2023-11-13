import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './components/Create';
import Edit from './components/Edit';
import Show from './components/Show';
import Navbar from './components/Navbar';
import Pie from './components/Pie';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Login />} />
          <Route path='/home' element={ <Show />} />
          <Route path='/create' element={ <Create />} />
          <Route path='/edit/:id' element={ <Edit />} />
        </Routes>
      </BrowserRouter>
      <Pie />
    </div>
  );
}

export default App;
