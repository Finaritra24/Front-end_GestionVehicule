import './App.css';
import LoginAdmin from './pageAdmin/LoginAdmin'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import ListVehicule from './pageAdmin/ListVehicule';
import Vehicule from './pageAdmin/Vehicule';
function App() {
  const pi="monlien";
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route exact path="/" element={<LoginAdmin/>} />
              <Route exact path="/listVehicule" element={<Vehicule/>} component={pi} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
