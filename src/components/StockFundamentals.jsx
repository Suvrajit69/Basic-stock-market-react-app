import { useState, useEffect } from "react"
import finhub from "../apis/finhub"

const StockFundamentals = ({symbol}) => {
  const [stockFundamentals, setStockFundamentals] = useState();
  const [isLoading, setIsLoading] = useState(true)
  

console.log(symbol)
    let isMounted = true;
    useEffect(() => {
      const fetchData = async () =>{
         try {
            const response = await finhub.get('/stock/profile2',{
                params:{
                    symbol
                }
            })
            console.log(response.data)
            if(isMounted){
              setStockFundamentals(response.data)
              setIsLoading(false)
            }
         } catch (error) {
            console.log(error)
         }
      }
       fetchData()
       return ()=>(isMounted = false)
    }, [symbol])

    if(isLoading){
      return <div>Loading...</div>
    }
  return (
    <div className="row border bg-white rounded shadow-sm p-4 mt-5">
     <div className="col">
       <div>
         <span className="fw-bold">name: </span>
         {stockFundamentals.name}
       </div>
       <div>
         <span className="fw-bold">Country: </span>
         {stockFundamentals.country}
       </div>
       <div>
         <span className="fw-bold">Ticker: </span>
         {stockFundamentals.ticker}
       </div>
      </div>
     <div className="col">
       <div>
         <span className="fw-bold">Exchane: </span>
         {stockFundamentals.exchange}
       </div>
       <div>
         <span className="fw-bold">Industry: </span>
         {stockFundamentals.finnhubIndustry}
       </div>
       <div>
         <span className="fw-bold">IPO: </span>
         {stockFundamentals.ipo}
       </div>
      </div>
     <div className="col">
       <div>
         <span className="fw-bold">url: </span>
         <a href={stockFundamentals.weburl}>{stockFundamentals.weburl}</a>
       </div>
       <div>
         <span className="fw-bold">Market Capitalization: </span>
         {Math.floor(stockFundamentals.marketCapitalization)}
       </div>
       <div>
         <span className="fw-bold">Shares Outstanding: </span>
         {stockFundamentals.shareOutstanding}
       </div>
      </div>
    </div>
  )
}

export default StockFundamentals