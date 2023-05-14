import React, { useState, useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
        
export default function Vehicule() {
  const [userId, setUserId] = useState(null);
  //if user
  useEffect(() => {
    fetch('http://localhost:8081/getUserId', { credentials: 'include' })
      .then(response => response.text())
      .then(data => setUserId(data))
      .catch(error => console.error(error));
  }, []);

  if (userId === null) {
    return <p>Chargement...</p>
  }

  return (
    <div>
        <div className="card">
            <Accordion activeIndex={0}>
              <AccordionTab
                    header={
                        <div className="flex align-items-center">
                            <i className="pi pi-plus mr-2"></i>
                            <span className="vertical-align-middle">Ajouter Vehicule</span>
                        </div>
                    }
                >
              </AccordionTab>
                <AccordionTab
                    header={
                        <div className="flex align-items-center">
                            <i className="pi pi-list mr-2"></i>
                            <span className="vertical-align-middle">Liste Vehicule</span>
                        </div>
                    }
                >
                </AccordionTab>
                <AccordionTab
                    header={
                        <div className="flex align-items-center">
                            <i className="pi pi-search mr-2"></i>
                            <span className="vertical-align-middle">Header III</span>
                            <i className="pi pi-cog ml-2 ml-2"></i>
                        </div>
                    }
                >
                    <p className="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt 
                        mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. 
                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </AccordionTab>
            </Accordion>
        </div>
    </div>
  );
}
