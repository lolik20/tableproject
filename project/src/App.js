import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { DealTableData } from "./DealTableData";
import "./Header.css";
import { TableData } from "./TableData";


function App() {
  return (
      <Router>
        <nav>
          <Routes>
            
            <Route path="/" element={<TableData/>}></Route>
            <Route path="/deals/:id" element={<DealTableData/>}></Route>

          </Routes>
        </nav>      
          </Router>
  );
}

export default App;
