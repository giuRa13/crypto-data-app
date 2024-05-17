import { createContext, useState, useLayoutEffect} from "react";


// create Context object
export const CryptoContext = createContext({});

// create the Provider component
export const CryptoProvider = ({children}) => {

    const [cryptoData, setCryptoData] = useState();
    const [searchData, setSearchData] = useState();
    const [coinSearch, setCoinSearch] = useState("");


    const getCryptoData = async () => {
        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinSearch}&order=market_cap_desc
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

    const getSearchResult = async (query) => {
        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/search?query=${query}`
            )
            .then(res => res.json())
            .then(json => json);
            console.log(data);
            console.log(data.coins);
            setSearchData(data.coins);
        } 
        catch (error) {       
            console.log(error);
        }
    };



    useLayoutEffect(() => {
        getCryptoData();
    }, [coinSearch]);
    // first "coinSeacrh" is empty and get all coins,
    // when click on item "coinSearch" become that coin 
    // and when we change "coinSearch", it calls again func getCryptoData(whit the id)

    return(
        <CryptoContext.Provider value={{
            cryptoData, 
            searchData, 
            getSearchResult, 
            setCoinSearch, 
            setSearchData
            }
            }>
            {children}
        </CryptoContext.Provider>
    )
};