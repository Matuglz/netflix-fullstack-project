import React, { useContext, useEffect } from 'react'
import { MoviesContext } from '../../context/moviesContext.jsx'
import tippy from 'tippy.js'
import './Buscador.css'

export default function Buscador({ toggleBuscar }) {

    const { peliculasBusqueda, URL_IMAGE, toggleExpand } = useContext(MoviesContext)

    //TIPS BOTONES

    useEffect(() => {
        tippy(".mas", {
            content: 'Info',
        });

        tippy('.mg', {
            content: 'Me gusta'
        })

        tippy('.repro', {
            content: 'Reproducir'
        })
    }, [peliculasBusqueda]);

    return (
        <div>
            <button className='volver-atras' onClick={()=>{toggleBuscar(), toggleExpand()}}>atras</button>
            <div className='contenedor-buscador'>
                {peliculasBusqueda.map((movie) => {
                    const imageError = !movie.poster_path;
                    if (imageError) {
                        return null;
                    }
                    return (
                        <div className='div-buscador' key={movie.id}>
                            <img
                                className='img-buscador'
                                src={`${URL_IMAGE}${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <div className='div-hover'>
                                <h3 className='title-hover'>{movie.title}</h3>
                                <div className='buttons-hover'>
                                    <p className='btn-hover-derecha'>
                                        <button className='btn-carousel-hover btn-repro repro'>
                                            <i className='bi bi-play-fill'></i>
                                        </button>
                                        <button className='btn-carousel-hover mg'>
                                            <i className='bi bi-hand-thumbs-up'></i>
                                        </button>
                                    </p>
                                    <button className='btn-carousel-hover mas'>
                                        <i className='bi bi-chevron-down'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}