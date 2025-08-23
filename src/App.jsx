import { useState } from 'react'
import Login from './components/Login'
import Nav from './components/Navbar'
import Register from './components/Register'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>

    </Router>
    </div>
  )
}

export default App;
