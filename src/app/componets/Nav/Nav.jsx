'use client'
import React, { useEffect, useState } from 'react'
import './Nav.css'
import SearchBar from '../SearchBar/SearchBar'

export default function Nav({ toggleBuscar, home }) {

    const [fix, setFix] = useState(false)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        function setFixed() {
            if (window.scrollY >= 10) {
                setFix(true)
            } else { setFix(false) }
        }

        async function fetchData() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/selectedProfile`, {
                    method: 'GET',
                    credentials: 'include'
                })
                if (res.status === 201) {
                    const data = await res.json()
                    setProfile(data.profile)
                }
            }
            catch {
                console.log('error al consultar sesion');
            }
        }

        fetchData()
        window.addEventListener('scroll', setFixed)
    }, [])



    useEffect(() => {
        if(profile){
            console.log(profile.image);
        }
    }, [profile])

    return (
        <nav className={fix ? 'nav fixed' : 'nav'}>
            <div className='div-izquierda'>
                <img className='nav-logo'  />
                <span>Explorar<i className="bi bi-caret-down-fill"></i></span>
            </div>

            <div className='div-izquierda-desktop'>
                <img className='logo-desk' src='https://cacaaaaaaaaaaaaaaa.s3.sa-east-1.amazonaws.com/logo-netflix.png' alt="logo" />
                <ul className='ul-nav'>
                    <li onClick={home}>Inicio</li>
                    <li>Series</li>
                    <li>Peliculas</li>
                    <li>Novedades populares</li>
                    <li>Mi lista</li>
                    <li>Explorar por idiomas</li>
                </ul>
            </div>


            <div className='div-derecha'>
                <SearchBar className="search-bar" toggleBuscar={toggleBuscar} />
                <img className='caca' src={ profile?.image} alt="user" />
            </div>

            <div className='div-derecha-desktop'>
                <SearchBar toggleBuscar={toggleBuscar} />
                <span className='niños'>Niños</span>
                <img className='caca' src={ profile?.image} alt="user" />
                <small>🔻</small>
            </div>
        </nav>
    )
}
