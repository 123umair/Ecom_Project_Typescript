import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import { MainContent } from './components/MainContent/MainContent'
import './App.css'
import { ProductPage } from './components/ProductPage/ProductPage'

function App() {

  return <Router>
    <div className="flex h-screen text-left">
  
      <Sidebar />
  
  
        <div className="rounded w-full flex justify-between flex-wrap">
      <Routes>

        <Route path="/" element={<MainContent />} />

        <Route path="/product/:id" element={<ProductPage />} />
      
      </Routes>
    </div>
    </div>

  
  </Router>
}

export default App
