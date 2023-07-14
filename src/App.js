import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { CartProvider } from "./provider/CartProvider";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <main className="min-h-screen flex flex-col">
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/carrito" exact element={<Cart />} />
            <Route path="producto/:productId" element={<ProductDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;