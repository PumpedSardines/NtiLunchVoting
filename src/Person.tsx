import React from 'react'

export default function Person() {
  return (
    <div className="person">

        <input className='name' placeholder='Namn' type="text" />
        <div className='buttons'>
            <button>
                Lägg till val
            </button>
        </div>

        <div className='options'>
            <div className='option'>
                <input placeholder='Resturang' type="text" />
                <div className="buttons">
                    <button>
                        Ta bort
                    </button>
                </div>
            </div>
            <div className='option'>
                <input type="text" />
                <div className="buttons">
                    <button>
                        Ta bort
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
