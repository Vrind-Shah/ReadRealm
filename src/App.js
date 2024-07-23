import { Route, Routes } from "react-router-dom";

//Components
import MyNavbar from "./components/Navbar.components.jsx";
import HeroSection from "./components/Hero.components.jsx";
import Footer from "./components/Footer.components.jsx";

//Pages
import RegisterPage from "./pages/Register.pages.jsx";
import LoginPage from "./pages/Login.pages.jsx";
import ListingPage from "./pages/List.pages.jsx";
import HomePage from "./pages/Home.page.jsx";
import BookDetailsPage from "./pages/Details.pages.jsx";
import OrdersPage from "./pages/Orders.pages.jsx";
import OrderDetails from "./pages/OrderDetail.page.jsx";

//CSS
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";


function App() {

  return (
    <div>
      <MyNavbar />
      
    <Routes>
      <Route path="/" element = {<HomePage />} />
      <Route path="/register" element = {<RegisterPage />} />
      <Route path="/login" element = {<LoginPage />} />
      <Route path="/book/list" element = {<ListingPage />} />
      <Route path="/books/view/:bookID" element = {<BookDetailsPage />} />
      <Route path="/books/orders" element = {<OrdersPage />} />
      <Route path="/books/order/:bookID" element = {<OrderDetails />} />
    </Routes>
    <Footer />
    </div>
  )
}

export default App;
