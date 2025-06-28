import {useEffect, useState} from "react"


function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json`)

        .then((res) => res.json())
        .then((res) => {
            console.log("Fetched:", res[currency])
            setData(res[currency])
        })
        
    }, [currency])
    console.log(data);
    return data
}

export default useCurrencyInfo;