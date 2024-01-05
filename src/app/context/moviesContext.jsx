'use client'
import { createContext, useState } from "react";

export const MoviesContext = createContext()

const URL_IMAGE = 'https://image.tmdb.org/t/p/original'
export default function MoviesProvider({children}) {

    const [peliculasBusqueda, setPeliculasBusqueda] = useState([])

    //SEARCH BAR
    const [isExpanded, setIsExpanded] = useState(false)
  
    function toggleExpand(){
      setIsExpanded(!isExpanded)
    }

    // EDITAR PERFIL
    const [divId, setDivId] = useState("")

    function handleId(e) {
        setDivId(e)
    }

  return (
    <MoviesContext.Provider  value={{peliculasBusqueda, setPeliculasBusqueda, URL_IMAGE, toggleExpand, isExpanded, divId, handleId}}>
        {children}
    </MoviesContext.Provider>
  )
}
