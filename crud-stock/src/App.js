import './App.css';
import { HashRouter as Router, Route, Routes, HashRouter, Navigate } from 'react-router-dom';
import Create from './components/Create';
import Edit from './components/Edit';
import Show from './components/Show';
import Navbar from './components/Navbar';
import Pie from './components/Pie';
import Login from './components/Login';
import React, { useEffect, useState } from 'react';
import { auth } from './firebaseConfig/firebase';

/* const PrivateRoute = ({ element }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return authenticated ? <React.Fragment>{element}</React.Fragment> : <Navigate to="/" />;
}; */

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          {/* <Route path='/' element={ <Login />} /> */}
          <Route path="/" element={<Show />} />
          <Route path="/create" element={<Create />}/> 
          <Route path="/edit/:id" element={<Edit />}/> 
        </Routes>
      </Router>
      <Pie />
    </div>
  );
}

export default App;
