import { useState } from 'react'
import Person from './Person'
function App() {

  return (
    <div className="app">
      <div className="wrapper">
        <div className='buttons top'>
          <button>Lägg till person</button>
          <button>Slumpa</button>
        </div>
        <Person />
      </div>
    </div>
  )
}

export default App
