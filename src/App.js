import React from 'react'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Fashionstore from './pages/Fashionstore'
 import ProductDetails from './pages/Productdetails';
 import Urbanstore from './pages/Urbanstore'
import AboutUs from './components/AboutUs';
import StorePage from './components/StorePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
function App() {
  return (
    <>
       <Router>
        <ScrollToTop />
     <Routes>
     <Route path='/' element={<Home/>}> </Route>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/fashion-forward' element={<Fashionstore/>}/>
         <Route path='/urban-store' element={<Urbanstore/>}/>
         <Route path='/store-details' element={<StorePage/>}/>
         <Route path='/admin-login' element={<AdminLogin/>}/>
         <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
     </Routes>
        </Router>
    
    </>
  )
}

export default App