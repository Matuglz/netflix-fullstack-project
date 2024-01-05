'use client'

import React, { useState, useEffect, Suspense, lazy } from 'react'
import Loader from '../componets/loader/Loader.jsx';
import Buscador from '../componets/Buscador/Buscador.jsx';
import HomeHeader from '../componets/HomeHeader/HomeHeader.jsx';
import Nav from '../componets/Nav/Nav.jsx';
const Carousel = lazy(() => import('../componets/carousel/carousel.jsx'))
export default function Home() {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzNhNTc4Yzg3N2U3Y2I1NTY4Nzk1ODViMDQ5NjczNCIsInN1YiI6IjY0ZDJkOTE0ZDEwMGI2MDExYzdlZTVhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qTf7ppiGnJwfI8RiUBDdKD6Nr0br8K4wlpsR1C-UoOA'
    }
  };

  const API_URL = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=es-MX&page=1&sort_by=popularity.desc'
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original'
  const URL_GENRE = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=es-MX&page=2&sort_by=popularity.desc&with_genres='
  const ID_CRIME = '80'
  const ID_ACTION = '10759'

  const [actionSeries, setActionSeries] = useState([])
  const [crimeSeries, setCrimeSeries] = useState([])
  const [series, setSeries] = useState([])

  //-----------------------------------------------------

  useEffect(() => {
    fetch(`${API_URL}`, options)
      .then(response => response.json())
      .then(response => setSeries(response.results))
    fetch((`${URL_GENRE}${ID_CRIME}`), options)
      .then(response => response.json())
      .then(response => setCrimeSeries(response.results))
    fetch((`${URL_GENRE}${ID_ACTION}`), options)
      .then(response => response.json())
      .then(response => setActionSeries(response.results))
  }, [])


  //-----------------------------------------------------------------------
  const [buscar, setBuscar] = useState(false)

  function toggleBuscar() {
    setBuscar(!buscar)
  }

  function home() {
    setBuscar(false)
  }


  return (

    <Suspense fallback={<Loader/>}>
      <Nav toggleBuscar={toggleBuscar} home={home}/>
      {buscar ?
        <Buscador toggleBuscar={toggleBuscar} />
        :
        <div>
          <HomeHeader series={series} URL_IMAGE={URL_IMAGE} />
          <Carousel URL_IMAGE={URL_IMAGE} series={series} titulo={"Populares en netflix"} />
          <Carousel URL_IMAGE={URL_IMAGE} series={crimeSeries} titulo={"Terror"} />
          <Carousel URL_IMAGE={URL_IMAGE} series={actionSeries} titulo={"Accion"} />
        </div>}
    </Suspense>

  )
}
