import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Home from './Components/Home';
import PizzaForm from "./Components/PizzaForm"
import { Route, Link, Switch } from "react-router-dom";
import styled from 'styled-components';
import './App.css'


const App = () => {

  const Wrapper=styled.section`
  text-align:center;
  background-color: #6B8E23	;
  background-size:cover;
  font-size: 1.75em;
  color:tomato;
  
  `;

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);


  return (
    <Wrapper>
          <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">Lambda Eats</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink>
              <Link className="links" to={'/'}>Home</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
               <Link className="links" to={'/pizza'}>Pizza</Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/pizza" component={PizzaForm} />
      </Switch>
    
    </Wrapper>
  );
};
export default App;

 {/* <h1>Lambda Eats</h1>
      <div><Link to={'/'}>Home</Link></div>
      <div> <Link to={'/pizza'}>Pizza</Link></div>
      <Route exact path="/" componant={App} />
      <Route exact path="/pizza" component={PizzaForm} /> */}