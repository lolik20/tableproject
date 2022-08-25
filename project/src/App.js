import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Add from "./Add";
import Brands from "./Brands";
import { DealTableData } from "./DealTableData";
import "./Header.css";
import { Invoices } from "./Invoices";
import Partner from "./Partner";
import { TableData } from "./TableData";
import Trackers from "./Trackers";

function App() {
  return (
      <Router>
        <nav>
          <Link to="/">Сделки</Link>
          <Link to="/partner">Поставщики</Link>
          <Link to="/invoices">Счета</Link>
          <Link to="/trackers">Трекеры</Link>

          </nav>      

          <Routes>
          <Route path="/brands/:id" element={<Brands/>}></Route>
            <Route path="/add" element={<Add/>}></Route>
            <Route path="/" element={<TableData/>}></Route>
            <Route path="/partner" element={<Partner/>}></Route>

            <Route path="/deals/:id" element={<DealTableData/>}></Route>
            <Route path="/invoices" element={<Invoices></Invoices>}></Route>
            <Route path="/trackers" element={<Trackers></Trackers>}></Route>

          </Routes>
          </Router>
  );
}

export default App;
