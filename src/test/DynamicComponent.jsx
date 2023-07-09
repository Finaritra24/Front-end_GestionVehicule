import React from 'react';

function CodeDisplay(props) {
  const code = props.code; // Obtenez le code JavaScript envoyé par le backend

  return (
    <pre>
      <code>{code}</code>
    </pre>
  );
}

export default CodeDisplay;
