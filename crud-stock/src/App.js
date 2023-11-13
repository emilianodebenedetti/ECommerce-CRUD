import './App.css';
import { HashRouter as Router, Route, Routes, HashRouter } from 'react-router-dom';
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
      <Router>
        <Routes>
          <Route path='/' element={ <Login />} />
          <Route path='/home' element={ <Show />} />
          <Route path='/create' element={ <Create />} />
          <Route path='/edit/:id' element={ <Edit />} />
        </Routes>
      </Router>
      <Pie />
    </div>
  );
}

export default App;
