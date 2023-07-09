import React, { useState, useEffect,useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
// import { useNavigate } from 'react-router-dom';
export default function AjoutAssurance() {
    //ajout
    //ajout-component
    const[selectedType,setSelectedType]=useState('');
    const [dateecheance, setDateecheance] = useState('');
    //post ajout assurance
    // const navigate = useNavigate();
    const toast = useRef(null);
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Echeance vehicule', life: 3000});
    }
    const showSuccess = () => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'Ajout effectué' });
    }
    function handleSubmit(event) {
        event.preventDefault(); // empêche la soumission du formulaire
      
        fetch('http://localhost:8081/ajout-EcheanceVehicule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dateecheance,idtypeecheance:selectedType }),
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
    //fin post ajout assurance


    //ajout-dropdown
      
      //type
      const[types,setTypes]=useState([]);
      useEffect(() => {
        fetch('http://localhost:8081/listTypeEcheance')
          .then(response => response.json())
          .then(data => setTypes(data))
          .catch(error => console.error(error));
      }, []);
      const optsTypes = types.map((type) => ({
        value: type.idTypeEcheance,
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
                              Date et heure echeance :
                          </label>
                          <Calendar id="calendar-24h" value={dateecheance} onChange={(e) => setDateecheance(e.value)} showTime hourFormat="24" placeholder='date et heure echeance' />
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
                            Type Echeance
                        </label>
                        <Dropdown value={selectedType} onChange={(e) => setSelectedType(e.value)} options={optsTypes} optionLabel="label" placeholder="Select a marque" className="w-full md:w-14rem" />
                      </div>
                    </div>
                  </div>
                  <Button label="Ajouter" icon="pi pi-plus" className="w-10rem mx-auto"></Button>
                
                </form>
                  </div>
  )
}
