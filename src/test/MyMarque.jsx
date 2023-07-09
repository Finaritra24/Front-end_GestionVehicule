import React, { useState, useEffect } from 'react';
import Babel from '@babel/standalone';

function App() {
  const [dynamicComponent, setDynamicComponent] = useState(null);

  useEffect(() => {
    const codeStringFromSpringBoot = `
      const [marque, setMarque] = useState('');

      function handleSubmit(event) {
        event.preventDefault();
        console.log(marque);
      }

      return (
        <div>
          <h1>Dynamic Component</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" value={marque} onChange={e => setMarque(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    `;

    const transformedCode = Babel.transform(codeStringFromSpringBoot, {
      presets: ['react-app'],
    }).code;
    
    const DynamicComponent = eval(`(${transformedCode})`);
    setDynamicComponent(DynamicComponent);
  }, []);

  return (
    <div>
      <h1>My App</h1>
      {dynamicComponent && <DynamicComponent />}
    </div>
  );
}

export default App;
