import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.17.0/dist/xlsx.full.min.js"></script>
        
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
  // const workbook = XLSX.utils.book_new();

  const generateExcel = () => {
    const workbook = XLSX.utils.book_new();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 50;
    sheet.getRow(1).border = {
      top: { style: "thick", color: { argb: "FFFF0000" } },
      left: { style: "thick", color: { argb: "000000FF" } },
      bottom: { style: "thick", color: { argb: "F08080" } },
      right: { style: "thick", color: { argb: "FF00FF00" } },
    };

    sheet.getRow(1).fill = {
      type: "pattern",
      pattern: "darkVertical",
      fgColor: { argb: "FFFF00" },
    };

    sheet.getRow(1).font = {
      name: "Comic Sans MS",
      family: 4,
      size: 16,
      bold: true,
    };
    sheet.columns = [
      {
        header: "Id",
        key: "id",
        width: 10,
      },
      { header: "Numero", key: "numero", width: 32 },
      {
        header: "Marque",
        key: "marque",
        width: 20,
      },
      {
        header: "Modele",
        key: "modele",
        width: 20,
      },
    ];
    vehicules?.vs?.map((v) => {
      sheet.addRow({
        id: v?.idVehicule,
        numero: v?.numero,
        marque: v?.idMarque,
        modele: v?.idModele,
      });
    })
    const worksheet=XLSX.utils.json_to_sheet(sheet);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Liste des véhicules");
    XLSX.writeFile(workbook, "liste_vehicules.xlsx");
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
                        <button onClick={generateExcel}>Générer Excel</button>
                    </div>
        </div>
  );
}
