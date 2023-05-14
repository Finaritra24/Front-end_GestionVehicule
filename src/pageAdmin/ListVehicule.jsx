import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
        
export default function ListVehicule() {
  //listes
  const [vehicules,setVehicules]=useState([]);
  //fin-listes
  //list vehicule
  useEffect(() => {
    fetch('http://localhost:8081/listVehicule')
      .then(response => response.json())
      .then(data => setVehicules(data))
      .catch(error => console.error(error));
  }, []);
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
  
  

  return (
        <div>
                    <div className="card">
                        <DataTable value={vehicules} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="idVehicule" header="idVehicule" style={{ width: '25%' }}></Column>
                            <Column field="numero" header="numero" style={{ width: '25%' }}></Column>
                            <Column field="idMarque" header="idMarque" style={{ width: '25%' }}></Column>
                            <Column field="idModele" header="idModele" style={{ width: '25%' }}></Column>
                        </DataTable>
                        <button onClick={generatePdf}>Générer PDF</button>
                    </div>
        </div>
  );
}
