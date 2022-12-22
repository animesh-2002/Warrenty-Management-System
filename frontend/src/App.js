import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useGlobal, useEffect, lazy} from 'reactn';
import Web3 from "web3"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Buyers from './routes/Buyers';
import DestroyWarrantyForm from './routes/DestroyWarrantyCardForm';
import ClaimWarrantyForm from './routes/ClaimWarrantyForm';
import Home from './routes/Home';
import WarrantyCards from './routes/WarrantyCard';
import NavbarComponent from './Components/Navigation/Navbar';
import Footer from './Components/Footer/Footer';

function App() {
  const [web3, setWeb3] = useGlobal('web3');
  const [account, setAccount] = useGlobal('account');
  const loadWeb3 = () => {
    const h = new Web3(Web3.givenProvider||"https://polygon-mumbai.g.alchemy.com/v2/d-yzortyRcKbZBz9UWR5q3uLMk39oz6K");
        setWeb3(h);
    };
    useEffect(() => {
        loadWeb3();
    }, [account]);

    console.log(web3);
    
  return (
    <div className="App">
      <NavbarComponent/>
      <Router>
        
        <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/claimWarranty" exact element={<ClaimWarrantyForm />} />
      <Route path="/destroyWarranty" element={<DestroyWarrantyForm />} />
      <Route path="/registerBuyer" element={<Buyers />} />
      <Route path="/registerWarrantyCard" element={<WarrantyCards/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
