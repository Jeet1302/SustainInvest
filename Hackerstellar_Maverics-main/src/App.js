import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';

import { Login } from './components/Login';
import { Signup } from './components/Signup';

function App() {
  return (
    <div  >
   
        <Router>
          <Navbar />
          {/* <Alert message="This is amazing"/> */}
          <div className=''>
            <Routes>
              <Route exact path="/" element={<Home />} />
              
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              
              {/* Admin Routes */}
           
            </Routes>
          </div>
        </Router>
   
    </div>
  );
}

export default App;