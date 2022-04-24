import React, { useState } from 'react';

const App: React.FC = () => {
  const [text, setText] = useState<string>('');

  return (
    <div>
      <h1>ALO HEHHEEH sadf{text}</h1>
      <button onClick={() => setText('yes worked!')}>click</button>
    </div>
  );
};

export default App;
