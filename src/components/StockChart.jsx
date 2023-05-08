import { useState} from 'react';
import Chart from 'react-apexcharts';

const StockChart = ({chartData, symbol}) => {
    const [dateFormat, setDateFormat] = useState('24h');
    const {day, week, year} = chartData;

    let timeData    
    // console.log(day)
    switch (dateFormat) {
        case '24h':
            timeData = day
            break;
        case '7d':
            timeData = week
            break;
        case '1y':
            timeData = year
            break;       
        default:
            timeData = day
            break;                
    }
//    console.log(timeData[timeData.length -1].y - timeData[0].y)
    const color = timeData[timeData.length -1].y - timeData[0].y > 0 ? '#26C281' : 'red';
    const options ={
        colors: [color],
        title: {
            text: symbol,
            align: 'center',
            style:{
                fontSize: '24px'
            }
        },
        chart:{
            id:'stock data',
            animations:{
                speed: 1300
            }
        },
        xaxis:{
            type: 'datetime',
            labels:{
                datetimeUTC: false
            }
        },
        tooltip:{
            x: {
                format: 'MMM dd HH:MM'
            }
        }
    }
    
    
    const series = [{
        name: symbol,
        data: timeData
    }]

    const renderButtonSelect =(button)=>{
        const classes = "btn m-1 "
        if(button === dateFormat){
            return classes + 'btn-primary'
        }else{
            return classes + 'btn-outline-primary'
        }
    }
  return (
    <div  className='mt-5 p-4 shadow-sm bg-white'>
        <Chart options={options} series={series} type='area' width='100%'/>
        <div>
            <button onClick={()=> setDateFormat('24h')} className={renderButtonSelect('24h')}>1 day</button>
            <button onClick={()=> setDateFormat('7d')} className={renderButtonSelect('7d')}>7 day</button>
            <button onClick={()=> setDateFormat('1y')} className={renderButtonSelect('1y')}>1 year</button>
        </div>
    </div>
  )
}

export default StockChart;