'use client'

import { useEffect, useState } from "react"
import Loader from "../componets/loader/Loader"
import './page.css'

export default function ManageProfiles() {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [edit, setEdit] = useState(false)

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
        fetchData()
    }, [])


    function sendEditProfile(p){
        setProfile(p)
        setEdit(true)
        console.log(p);
    }

    return (
        <div className="background_manage_profiles">
            {!user ?
                <Loader />
                : edit == false ?
                <div className="manage_profilesPage">
                    <h2>Administrar perfiles:</h2>
                    <div className="manage_profilesContainer">
                        {
                            user.profiles.map((p) => {
                                return (
                                    <div onClick={() => { sendEditProfile(p) }} className="manage_profile" key={p._id}>
                                        <div className="profile_wrapper">
                                            <div className="avatar_profile" style={{ backgroundImage: `url('${p.image}')` }}>
                                            </div>
                                            <div className="svg_edit">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-mirrorinrtl="true" className="svg-icon svg-icon-edit ltr-4z3qvp e1svuwfo1" data-name="Pencil" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M19.1213 1.7071C17.9497 0.535532 16.0503 0.53553 14.8787 1.7071L13.2929 3.29289L12.5858 4L1.58579 15C1.21071 15.3751 1 15.8838 1 16.4142V21C1 22.1046 1.89543 23 3 23H7.58579C8.11622 23 8.62493 22.7893 9 22.4142L20 11.4142L20.7071 10.7071L22.2929 9.12132C23.4645 7.94975 23.4645 6.05025 22.2929 4.87868L19.1213 1.7071ZM15.5858 7L14 5.41421L3 16.4142L3 19C3.26264 19 3.52272 19.0517 3.76537 19.1522C4.00802 19.2527 4.2285 19.4001 4.41421 19.5858C4.59993 19.7715 4.74725 19.992 4.84776 20.2346C4.94827 20.4773 5 20.7374 5 21L7.58579 21L18.5858 10L17 8.41421L6.70711 18.7071L5.29289 17.2929L15.5858 7ZM16.2929 3.12132C16.6834 2.73079 17.3166 2.73079 17.7071 3.12132L20.8787 6.29289C21.2692 6.68341 21.2692 7.31658 20.8787 7.7071L20 8.58578L15.4142 4L16.2929 3.12132Z" fill="currentColor"></path></svg>
                                            </div>
                                        </div>
                                        <small>{p.name}</small>
                                    </div>
                                )
                            })}
                    </div>
                    <a className="aManageProfiles_ready" href="/selectUser">Listo</a>
                </div> : <div> pitoooo</div>
            }
        </div>
    )
}