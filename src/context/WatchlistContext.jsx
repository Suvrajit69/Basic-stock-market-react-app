import {createContext, useState, useEffect} from 'react';

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) =>{

    const addStock = (stock) =>{
        if(watchList.indexOf(stock) === -1){
            
            setwatchList([...watchList, stock])
        }
    }

    const deleteStock = (stock) =>{
        setwatchList(watchList.filter((element)=>{
            return element !== stock
        }))
    }

    const [watchList, setwatchList] = useState(
        localStorage.getItem('watchList')?.split(',') || 
        ["GOOGL", "MSFT", "AMZN", 'TCS']
    )

    useEffect(() => {
      
    localStorage.setItem('watchList', watchList)
      
    }, [watchList])
    

    return <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
        {props.children}        
    </WatchListContext.Provider>
}
