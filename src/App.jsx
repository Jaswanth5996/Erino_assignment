import { useState } from 'react'
import Login from './components/Login'
import Nav from './components/Navbar'
import Register from './components/Register'
import Leads from './components/Leads'
import Protect from './components/ProtectedRoute.jsx'
import { AuthProvider } from "./AuthContext.jsx";
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
    <AuthProvider>
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/leads' element={<Protect><Leads /></Protect>}></Route>
      </Routes>
    </Router>
    </AuthProvider>
    </div>
  )
}

export default App;
