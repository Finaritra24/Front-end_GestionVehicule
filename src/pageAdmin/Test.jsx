import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ContentComponent() {
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('/ajoutA')
      .then(response => {
        // Mettre à jour le contenu avec la réponse de l'API
        setContent(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Contenu Freemarker</h1>
      <div>{content}</div>
    </div>
  );
}

export default ContentComponent;
