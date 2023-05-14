import React,{useState,useRef} from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
        
export default function LoginAdmin() {
    //fonction
    const navigate = useNavigate();
    const [identification, setIdentification] = useState('admin1');
    const [mdp, setMdp] = useState('pass1');
    const toast = useRef(null);
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
    }

    function handleSubmit(event) {
        event.preventDefault(); // empêche la soumission du formulaire
      
        fetch('http://localhost:8081/loginAdmin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identification, mdp }),
          credentials: 'include'
        })
        .then(response => {
          if (response.ok) {
            // si la connexion a réussi, redirigez l'utilisateur vers une page de réussite
            navigate('/listVehicule');
          } else {
            // si la connexion a échoué, affichez un message d'erreur
            showError()
          }
        })
        .catch(error => {
          console.error(error);
        });
    };
    //fin foonction
    //paozy
    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Save" icon="pi pi-check" />
            {/* <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" /> */}
        </div>
    );
    //finpaozy
  return (
    <div>
        <br/>
        <Toast ref={toast} />
        <form onSubmit={handleSubmit}>
        <div className="card flex justify-content-center" >
            <Card title="Login" subTitle="Administrateur" footer={footer} header={header} className="md:w-25rem">
                <p className="m-0">Identification</p>
                <p className="m-0">
                    <div className="card flex justify-content-center">
                        <InputText value={identification} onChange={(e) => setIdentification(e.target.value)} />
                    </div></p>
                <p className="m-0">Mot de passe</p>
                <p className="m-0">
                <div className="card flex justify-content-center">
                    <InputText value={mdp} onChange={(e) => setMdp(e.target.value)} />
                </div>
                </p>
            </Card>
        </div>
        </form>
    </div>
  )
}
