import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './components/Table'

function App() {
  const [showTable, setShowTable] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={reactLogo} className="App-logo" alt="logo" />
        <img src={viteLogo} className="App-logo" alt="logo" /> */}
        {/* <h1>Welcome to Vite + React</h1> */}
        <button onClick={() => setShowTable(!showTable)}>
          {showTable ? 'Hide Table' : 'Show Table'}
        </button>
        {showTable && <Table />}
      </header>
    </div>
  )
}

export default App
