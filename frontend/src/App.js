import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from '../src/components/Home/Home.jsx'
import AddNewMember from '../src/components/AddNewMember/AddNewMember.jsx';
import Navbar from '../src/components/Navbar/Navbar.jsx';
import AboutUs from '../src/components/AboutUs/AboutUs.jsx';
import PaymentSuccess from './components/PaymentSuccess/PaymentSucess.jsx';
import PaymentFail from './components/PaymentFail/PaymentFail.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add-new-member' element={<AddNewMember />}/>
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/success' element={<PaymentSuccess />} />
        <Route path='/fail' element={<PaymentFail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
