import { createContext, useState, useLayoutEffect} from "react";


// create Context object
export const CryptoContext = createContext({});

// create the Provider component
export const CryptoProvider = ({children}) => {


    const [cryptoData, setCryptoData] = useState();
    const [searchData, setSearchData] = useState();
    const [coinSearch, setCoinSearch] = useState("");
    const [coinData, setCoinData] = useState();

    const [currency, setCurrency] = useState("usd");
    const [sortBy, setSortBy] = useState("market_cap_desc");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(50);


    const getCryptoData = async () => {
        setCryptoData(); // just for see loading on change page

        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h%2C7d%2C30d&precision=full`
            )
            .then(res => res.json())
            .then(json => json);
            //console.log(data);
            setCryptoData(data);
        } 
        catch (error) {       
            console.log(error);
        }
    };

    const getCoinData = async (coinId) => {
        //setCryptoData(); // just for see loading on change page

        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coinId}?localization=true&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`
            )
            .then(res => res.json())
            .then(json => json);
            //console.log(data);
            setCoinData(data);
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
            //console.log(data);
            //console.log(data.coins);
            setSearchData(data.coins);
        } 
        catch (error) {       
            console.log(error);
        }
    };

    const resetFunc = () => {
        setPage(1);
        setCoinSearch("");
    };


    useLayoutEffect(() => {
        getCryptoData();
    }, [coinSearch, currency, sortBy, page, perPage]);
    // first "coinSeacrh" is empty and get all coins,
    // when click on item "coinSearch" become that coin 
    // and when we change "coinSearch", it calls again func getCryptoData(whit the id)

    return(
        <CryptoContext.Provider value={{
            cryptoData, 
            searchData, 
            getSearchResult, 
            setCoinSearch, 
            setSearchData,
            currency, setCurrency,
            sortBy, setSortBy,
            page, setPage,
            resetFunc,
            perPage, setPerPage,
            coinData,getCoinData,
            }}>
            {children}
        </CryptoContext.Provider>
    )
};