import { useState } from 'react'
import './App.css'
import Table from './components/Table'


function App() {
  const [showTable, setShowTable] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setShowTable(!showTable)}>
          {showTable ? 'Hide Table' : 'Show Table'}
        </button>
        {showTable && <Table />}
      </header>
    </div>
  )
}

export default App
