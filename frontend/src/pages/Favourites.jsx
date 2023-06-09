import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import MapingFavProducts from '../components/MapingFavProducts'
import "../styles/fav.css"
import NavBar from './NavBar'
import { UserContext } from '../store/user.context.js'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const Favourites = () => {

    const [favs, setFavs] = useState([])
    const [name, setName] = useState("")
    const [msj, setMsj] = useState(false)

    const userCtx = useContext(UserContext);
    const [userId, setUserId] = useState(userCtx.userId);
    
  
    useEffect(() => {
      setUserId(userCtx.userId);
    }, [userCtx.userId]);
    
     useEffect(() => { 
        axios.get(`http://localhost:4000/favouritesProducts/${userId}` )
        .then((res) => { 
           const docs = res.data
           setTimeout(() => { 
            if(docs.length !== 0) { 
              setFavs(docs)
            } else { 
              setMsj(true)
            }
            
           }, 1500)
           
           console.log(favs)
        })
        .catch(err => console.log(err))
     }, [])

     useEffect(() => { 
        axios.get(`http://localhost:4000/user/${userId}`)   
             .then(({data}) =>{ 
              setName(data.name)
              userCtx.updateUser(userId)
             }) 
             .catch(err => console.log(err))
            
     }, [])
        
    

  return (

    <>

    <div>
        <NavBar/>
    </div>

    <div className='conteiner-title-fav'>
        {msj ? <> 
        <p> You have not yet saved products in the favorites section </p>    
       <Link to={`/rackets`} ><p title='Go Buy'>Go Shopping</p></Link> </> 

           :
           
          <h4 className='title-fav'> {name}, these are your Favorites!</h4>}
    </div>
        <div className='cont-prod-fav'>
          <MapingFavProducts pro={favs}/>
        </div>
    </>

  )
}

export default Favourites
