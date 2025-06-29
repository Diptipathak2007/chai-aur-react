import React, { useState, useEffect } from 'react'

function Github() {
  const[data,setData]=useState([])
  useEffect(()=>{
    fetch("https://api.github.com/users/Diptipathak2007")
    .then(response=> response.json())
    .then(data=>{
      console.log(data);
      setData(data)
    })
  },[])
  return (
    <div className='text-center m-4 bg-gray-500 text-white p-4 text-3xl'>
        <img src={data.avatar_url} alt="Git picture" width={300} />
        Github Followers:{data.followers}</div>
  )
}

export default Github