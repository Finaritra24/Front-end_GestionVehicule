import React,{useState,useEffect,useRef} from 'react'
import { Panel } from 'primereact/panel';
import {useNavigate} from 'react-router-dom';
import { OrderList } from 'primereact/orderlist';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
        
export default function EcheanceVehicule() {
    const [echeances,setEcheances]=useState([]);
    const navigate = useNavigate();
    const toast = useRef(null);
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Echec ajout', life: 3000});
    }
    //list echeance
    useEffect(() => {
        fetch('http://localhost:8081/listTypeEcheance')
        .then(response => response.json())
        .then(data => setEcheances(data))
        .catch(error => console.error(error));
    }, []);
    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.idTypeEcheance}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item.nom}</span>
                    </div>
                    <div className="flex align-items-center gap-2">
                        <Button label="Profil" icon="pi pi-plus" className="w-10rem mx-auto" onItemClick={(e) => handleSubmit(e.value.idTypeEcheance)} onClick={() => handleSubmit(item.idTypeEcheance)}></Button>
                    </div>
                </div>
            </div>
        );
    };
    function handleSubmit(id) {
        fetch('http://localhost:8081/setCookieTypeEcheance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id}),
          credentials: 'include'
        })
        .then(response => {
          if (response.ok) {
            // si la connexion a réussi, redirigez l'utilisateur vers une page de réussite
            console.log('handleSubmit successful, redirecting...');
            navigate("/profilTypeEcheance")
          } else {
            // si la connexion a échoué, affichez un message d'erreur
            showError()
          }
        })
        .catch(error => {
          console.error(error);
        });
    };
    //fin post ajout trajet
  return (
    <div>
    <Toast ref={toast} />
    <h1>Echeance Vehicule</h1>
    <Panel header="Header">
        <p className="m-0">
            <div className="card xl:flex xl:justify-content-center">
                <OrderList value={echeances}  header="Echeances" filter filterBy="nom" dataKey="idTypeEcheance" 
                 itemTemplate={itemTemplate}></OrderList>
            </div>
        </p>
    </Panel>
    </div>
  )
}
