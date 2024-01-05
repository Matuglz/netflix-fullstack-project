'use client'
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './page.css'
import MembershipForm from "./componets/MembershipForm/MembershipForm"

// const MySwal = withReactContent(Swal)

let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

const showSwal = (msj) => {
    const toast = withReactContent(Swal).mixin({
        toast: true,
        position: 'top-end',
        iconColor: 'red',
        background: '#f27474',
        showConfirmButton: false,
        timer: 1500,
    })
    toast.fire({
        title: msj,
    })
}
export default function singUp() {

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                if (res.status === 201) {
                    window.location.href = '/selectUser'
                }else{
                    const data = await res.json()
                    console.log(data.message);
                }
            }
            catch {
                console.log('error al consultar sesion');
            }
        }
        fetchData()
    }, [])

    async function checkInputs(email, password, e) {

        e.preventDefault()
        const isValidPassword = password.length >= 8

        if (!isValidPassword) {
            return showSwal('La contraseña debe tener minimo 8 caracteres')
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/checkEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            })
            if (res.status === 201) {
                toMember()
            } else if (res.status === 401) {
                showSwal('Email ya registrado')
            }
        }
        catch (error) {
            console.log('error al realizar la solicitud');
        }
    }


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    function handleEmail(e) {
        setEmail(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }

    function hiddenForm1(e) {
        e.preventDefault()
        try {
            if (emailRegex.test(email)) {
                let divForms = document.querySelectorAll('article')
                e.preventDefault()
                divForms[0].classList.add('hidden')
                divForms[1].classList.remove('hidden')
            } else {
                throw new Error('Email invalido')
            }
        }
        catch (error) {
            showSwal(error.message)
        }
    }

    function preForm1() {
        let divForms = document.querySelectorAll('article')
        divForms[0].classList.remove('hidden')
        divForms[1].classList.add('hidden')
    }

    function toMember() {
        document.querySelector('#singUpSectionFilter').classList.add('hidden')
        document.querySelector('#memberSection').classList.remove('hidden')

    }



    return (
        <section className="singUpSection">
            <div id="singUpSectionFilter" className="singUpSectionFilter">
                <nav className="home-nav">
                    <img className="netflix-logo" src='https://cacaaaaaaaaaaaaaaa.s3.sa-east-1.amazonaws.com/logo-netflix.png' alt="netflix logo" />
                    <a href="/Login" className="login-button">Iniciar sesion</a>
                </nav>
                <div className="forms-div">
                    <section className="text-section">
                        <h2>Películas y series ilimitadas y mucho más</h2>
                        <p>Disfruta donde quieras. Cancela cuando quieras.</p>
                        <small>¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix.</small>
                    </section>
                    <article>
                        <form onSubmit={hiddenForm1} className="emailForm">
                            <input type="email" placeholder="Email" name="email" id="Email" value={email} onChange={handleEmail} />
                            <button type="submit">Comenzar</button>
                        </form>
                    </article>
                    <article className="hidden">
                        <form onSubmit={(e) => { checkInputs(email, password, e) }} className="passwordForm">
                            <a className="back-form-button" onClick={preForm1}>←</a>
                            <input type="password" placeholder="Agrega una contraseña" name="password" id="password" value={password} onChange={handlePassword} />
                            <button type="submit"> Siguiente</button>
                        </form>
                    </article>
                </div>
            </div>
            <div id="memberSection" className="memberSection hidden">
                <MembershipForm email={email} password={password} />
            </div>
        </section>
    )
}