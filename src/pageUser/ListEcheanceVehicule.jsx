import React, { useState, useEffect ,useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Link , useNavigate} from 'react-router-dom';

<script src="https://cdn.jsdelivr.net/npm/xlsx@0.17.0/dist/xlsx.full.min.js"></script>
        
export default function ListEcheanceVehicule() {
  //listes
  const [assurances,setAssurances]=useState([]);
  //fin-listes
  const navigate = useNavigate();
  //list assurance
  useEffect(() => {
    fetch('http://localhost:8081/listProfilTypeAssurance', { credentials: 'include' })
      .then(response => response.json())
      .then(data => setAssurances(data))
      .catch(error => console.error(error));
  }, []);
  //Generer pdf
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text('Liste des assurances', 20, 20);
  
    const tableData = assurances.map(v => [v.idEcheanceVehicule, v.dateEcheance, v.idTypeEcheance, v.idVehicule]);
  
    doc.autoTable({
      head: [['idEcheanceVehicule', 'dateEcheance', 'idTypeEcheance', 'idVehicule']],
      body: tableData,
      startY: 30,
    });
    doc.save('liste_assurances.pdf');
  };
  //Generer excel
  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(assurances);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Liste des véhicules");
    XLSX.writeFile(workbook, "liste_vehicules.xlsx");
  };
  
  const toast = useRef(null);
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'No Profil', life: 3000});
    }
  const handleOnClick = (id) => {
    fetch('http://localhost:8081/cookiModifEcheance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        // si la connexion a réussi, redirigez l'utilisateur vers une page de réussite
        navigate('/modifEcheance')
      } else {
        // si la connexion a échoué, affichez un message d'erreur
        showError()
      }
    })
    .catch(error => {
      console.error(error);
    });
    }
  
  return (
        <div>
                    <div className="card">
                        <DataTable value={assurances} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="idEcheanceVehicule" header="idEcheanceVehicule" style={{ width: '25%' }}></Column>
                            <Column field="dateEcheance" header="dateEcheance" style={{ width: '25%' }}></Column>
                            <Column field="idTypeEcheance" header="idTypeEcheance" style={{ width: '25%' }}></Column>
                            <Column field="idVehicule" header="idVehicule" style={{ width: '25%' }}></Column>
                            <Column  header="action" body={(rowData) => {
                            return <Link onClick={() => handleOnClick(rowData.idEcheanceVehicule)}>Update</Link>;
                            }} style={{ width: '25%' }}></Column>
                        </DataTable>
                        <button onClick={generatePdf}>Générer PDF</button>
                        <button onClick={generateExcel}>Générer excel</button>
                    </div>
        </div>
  );
}
