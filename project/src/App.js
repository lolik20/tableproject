import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Add from "./Add";
import AddExcel from "./AddExcel";
import { DealTableData } from "./DealTableData";
import "./Header.css";
import { Invoices } from "./Invoices";
import Partner from "./Partner";
import Replace from "./Replace";
import { TableData } from "./TableData";


function App() {
  return (
      <Router>
        <nav>
          <Link to="/">Сделки</Link>
          <Link to="/excel">Заказ</Link>
          <Link to="/replace">Замена товара</Link>
          <Link to="/partner">Поставщики</Link>
          <Link to="/invoices">Счета</Link>
          </nav>      

          <Routes>
            <Route path="/replace" element={<Replace></Replace>}></Route>
          <Route path="/excel" element={<AddExcel/>}></Route>
            <Route path="/add" element={<Add/>}></Route>

            <Route path="/" element={<TableData/>}></Route>
            <Route path="/partner" element={<Partner/>}></Route>

            <Route path="/deals/:id" element={<DealTableData/>}></Route>
            <Route path="/invoices" element={<Invoices></Invoices>}></Route>

          </Routes>
          </Router>
  );
}

export default App;
