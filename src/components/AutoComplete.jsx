import { useState, useEffect, useContext } from "react"
import finhub from "../apis/finhub";
import { WatchListContext } from "../context/WatchlistContext";

const AutoComplete = () => {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const {addStock} = useContext(WatchListContext)
  // const value = (WatchListContext)
  // console.log(value)


  useEffect(()=>{
    let isMounted = true;
    const fetchData = async () =>{
      try {
        const response = await finhub.get('/search',{
          params:{
            q:search
          }
        })
        // console.log(response.data.result)
        setResults(response.data.result)
        return () => (isMounted = false);
      } catch (error) {
        console.log(error)
      }
    }

    if(search.length > 0){
      fetchData();
    }else{
      setResults([])
    }
  },[search]);
  // console.log(results)
  return (
    <div className='w-5 p-5 rounded mx-auto'>
      <div className='form-floating dropdown'>

        <input type="text" style={{backgroundColor: 'rgba(145, 158, 171, 0.4)'}} className='form-control' placeholder='Search' autoComplete='off' value={search} onChange={(e) => setSearch(e.target.value)}/>

        <label htmlFor="search">Search</label>
        <ul
         className={`dropdown-menu 
         ${search.length > 0 ? 'show': ''}`}
         style={{height: '500px', overflowY: 'scroll', overflowX: 'hidden', cursor: 'pointer'}}
         >
          {results.map((name)=>(
         <li key={name.symbol} onClick={
          () => {  addStock(name.symbol)
          setSearch("")
         }}>{name.description} {name.type}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AutoComplete