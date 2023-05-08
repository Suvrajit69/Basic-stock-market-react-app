import {useEffect, useState, useRef} from 'react'
import {useParams} from 'react-router-dom';
import finhub from '../apis/finhub';
import StockChart from '../components/StockChart';
import StockFundamentals from '../components/StockFundamentals';

const formatData = (data) =>{
  return data.t.map((element, index)=>(
    {
      x: element * 1000,
      y:data.c[index]
    }
  ))
}

const StockDetailsPage = () => {
  const [chartData, setChartData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const {symbol} = useParams()
   const dumpTwiceRendering =useRef(false)
  useEffect(() => {

    if(dumpTwiceRendering.current === false){
    const fetchData = async () =>{
      const date = new Date()
      const currentTime = Math.floor(date.getTime() / 1000) //convert from miliseconds to seconds divided by 1000
      let oneDay;
       
      if (date.getDay() === 6) { // 6 = saturday
         oneDay = currentTime - 2*24*60*60 //2day*1day*miniute*hour
      }else if (date.getDay() === 0) { // 0 = sunday
         oneDay = currentTime - 3*24*60*60 //3day*1day*miniute*hour
      }else{
         oneDay = currentTime - 24*60*60 //1day*miniute*hour
      }
      const oneWeek = currentTime - 7*24*60*60
      const oneYear = currentTime - 365*24*60*60

      try {
        const responses = await Promise.all([
          finhub.get('/stock/candle',{
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60          
            }
          }),
          finhub.get('/stock/candle',{
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60          
            }
          }),
          finhub.get('/stock/candle',{
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: 'W'          
            }
          })
        ])  
        // console.log(responses)
        setChartData({
          day: formatData(responses[0].data),
          week:formatData(responses[1].data),
          year:formatData(responses[2].data)
        })
        setIsLoading(false);
      }  
      catch (error) {
      console.log(error)
    }
  }

    fetchData()
    return () => {
      dumpTwiceRendering.current = true
    };
 }
  }, [symbol])
  

  if(isLoading){
    return <div>Loading...</div>
  }
  return(
     
      <div>
        <StockChart chartData={chartData} symbol={symbol}/>
        <StockFundamentals symbol={symbol}/>
      </div>
    
  )
}


export default StockDetailsPage