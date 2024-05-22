import { createContext, useState, useLayoutEffect} from "react";


// create Context object
export const StorageContext = createContext({});

// create the Provider component
export const StorageProvider = ({children}) => {

    const [allCoins, setAllCoins] = useState([]);


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

    useLayoutEffect(() => {
 
        let isThere = JSON.parse(localStorage.getItem("coins")) || false; //coins = KEY

        if(!isThere){ //if false
            // set the local storage with an empty array
            localStorage.setItem("coins", JSON.stringify([])); //key-value
        }else {
            // set the state with the current values from the local storage
            let totalCoins = JSON.parse(localStorage.getItem("coins"));
            setAllCoins(totalCoins);
        }

    }, []);



    return(
        <StorageContext.Provider value={{saveCoin, allCoins, removeCoin}}>
            {children}
        </StorageContext.Provider>
    )
};