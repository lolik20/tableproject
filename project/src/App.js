import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Add from "./Add";
import { Bills } from "./Bills";
import Brands from "./Brands";
import { DealTableData } from "./DealTableData";
import { Feedback } from "./Feedback";
import "./Header.css";
import { Invoices } from "./Invoices";
import { Orderssupplier, OrderSupplier } from "./OrderSupplier";
import Partner from "./Partner";
import { TableData } from "./TableData";
import Trackers from "./Trackers";

function App() {
  return (
      <Router>
        <nav>
          <Link to="/">Сделки</Link>
          <Link to="/partner">Поставщики</Link>
          <Link to="/bills">Заказы клиентов</Link>

          <Link to="/supplier">Заказы поставщиков</Link>
          <Link to="/trackers">Трекеры</Link>
          <Link to="/invoices">Инвойс</Link>

          </nav>      

          <Routes>
          <Route path="/brands/:id" element={<Brands/>}></Route>
            <Route path="/add" element={<Add/>}></Route>
            <Route path="/" element={<TableData/>}></Route>
            <Route path="/partner" element={<Partner/>}></Route>
            <Route path="/feedback/:id" element={<Feedback/>}></Route>

            <Route path="/bills" element={<Bills/>}></Route>
            <Route path="/deals/:id" element={<DealTableData/>}></Route>
            <Route path="/invoices" element={<Invoices></Invoices>}></Route>
            <Route path="/trackers" element={<Trackers></Trackers>}></Route>
            <Route path="/supplier" element={<OrderSupplier></OrderSupplier>}></Route>


          </Routes>
          </Router>
  );
}

export default App;
