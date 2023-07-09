import './App.css';
import LoginAdmin from './pageAdmin/LoginAdmin'
import LoginUser from './pageUser/LoginUser'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Vehicule from './pageAdmin/Vehicule';
import Trajet from './pageUser/Trajet';
import VehiculeUser from './pageUser/VehiculeUser';
import ProfilVehicule from './pageUser/ProfilVehicule';
import ModifEcheance from './pageUser/ModifEcheance';
import EcheanceVehicule from './pageUser/EcheanceVehicule';
import ProfilTypeEcheance from './pageUser/ProfilTypeEcheance';
import MyMarque from './test/MyMarque';
import MyTest from './test/MyTest';
function App() {
  const pi="monlien";
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route exact path="/mytest" element={<MyTest/>} />
              <Route exact path="/mymarque" element={<MyMarque/>} />
            {/* admin */}
              <Route exact path="/admin" element={<LoginAdmin/>} />
              <Route exact path="/listVehicule" element={<Vehicule/>} component={pi} />
            {/* user */}
            <Route exact path="/user" element={<LoginUser/>} />
            <Route exact path="/trajet" element={<Trajet/>} />
            <Route exact path="/profilVehicule" element={<ProfilVehicule/>} />
            <Route exact path="/vehiculeUser" element={<VehiculeUser/>} />
            <Route exact path="/modifEcheance" element={<ModifEcheance/>} />
            <Route exact path="/profilTypeEcheance" element={<ProfilTypeEcheance/>} />
            <Route exact path="/echeance" element={<EcheanceVehicule/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
