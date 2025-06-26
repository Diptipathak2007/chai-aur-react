import React,  { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react'

function App() {

  let [counter,setCounter] = useState(15)
  //let counter = 15;
  const addvalue=()=>{
    if (counter < 20) {
      setCounter(counter + 1);
    } else {
      console.log('Cannot go above 20');
    }
  }
  const removevalue=()=>{
    
    if (counter > 0) {
      setCounter(counter - 1);
    } else {
      console.log('Cannot go below 0');
    }
  }
  

  return (
    <>
      <h1>chai aur react</h1>
      <h2>counter value:{counter}</h2>
      <button onClick={addvalue}>
        add value{counter}
      </button>
      <br />
      <button onClick={removevalue}>
        remove value{counter}</button>
      <p>footer:{counter}</p>
    </>
  )
}

export default App
