import React, { useState, useEffect,useRef } from 'react';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
// import { useNavigate } from 'react-router-dom';
export default function AjoutTrajet() {
    //ajout
    //ajout-component
    const [dhdeb, setDhdeb] = useState(null);
    const[selectedLieuDeb,setSelectedLieuDeb]=useState('');
    const [kmdeb, setKmdeb] = useState(1.00);
    const [dhfin, setDhfin] = useState(null);
    const[selectedLieuFin,setSelectedLieuFin]=useState('');
    const [kmfin, setKmfin] = useState(1.00);
    const [qteCarb, setQteCarb] = useState(1.00);
    const [montantCar, setMontantCar] = useState(1.00);
    const[selectedVehicule,setSelectedVehicule]=useState('');
    const[selectedChauffeur,setSelectedChauffeur]=useState('');
    const [vitesse, setVitesse] = useState(1.00);
    const[motif,setMotif]=useState('');

    //post ajout trajet
    // const navigate = useNavigate();
    const toast = useRef(null);
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Echec ajout', life: 3000});
    }
    const showErrorKm = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Le kilométrage n’est pas cohérent', life: 3000});
    }
    const showErrorVitesse = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'La vitesse moyenne est supérieure à 72km/h', life: 3000});
    }
    const showSuccess = () => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'Ajout effectué' });
    }
    
    function handleSubmit(event) {
        event.preventDefault(); // empêche la soumission du formulaire
        console.log(dhdeb, selectedLieuDeb, kmdeb, dhfin, selectedLieuFin, kmfin, qteCarb, montantCar, selectedVehicule, selectedChauffeur, vitesse, motif);
        const chiffre1 = parseFloat(kmdeb);
        const chiffre2 = parseFloat(kmfin);
        const vit=parseFloat(vitesse);
          if (chiffre2 < chiffre1) {
            showErrorKm()
          } 
          if(vit>72){
            showErrorVitesse()
          }
          else {
            fetch('http://localhost:8081/ajoutTrajet', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ dhdeb, selectedLieuDeb,kmdeb,dhfin,selectedLieuFin,kmfin ,qteCarb,montantCar,selectedVehicule,selectedChauffeur,vitesse,motif}),
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
          }
        
    };
    //fin post ajout trajet


    //ajout-dropdown
      //lieu
      const[lieux,setLieux]=useState([]);
      useEffect(() => {
        fetch('http://localhost:8081/listLieu')
          .then(response => response.json())
          .then(data => setLieux(data))
          .catch(error => console.error(error));
      }, []);
      const optsLieux = lieux.map((lieu) => ({
        value: lieu.idLieu,
        label: lieu.nom
      }));
      //chauffeur
      const[chauffeurs,setChauffeurs]=useState([]);
      useEffect(() => {
        fetch('http://localhost:8081/listChauffeur')
          .then(response => response.json())
          .then(data => setChauffeurs(data))
          .catch(error => console.error(error));
      }, []);
      const optsChauffeurs = chauffeurs.map((chauffeur) => ({
        value: chauffeur.idChauffeur,
        label: chauffeur.nom+' '+chauffeur.prenom
      }));
      const selectChauffeur = (option) => {
        if (option) {
          return (
            <div className="flex align-items-center">
              <div>{option.label}</div>
            </div>
          );
        }
      
        return <span>Select a chauffeur</span>;
      };
    const chauffeurOption = (option) => {
          return (
              <div className="flex align-items-center">
                  <div>{option.label}</div>
              </div>
          );
      };
      //vehicule
      const[vehicules,setVehicules]=useState([]);
      useEffect(() => {
        fetch('http://localhost:8081/listVehicule')
          .then(response => response.json())
          .then(data => setVehicules(data))
          .catch(error => console.error(error));
      }, []);
      const optsVehicules = vehicules.map((option) => ({
        value: option.idVehicule,
        label: option.numero
      }));
      
      const selectVehicule = (option) => {
        if (option) {
          return (
            <div className="flex align-items-center">
              <div>{option.label}</div>
            </div>
          );
        }
      
        return <span>Select a vehicule</span>;
      };
    const vehiculeOption = (option) => {
      return (
          <div className="flex align-items-center">
              <div>{option.label}</div>
          </div>
      );
  };

  //fin ajoutt
  return (
                <div>
                <Toast ref={toast} />
                
            <form onSubmit={handleSubmit}>
                  <div className="flex flex-column md:flex-row">
                    <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                      <div className="flex flex-wrap  gap-2">
                            <label htmlFor="calendar-24h" className="font-bold block mb-2">
                                Date debut :
                            </label>
                            <Calendar id="calendar-24h" value={dhdeb} onChange={(e) => setDhdeb(e.value)} showTime hourFormat="24" placeholder='date et heure debut' />
                      </div>
                      <div className="flex flex-wrap  gap-2">
                            <label htmlFor="calendar-24h" className="font-bold block mb-2">
                                Lieu debut :
                            </label>
                            <Dropdown value={selectedLieuDeb} onChange={(e) => setSelectedLieuDeb(e.value)} options={optsLieux} optionLabel="label" placeholder="Selectionner lieu" className="w-full md:w-14rem" />
                      </div>
                      <div className="flex flex-wrap  gap-2">
                            <label htmlFor="Km debut" className="font-bold block mb-2">
                                Km debut :
                            </label>
                            <InputNumber inputId="minmaxfraction" value={kmdeb} onValueChange={(e) => setKmdeb(e.value)} minFractionDigits={2} maxFractionDigits={2} />
                      </div>
                      <div className="flex flex-wrap  gap-2">
                            <label htmlFor="Km debut" className="font-bold block mb-2">
                                Select Chauffeur :
                            </label>
                            <Dropdown value={selectedChauffeur} onChange={(e) => setSelectedChauffeur(e.value)} options={optsChauffeurs} optionLabel="label" placeholder="Select a chauffeur" filter valueTemplate={selectChauffeur} itemTemplate={chauffeurOption} className="w-full md:w-14rem" />
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
                      <div className="flex flex-wrap  gap-2">
                            <label htmlFor="calendar-24h" className="font-bold block mb-2">
                                Date fin :
                            </label>
                            <Calendar id="calendar-24h" value={dhfin} onChange={(e) => setDhfin(e.value)} showTime hourFormat="24" placeholder='date et heure fin'/>
                      </div>
                      <div className="flex flex-wrap  gap-2">
                            <label htmlFor="calendar-24h" className="font-bold block mb-2">
                                Lieu fin :
                            </label>
                            <Dropdown value={selectedLieuFin} onChange={(e) => setSelectedLieuFin(e.value)} options={optsLieux} optionLabel="label" placeholder="Selectionner lieu" className="w-full md:w-14rem" />
                      </div>
                      <div className="flex flex-wrap  gap-2">
                            <label htmlFor="Km debut" className="font-bold block mb-2">
                                Km fin :
                            </label>
                            <InputNumber inputId="minmaxfraction" value={kmfin} onValueChange={(e) => setKmfin(e.value)} minFractionDigits={2} maxFractionDigits={2} />
                      </div>
                      <div className="flex flex-wrap  gap-2">
                            <label htmlFor="Km debut" className="font-bold block mb-2">
                                Select Vehicule :
                            </label>
                            <Dropdown value={selectedVehicule} onChange={(e) => setSelectedVehicule(e.value)} options={optsVehicules} optionLabel="label" placeholder="Select a vehicule" filter valueTemplate={selectVehicule} itemTemplate={vehiculeOption} className="w-full md:w-14rem" />
                      </div>
                    </div>
                    {/* 3 */}
                    <div className="w-full md:w-3">
                        <Divider layout="vertical" className="hidden md:flex">
                            {/* <b>OR</b> */}
                        </Divider>
                        <Divider layout="horizontal" className="flex md:hidden" align="center">
                            {/* <b>OR</b> */}
                        </Divider>
                      
                    </div>
                    <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                      <div className="flex flex-wrap  gap-2">
                            <label htmlFor="vitesse" className="font-bold block mb-2">
                                Vitesse :
                            </label>
                            <InputNumber inputId="minmaxfraction" value={vitesse} onValueChange={(e) => setVitesse(e.value)} minFractionDigits={2} maxFractionDigits={2} />
                      </div>
                      <div className="flex flex-wrap  gap-2">
                            <label htmlFor="vitesse" className="font-bold block mb-2">
                                Motif :
                            </label>
                            <InputText value={motif} onChange={(e) => setMotif(e.target.value)} placeholder='Entrer motif'/>
                      </div>
                      <div className="flex flex-wrap  gap-2">
                            <label htmlFor="quantite" className="font-bold block mb-2">
                                Quantite Carburant :
                            </label>
                            <InputNumber inputId="minmaxfraction" value={qteCarb} onValueChange={(e) => setQteCarb(e.value)} minFractionDigits={2} maxFractionDigits={2} />
                      </div>
                      <div className="flex flex-wrap  gap-2">
                            <label htmlFor="carburant" className="font-bold block mb-2">
                                Montant Carburant :
                            </label>
                            <InputNumber inputId="minmaxfraction" value={montantCar} onValueChange={(e) => setMontantCar(e.value)} minFractionDigits={2} maxFractionDigits={2} />
                      </div>
                      
                    </div>
                  </div>
                  <Button label="Ajouter" icon="pi pi-plus" className="w-10rem mx-auto"></Button>
                
                </form>
                  </div>
  )
}
