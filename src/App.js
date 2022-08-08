import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import AddReview from "./components/add-review"
import MoviesList  from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';

function App() {
  const [user, setUser] = useState(null)

  async function login(user = null){
    setUser(user)
  }

  async function logout(){
    setUser(null)
  }

  return (
    <div className="App">
       <Navbar bg="light" expand="lg" style={{ paddingLeft: '20px', alignItems: 'center' }}>
          <Navbar.Brand href="/peliculas">
            <h3>Peliculas</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='mr-auto'>
              <Nav.Link>
                {
                  user
                  ?
                  (<a onClick={logout}>Logout</a>)
                  :
                  (<Link to={"/login"}>Login</Link>)
                }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
       </Navbar>

       <Routes>
        <Route exact path="/" element={<MoviesList/>}></Route>
        <Route exact path="/peliculas" element={<MoviesList/>}></Route>
        <Route path="/peliculas/:id/resena" element={<AddReview user={user}/>}></Route>
        <Route path="/peliculas/:id" element={<Movie user={user} />}></Route>
        <Route path="/login" element={<Login login={login} />}></Route>  
       </Routes>
    </div>
  );
}

export default App;
