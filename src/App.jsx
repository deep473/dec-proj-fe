import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Sign_up from "./pages/Sign_up";
import Sign_in from "./pages/Sign_in";
import Admin_home from "./pages/Admin_home";
import Customer_home from "./pages/Customer_home";
import Add_product from "./pages/Add_product";
import Show_products from "./pages/Show_products";

function App() {
  
  return (
    <>
      <Routes>
          <Route path = "/"  element = {<Welcome />} />
          <Route path = "/sign_up"  element = {<Sign_up />} />
          <Route path = "/sign_in"  element = {<Sign_in />} />
          <Route path = "/admin_home"  element = {<Admin_home />} />
          <Route path = "/customer_home"  element = {<Customer_home />} />

          <Route path = "/addProd"  element = {<Add_product
           />} />
          <Route path = "/viewAllProd"  element = {<Show_products />} />
      </Routes>
    </>
  )
}

export default App
