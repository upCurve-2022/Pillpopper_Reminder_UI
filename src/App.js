import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MedicinesList from "./components/MedicinesList";
import CreateMedicine from "./components/CreateMedicine";
import Notification from "./components/Notification";

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <Router>
          <Routes>
            <Route exact path="/" element={<MedicinesList />} />
            <Route path="/medicines" element={<MedicinesList />}></Route>
            <Route path="/addmedicine" element={<CreateMedicine />}></Route>
            <Route path="/update/:id" element={<CreateMedicine />}></Route>
          </Routes>
        </Router>
        <Notification/>
      </div>
    </div>
  );
}

export default App;
