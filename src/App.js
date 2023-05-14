import './App.css';
import LoginAdmin from './pageAdmin/LoginAdmin'
import LoginUser from './pageUser/LoginUser'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Vehicule from './pageAdmin/Vehicule';
import Trajet from './pageUser/Trajet';
function App() {
  const pi="monlien";
  return (
    <div className="App">
      <Router>
          <Routes>
            {/* admin */}
              <Route exact path="/admin" element={<LoginAdmin/>} />
              <Route exact path="/listVehicule" element={<Vehicule/>} component={pi} />
            {/* user */}
            <Route exact path="/user" element={<LoginUser/>} />
            <Route exact path="/trajet" element={<Trajet/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
