import { createContext, useState, useLayoutEffect} from "react";


// create Context object
export const CryptoContext = createContext({});

// create the Provider component
export const CryptoProvider = ({children}) => {

    const [cryptoData, setCryptoData] = useState();

    const getCryptoData = async () => {
        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc
                 &per_page=50&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C30d&precision=full`
            )
            .then(res => res.json())
            .then(json => json);
            console.log(data);
            setCryptoData(data);
        } 
        catch (error) {       
            console.log(error);
        }
    };

    useLayoutEffect(() => {
        getCryptoData();
    }, []);

    return(
        <CryptoContext.Provider value={{cryptoData}}>
            {children}
        </CryptoContext.Provider>
    )
};