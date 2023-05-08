import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import finhub from "../apis/finhub"
import { WatchListContext } from "../context/WatchlistContext";

const StockList = () => {
  const [stock, setStock] = useState([]);
  const {watchList, deleteStock} = useContext(WatchListContext);
  const navigate = useNavigate();
  // const [watchList, setwatchList] = useState(["GOOGL", "MSFT", "AMZN", 'TCS'])

  const changeColor = (change)=>{
    return change > 0 ? 'success': 'danger';
  }
  const changeIcon = (change)=>{
    return change > 0 ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/>;
  }
    
    useEffect(()=>{
      let isMounted = true;

      const fetchData = async () =>{
        try {
          const responses = await Promise.all(watchList.map((stock)=>(
            finhub.get('/quote',{
              params:{
                symbol: stock
              }
            })
          )))
          // console.log(responses)
          //Filtered only necessary things from responses
          const data = responses.map((response)=>(
           {
            data: response.data,
            symbol: response.config.params.symbol
           } 
          ))
          if(isMounted === true){
           setStock(data)
          }
          // console.log(stock)
          // console.log(data)
        } catch (err) {
          console.log(err)
        }
      }
      fetchData()

      return () => (isMounted = false);
    },[watchList]);

  const handleStockView = (symbol) =>{
    navigate(`detail/${symbol}`)  
  }
  return (
    <div>
       <table className="table hover mt-5">
         <thead style={{color: "rgb(79,89,102)"}}>
        <tr>
             <th scope="col">Name</th>
             <th scope="col">Last</th>
             <th scope="col">Chg</th>
             <th scope="col">Chg%</th>
             <th scope="col">High</th>
             <th scope="col">Low</th>
             <th scope="col">Open</th>
             <th scope="col">Close</th>
           </tr>
         </thead>
         <tbody>
           {stock.map((stockData)=>(
             <tr  onClick={()=> handleStockView(stockData.symbol)} className="table-row" style={{cursor: 'pointer'}} key={stockData.symbol}>
               <th scope="row">{stockData.symbol}</th> 
               <td>{stockData.data.c}</td>
               <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d} {changeIcon(stockData.data.d)}</td>
               <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp} {changeIcon(stockData.data.d)}</td>
               <td>{stockData.data.h}</td>
               <td>{stockData.data.l}</td>
               <td>{stockData.data.o}</td>

               <td>
                 {stockData.data.pc} 
                 <button className="btn btn-danger btn-sm ml-3 d-inline-block   delete-btn"
                  onClick={(e)=>{
                    e.stopPropagation()
                    deleteStock(stockData.symbol)}}>
                    Remove
                 </button>
                </td>

              </tr>
           ))} 
         </tbody> 
       </table>
    </div>
  )
}

export default StockList