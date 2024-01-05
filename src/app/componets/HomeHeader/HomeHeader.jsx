import React from 'react'
import './HomeHeader.css'


export default function HomeHeader({ series, URL_IMAGE }) {

  return (
    <div className='header-container'>
      {
        series.length > 0 &&
        <div className='card-header-container'>
          {<img className='img-header-container' src={(`${URL_IMAGE}` + series[0].backdrop_path)} />}
          <div className='header-body'>
            <h2 className='movie-title'>{series[0].name}</h2>
            <div className="button-container">
              <button className='boton-header boton-reproducir'><i className="bi bi-play-fill"></i> Reproducir</button>
              <button className='boton-header boton-lista'>+ Mi Lista</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
