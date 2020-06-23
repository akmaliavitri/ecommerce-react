import React from 'react';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Product from './components/Product'
import AddProduct from './components/AddProduct'
import UpdateProduct from './components/UpdateProduct'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import DetailProduct from './components/DetailProduct'
import MyChart from './components/MyChart'
// import AddToChart from './components/AddToChart'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Navbar />
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/product' component={Product} />
        <Route exact path='/product/add' component={AddProduct} />
        <Route exact path='/product/update' component={UpdateProduct} />
        <Route exact path='/detailProduct' component={DetailProduct} />
        <Route exact path='/myChart' component={MyChart} />
        {/* <Route exact path='/chart/add/:id' component={AddToChart} /> */}
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
