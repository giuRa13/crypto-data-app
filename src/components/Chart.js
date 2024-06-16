import React, { useContext, useLayoutEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS} from "chart.js/auto"; //Dont get rid of this
import { CryptoContext } from '../context/CryptoContext';
//import moment from 'moment';


function Chart({id}) {

  /*const graphStyle = {
    border: "1px solid #2f2f2f",
    borderRadius: "0.4rem",
    padding: "0.5rem",
    margin: "0",
  };*/

  const [chartData, setChartData] = useState();
  let {currency} = useContext(CryptoContext);
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(364);


  const options = ({
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },      
    interaction: {
      mode: "index",
      intersect: false,
    },
          scales: {
            crypto1:{
              position: "left",
              ticks: {
                callback: function(value, index, ticks ) {
                  return new Intl.NumberFormat("en-IN",{
                    style: "currency",
                    currency: currency,
                    currencyDisplay: "symbol"
                }).format(value); //"$" + value.toLocaleString();
                },
              },           
          },                  
            x: {
              grid: {
                display: false,
                color: "#2f2f2f",
              },
              border: {
                display: false,
              },
              ticks: {
                autoskip: true,
                  display:false,
            },
          },
        },
            y: {
              grid: {
                display: false,
                color: "#2f2f2f",
              },
              border: {
                display: false,
              },
              ticks:{
                autoskip: true,
                display:false,
              }
            },                             
        }
);

    const ChartComponent = ({data, options, currency, type}) => {
        return (
        <div className="canvas-container">
        <Line data={chartData} options={options} />
        </div>
        );
    };

    useLayoutEffect(() => {
        const getChartData = async (id) => {
            try {
                const data = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily&precision=full`
                )
                .then(res => res.json())
                .then(json => json);
                //console.log("chart-data>>>",data);
                /*let convertData = data.prices.map( item => {
                    return{
                        data: new Date(item[0]).toLocaleDateString(),
                        prices: item[1],
                    }
                });*/
                //console.log(convertData);
                setChartData(
                {
                  labels: data[type].map((item) => new Date(item[0]).toLocaleDateString()),                          
                  datasets: [
                    {
                      data: data[type].map((item) => item[1]),
                      borderColor: "#fc5b23",
                      borderWidth: 2,
                      fill: true,   
                      //tension: 0.1,            
                      backgroundColor: 'rgba(252, 91, 35, 0.1)',
                      pointRadius: 0,
                      yAxisID: "crypto1",
                    },
                  ]
                });
            } 
            catch (error) {       
                console.log(error);
            }
        }
        getChartData(id);      
    }, [id, type, days]);



//'w-[800px] h-[800px]'
//w-[900px] h-[500px]
  return (
    <div className='w-full h-full'>


      <div /*style={graphStyle}*/ >     
          <div className='flex items-center justify-center '>
            <button onClick={()=>setType("prices")} 
            className={`text-sm p-2 m-2 bg-opacity-25 rounded-md hover:text-orange
            ${type === "prices" 
              ? "bg-orange text-orange" 
              : "bg-darkgrey text-grey"}
            `} >
                Price
            </button>
            <button  onClick={()=>setType("market_caps")} 
            className={`text-sm p-2 m-2 bg-opacity-25 rounded-md hover:text-orange
            ${type === "market_caps" 
              ? "bg-orange text-orange" 
              : "bg-darkgrey text-grey"}
            `} >
                Market Cap
            </button>
            <button  onClick={()=>setType("total_volumes")} 
            className={`text-sm p-2 m-2 bg-opacity-25 rounded-md hover:text-orange
            ${type === "total_volumes" 
              ? "bg-orange text-orange" 
              : "bg-darkgrey text-grey"}
            `} >     
                Volumes
            </button>
        </div>       
        { chartData ?
                <ChartComponent 
                  data={chartData} 
                  options={options} 
                  currency={currency}
                  type={type}
                  days={days}
                  />       
            : null         
        }
          </div>

          <div className='flex items-center justify-center p-4'>
            <button onClick={()=>setDays(7)} 
            className={`text-sm p-2 m-2 bg-opacity-25 rounded-md hover:text-orange
            ${days === 7
              ? "bg-orange text-orange" 
              : "bg-darkgrey text-grey"}
            `} >
                1 Week
            </button>
            <button onClick={()=>setDays(30)} 
            className={`text-sm p-2 m-2 bg-opacity-25 rounded-md hover:text-orange
            ${days === 30
              ? "bg-orange text-orange" 
              : "bg-darkgrey text-grey"}
            `} >
                1 Month
            </button>
            <button onClick={()=>setDays(182)} 
            className={`text-sm p-2 m-2 bg-opacity-25 rounded-md hover:text-orange
            ${days === 182 
              ? "bg-orange text-orange" 
              : "bg-darkgrey text-grey"}
            `} >
                6 Months
            </button>
            <button onClick={()=>setDays(364)} 
            className={`text-sm p-2 m-2 bg-opacity-25 rounded-md hover:text-orange
            ${days === 364
              ? "bg-orange text-orange" 
              : "bg-darkgrey text-grey"}
            `} >
                1 Year
            </button>
        </div>

    </div>
  )
}

export default Chart