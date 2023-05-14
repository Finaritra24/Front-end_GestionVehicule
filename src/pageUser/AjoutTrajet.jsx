import React, { useState, useEffect,useRef } from 'react';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
// import { useNavigate } from 'react-router-dom';
export default function AjoutTrajet() {
    //ajout
    //ajout-component
    const[selectedModele,setSelectedModele]=useState('');
    const[selectedMarque,setSelectedMarque]=useState('');
    const[selectedType,setSelectedType]=useState('');
    const [numero, setNumero] = useState('');
    //post ajout vehicule
    // const navigate = useNavigate();
    const toast = useRef(null);
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Veuillez remplir le formulaire', life: 3000});
    }
    const showSuccess = () => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'Ajout effectué' });
    }
    function handleSubmit(event) {
        event.preventDefault(); // empêche la soumission du formulaire
      
        fetch('http://localhost:8081/ajoutVehicule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ numero, selectedMarque,selectedModele,selectedType }),
          credentials: 'include'
        })
        .then(response => {
          if (response.ok) {
            // si la connexion a réussi, redirigez l'utilisateur vers une page de réussite
            showSuccess()
          } else {
            // si la connexion a échoué, affichez un message d'erreur
            showError()
          }
        })
        .catch(error => {
          console.error(error);
        });
    };
    //fin post ajout vehicule


    //ajout-dropdown
      //modele
      const[modeles,setModeles]=useState([]);
      useEffect(() => {
        fetch('http://localhost:8081/listModele')
          .then(response => response.json())
          .then(data => setModeles(data))
          .catch(error => console.error(error));
      }, []);
      const optsModeles = modeles.map((modele) => ({
        value: modele.idModele,
        label: modele.nom
      }));
      //marque
      const[marques,setMarques]=useState([]);
      useEffect(() => {
        fetch('http://localhost:8081/listMarque')
          .then(response => response.json())
          .then(data => setMarques(data))
          .catch(error => console.error(error));
      }, []);
      const optsMarques = marques.map((marque) => ({
        value: marque.idMarque,
        label: marque.nom
      }));
      //type
      const[types,setTypes]=useState([]);
      useEffect(() => {
        fetch('http://localhost:8081/listType')
          .then(response => response.json())
          .then(data => setTypes(data))
          .catch(error => console.error(error));
      }, []);
      const optsTypes = types.map((type) => ({
        value: type.idType,
        label: type.nom
      }));
  //fin ajoutt
  return (
                <div>
                <Toast ref={toast} />
                
            <form onSubmit={handleSubmit}>
                  <div className="flex flex-column md:flex-row">
                    <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                      <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                          <label htmlFor="username" className="w-6rem">
                              Numero
                          </label>
                          <InputText value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Enter a numero"/>
                      </div>
                      <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="modele" className="w-6rem">
                            Modele
                        </label>
                        <Dropdown value={selectedModele} onChange={(e) => setSelectedModele(e.value)} options={optsModeles} optionLabel="label" placeholder="Select a modele" className="w-full md:w-14rem" />
                      </div>
                    </div>
                    <div className="w-full md:w-2">
                        <Divider layout="vertical" className="hidden md:flex">
                            {/* <b>OR</b> */}
                        </Divider>
                        <Divider layout="horizontal" className="flex md:hidden" align="center">
                            {/* <b>OR</b> */}
                        </Divider>
                      
                    </div>
                    <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                      <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="marque" className="w-6rem">
                            Marque
                        </label>
                        <Dropdown value={selectedMarque} onChange={(e) => setSelectedMarque(e.value)} options={optsMarques} optionLabel="label" placeholder="Select a marque" className="w-full md:w-14rem" />
                      </div>
                      <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="type" className="w-6rem">
                            Type
                        </label>
                        <Dropdown value={selectedType} onChange={(e) => setSelectedType(e.value)} options={optsTypes} optionLabel="label" placeholder="Select a type" className="w-full md:w-14rem" />
                      </div>
                    </div>
                  </div>
                  <Button label="Ajouter" icon="pi pi-plus" className="w-10rem mx-auto"></Button>
                
                </form>
                  </div>
  )
}
