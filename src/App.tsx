import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import { MainContent } from './components/MainContent/MainContent'
import './App.css'
import { ProductPage } from './components/ProductPage/ProductPage'
import { TopSellers } from './components/TopSellers/TopSellers'
import { PopularBlogs } from './components/PopularBlogs/PopularBlogs'

function App() {

  return <Router>
    <div className="flex h-screen">
  
      <Sidebar />
  
  
        <div className="rounded w-full flex justify-center flex-wrap">
      <Routes>

        <Route path="/" element={<MainContent />} />

        <Route path="/product/:id" element={<ProductPage />} />
      
      </Routes>


      <div>
        <TopSellers></TopSellers>
        <PopularBlogs /> 
      </div>
    </div>
    </div>

  
  </Router>
}

export default App
