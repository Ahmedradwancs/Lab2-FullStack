import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';

function App() {
  const [showTable, setShowTable] = useState(false);

  return (
    <div className="App">
      <Header />
      <div className="App-content">
        <button onClick={() => setShowTable(!showTable)}>
          {showTable ? 'Hide Table' : 'Show Table'}
        </button>
        {showTable && <Table />}
      </div>
    </div>
  );
}

export default App;
