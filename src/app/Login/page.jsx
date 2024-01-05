'use client'
import { useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Inicio() {



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



  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  async function singIn(email, password, e) {
    e.preventDefault()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })

      })
      if (res.status === 204) {
        window.location.href = '/selectUser'
      } else if (res.status === 401) {
        const data = await res.json()
        showSwal(data.message)
      }
    }
    catch (error) {
      console.log('error al realizar la solicitud');
    }
  }


  return (
    <section className='contenedor-inicio'>
      <div className='color-fondo'>
        <h1><img className='logo' alt="" /></h1>
        <div className='contenedor-sesion'>
          <div className='formulario-sesion'>
            <h2>Inicia sesión</h2>
            <form className='form-sesion' onSubmit={(e) => { singIn(email, password, e) }} >
              <input className='input-sesion'
                type="email" placeholder='Correo electronico'
                onChange={(e) => setEmail(e.target.value)}
              />

              <input className='input-sesion'
                type="password" placeholder='Contraseña'
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className='button-sesion' type='submit'>Iniciar sesión</button>
            </form>
            <div className='contenedor-form'>

              <div>
                <input id='checkbox' type="checkbox" />
                <label htmlFor="checkbox">Recuerdame</label>
              </div>
              <p>¿Necesitas ayuda?</p>
            </div>
            <div className='form-anuncio'>¿Primera vez en Netflix?<a href="/">Suscribite ahora.</a></div>
          </div>
        </div>
      </div>
    </section>
  )
}
