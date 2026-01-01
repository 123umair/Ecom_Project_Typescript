import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { MainContent } from "./components/MainContent/MainContent";
import { ProductPage } from "./components/ProductPage/ProductPage";
import { TopSellers } from "./components/TopSellers/TopSellers";
import { PopularBlogs } from "./components/PopularBlogs/PopularBlogs";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Section */}
        <div className="flex flex-col  overflow-y-auto p-4 md:p-6">

          {/* Routes */}
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>

          {/* Bottom Widgets */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <TopSellers />
            <PopularBlogs />
          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;
