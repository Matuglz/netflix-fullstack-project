'use client'

import { useEffect, useState } from "react";
import Loader from "../componets/loader/Loader";
import './page.css'
export default function selectUser() {

    const [user, setUser] = useState(null)
    const [profileImgs, setProfileImages] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                if (res.status === 201) {
                    const data = await res.json()
                    setUser(data.user)
                }
            }
            catch {
                console.log('error al consultar sesion');
            }
        }

        async function fetchProfileImages() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/userPictures`, {
                    method: 'GET',
                    credentials: 'include'
                })
                if (res.status === 200) {
                    const data = await res.json()
                    setProfileImages(data.images)
                }
            }
            catch {
                console.log('error al consultar sesion');
            }
        }
        fetchData()
        fetchProfileImages()
    }, [])

    async function sendProfile(profile){
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/selectedProfile`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({profile})
        })

        if(res.status === 201){
            setUser(null)
            window.location.href = '/Home'
        }else{
            console.log('error al realizar la peticion');
        }

    }

    return (
        <div>
            {!user ?
                <Loader />
                :
                <div className="profilesPage">
                    <h2>¿Quién está viendo ahora?</h2>
                    <div className="profilesContainer">
                    {
                        user.profiles.map((p) => {
                            return (
                                <div onClick={()=>{sendProfile(p)}} className="profile" key={p._id}>
                                    <img src={p.image} alt={p.name}/>
                                    <small>{p.name}</small>
                                </div>
                            )
                        })}
                        </div>
                    <a className="aManageProfiles" href="/ManageProfiles">Administrar perfiles</a>
                </div>
            }
        </div>
    )
}