import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import axios from 'axios';

function MyReactComponent() {
  {/* DÃ©claration des Ã©tats */}
  const [marque, setMarque] = useState('');

  {/* DÃ©claration des effets */}
  function handleSubmit(event) {
  event.preventDefault();
  console.log(marque);
}

  return (
    <div>
      <p>
        <label htmlFor="username" className="w-6rem">
          marque
        </label>
        <InputText value={marque} onChange={(e) => setMarque(e.target.value)} placeholder="Enter a marque" />
        <Button label="Ajouter" icon="pi pi-plus" className="w-10rem mx-auto" onSubmit={handleSubmit}></Button>
      </p>
    </div>
  );
}

export default MyReactComponent;