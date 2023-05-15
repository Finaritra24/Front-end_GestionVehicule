import React, { useState, useEffect ,useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Link , useNavigate} from 'react-router-dom';

<script src="https://cdn.jsdelivr.net/npm/xlsx@0.17.0/dist/xlsx.full.min.js"></script>
        
export default function ListVehicule() {
  //listes
  const [vehicules,setVehicules]=useState([]);
  const navigate = useNavigate();
  //fin-listes
  const toast = useRef(null);
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'No Profil', life: 3000});
    }
  //list vehicule
  useEffect(() => {
    fetch('http://localhost:8081/listVehicule')
      .then(response => response.json())
      .then(data => setVehicules(data))
      .catch(error => console.error(error));
  }, []);
  
  function CheckAvailability({idv}) {
    const [dispo, setDispo] = useState('');
  
    useEffect(() => {
      fetch('http://localhost:8081/testDispoVehicule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idv }),
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          setDispo("Indisponible");
        } else {
          setDispo("Disponible");
        }
      })
      .catch(error => {
        setDispo("Erreur");
      });
    }, [idv]);
  
    return (
      <div>
        <p>{dispo}</p>
      </div>
    );
  }
  

  
  //Generer pdf
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text('Liste des véhicules', 20, 20);
  
    const tableData = vehicules.map(v => [v.idVehicule, v.numero, v.idMarque, v.idModele]);
  
    doc.autoTable({
      head: [['ID', 'Numéro', 'Marque', 'Modèle']],
      body: tableData,
      startY: 30,
    });
    doc.save('liste_vehicules.pdf');
  };
  //Generer excel
  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(vehicules);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Liste des véhicules");
    XLSX.writeFile(workbook, "liste_vehicules.xlsx");
  };
  //link to profil vehicule
  const handleOnClick = (id) => {
        fetch('http://localhost:8081/profilVehicule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
          credentials: 'include'
        })
        .then(response => {
          if (response.ok) {
            // si la connexion a réussi, redirigez l'utilisateur vers une page de réussite
            navigate('/profilVehicule')
          } else {
            // si la connexion a échoué, affichez un message d'erreur
            showError()
          }
        })
        .catch(error => {
          console.error(error);
        });
    };
  

  
  
  
  return (
        <div>
                    <div className="card">
                        <DataTable value={vehicules} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                        <Column sortable  field="idVehicule" header="idVehicule" body={(rowData) => {
                          return <Link onClick={() => handleOnClick(rowData.idVehicule)}>{rowData.idVehicule}</Link>;
                        }} style={{ width: '25%' }}></Column>
                            <Column field="numero" header="numero" sortable   style={{ width: '25%' }}></Column>
                            <Column field="idMarque" header="idMarque" sortable   style={{ width: '25%' }}></Column>
                            <Column field="idModele" header="idModele" sortable   style={{ width: '25%' }}></Column>
                            <Column sortable field="Disponibilité" header="Disponibilité" body={(rowData) => <CheckAvailability idv={rowData.idVehicule} />} style={{ width: '25%' }}></Column>


                        </DataTable>
                        <button onClick={generatePdf}>Générer PDF</button>
                        <button onClick={generateExcel}>Générer excel</button>
                    </div>
        </div>
  );
}
