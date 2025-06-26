import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
function Myapp() {
  return(
  <div>
    <h1>my custom app</h1>
  </div>
 )
}
// const reactelement={
//   type:'a',
//   props:{
//       href:"https://www.google.com",
//       target:"_blank",
//   },
//   children:'click me to vist google',
// }

const anotherelement=(
  <a href="https://google.com" target='_blank'>visit google</a>
)
const anotheruser="chai aur react"
const reactelement=React.createElement(
  'a',
  {href:"https://google.com", target: '_blank'},
  'click me to visit google',
  anotheruser
)

ReactDOM.createRoot(document.getElementById('root')).render(
    
     
  //reactelement
  //anotherelement
  //they both will run suitably
  // <App/>
  reactelement
    
)
