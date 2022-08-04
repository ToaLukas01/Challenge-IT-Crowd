import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/Home/Home";
import ProductDetail from './components/ProductDetail/ProductDetail';
import CreateProduct from "./components/CreateProduct/CreateProduct";

function App() {
  return ( <BrowserRouter>
    <div className="App">
      <Switch> 
        <Route exact path = '/' component={Home}/>
        <Route path = '/home' component={Home}/>
        <Route path = "/detail/:id" component={ProductDetail}/>
        <Route path= '/products' component={CreateProduct}/>
      </Switch>
    </div>
  </BrowserRouter> );
}

export default App;
