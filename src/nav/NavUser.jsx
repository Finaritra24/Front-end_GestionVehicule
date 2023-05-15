import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

export default function NavUser() {
  const navigate = useNavigate();

  const handleNavigation = (url) => {
    navigate(url);
  };

  const items = [
    {
      label: 'Trajet',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Ajout/Liste',
          icon: 'pi pi-fw pi-file',
          command: () => handleNavigation('/trajet'),
        },
      ],
    },
    {
      label: 'Assurance/Vehicule',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Vehicule',
          icon: 'pi pi-fw pi-file',
          command: () => handleNavigation('/vehiculeUser'),
        },
        {
          label: 'Echeance',
          icon: 'pi pi-fw pi-file',
          command: () => handleNavigation('/echeance'),
        },
      ],
      
    },
    {
      label: 'Trajet',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Ajout/Liste',
          icon: 'pi pi-fw pi-bookmark',
          items: [
            {
              label: 'Ajouter Publication',
              icon: 'pi pi-fw pi-plus',
              command: () => handleNavigation('/ajoutPub'),
            },
            {
              label: 'Liste publication',
              icon: 'pi pi-fw pi-video',
              command: () => handleNavigation('/listPub'),
            },
          ],
        },
      ],
    },

    {
      label: 'Utilisateur',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Se Deconnecter',
          icon: 'pi pi-fw pi-power-off',
          command: () => handleNavigation('/'),
        },
      ],
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} />
    </div>
  );
}
