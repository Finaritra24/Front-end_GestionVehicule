import React, { useState,useRef } from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
export default function ModifEcheance() {
    const navigate=useNavigate();
    //ajout
    //ajout-component
    const [dateecheance, setDateecheance] = useState('');
    //post ajout assurance
    // const navigate = useNavigate();
    const toast = useRef(null);
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Erreur de modification', life: 3000});
    }
    function handleSubmit(event) {
        event.preventDefault(); // empêche la soumission du formulaire
      
        fetch('http://localhost:8081/modifEcheance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dateecheance }),
          credentials: 'include'
        })
        .then(response => {
          if (response.ok) {
            // si la connexion a réussi, redirigez l'utilisateur vers une page de réussite
            navigate("/profilVehicule");
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
      
  //fin ajoutt
  return (
                <div>
                <Toast ref={toast} />
                <h1>Modifier Echeance</h1>
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
                            <Button label="Modifier" icon="pi pi-plus" className="w-10rem mx-auto"></Button>
                      </div>
                    </div>
                  </div>
                </form>
                  </div>
  )
}
