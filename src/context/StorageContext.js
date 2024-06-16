import { createContext, useState, useLayoutEffect, useContext, useEffect} from "react";
import { CryptoContext } from "./CryptoContext";


// create Context object
export const StorageContext = createContext({});

// create the Provider component
export const StorageProvider = ({children}) => {

    const [allCoins, setAllCoins] = useState([]);
    const [saveData, setSaveData] = useState();
    let { currency, sortBy} = useContext(CryptoContext);

    const saveCoin = (coinId) => {
        let oldCoins = JSON.parse(localStorage.getItem("coins"));

        if(oldCoins.includes(coinId)){
            return null;
        }
        else {
            let newCoin = [...oldCoins, coinId];
            setAllCoins(newCoin);
            localStorage.setItem("coins", JSON.stringify(newCoin));          
        }
    };
    
    const removeCoin = (coinId) => {
        let oldCoins = JSON.parse(localStorage.getItem("coins"));
        let newCoin = oldCoins.filter(item => item !== coinId);

        setAllCoins(newCoin);
        localStorage.setItem("coins", JSON.stringify(newCoin));
    };

    const getSavedData = async (totalCoins = allCoins) => {
        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(",")}&order=${sortBy}&sparkline=false&price_change_percentage=24h%2C7d%2C30d&precision=full`
            )
            .then(res => res.json())
            .then(json => json);
            //console.log(data);
            setSaveData(data);
        } 
        catch (error) {       
            console.log(error);
        }
    };

    const resetSavedResult = () => {
        getSavedData();
    };



    useEffect(() => { 
        if (allCoins.length > 0) {
            getSavedData(allCoins);
        }
        else {
            setSaveData();
        }

    }, [allCoins]); // when there is a change in allCoins
    // this will call saveData(so we see the updated saved coins)

    useLayoutEffect(() => {
 
        let isThere = JSON.parse(localStorage.getItem("coins")) || false; //coins = KEY

        if(!isThere){ //if false
            // set the local storage with an empty array
            localStorage.setItem("coins", JSON.stringify([])); //key-value
        }else {
            // set the state with the current values from the local storage
            let totalCoins = JSON.parse(localStorage.getItem("coins"));
            setAllCoins(totalCoins);

            if(totalCoins.length > 0){
                getSavedData(totalCoins);
            }
        }

    }, []);


    return(
        <StorageContext.Provider value={{saveCoin, allCoins, removeCoin, saveData, resetSavedResult}}>
            {children}
        </StorageContext.Provider>
    )
};