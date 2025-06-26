// function customrender(reactElement, container) {
//     const domelement=document.createElement(reactElement.type);
//     domelement.innerHTML=reactElement.children;
//     domelement.setAttribute('href', reactElement.props.href);
//     domelement.setAttribute('target', reactElement.props.target);
//     container.appendChild(domelement);
// }

function customrender(reactElement, container) {
    const domelement = document.createElement(reactElement.type);
    domelement.innerHTML = reactElement.children;
    for (const prop in reactElement.props) {
        if( prop === 'children') {
            continue; 
        }
        domelement.setAttribute(prop, reactElement.props[prop]);
    }
    container.appendChild(domelement);
    
    
}    
const reactelement={
    type:'a',
    props:{
        href:"https://www.google.com",
        target:"_blank",
    },
    children:'click me to vist google',
}


const maincontainer=document.querySelector('#root');
customrender(reactelement,maincontainer);