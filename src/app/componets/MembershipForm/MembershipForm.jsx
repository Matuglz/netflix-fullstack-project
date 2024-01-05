'use client'

import { useState } from 'react'
import './MembershipForm.css'


export default function MembershipForm({ email, password }) {

    let [selectedPlan, setSelectedPlan] = useState(0)

    function handleSelectedPlan(n, e) {
        e.preventDefault()
        setSelectedPlan(n)
    }



    async function sendRegister(e) {
        e.preventDefault()

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/singUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    membership: selectedPlan
                })

            })
            console.log('enviado');

            if (res.status === 201) {
                window.location.href = '/Login'
            } else if (res.status === 401) {
                console.log(await res.json());
            }
        }
        catch (error) {
            console.log('error', error)
        }
    }


    return (
        <div className='membership_container'>
            <nav className='membership_nav'>
                <img src="https://cacaaaaaaaaaaaaaaa.s3.sa-east-1.amazonaws.com/logo-netflix.png" alt="netflix logo" />
            </nav>
            <hr className='membership_hr' />
            <section className='plan_info_section'>
                <h2>Selecciona el plan ideal para ti</h2>
                <ul>
                    <li>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="checkmark-group--icon default-ltr-cache-4z3qvp e1svuwfo1" data-name="Checkmark" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg>
                        Ve todo lo que quieras. Sin anuncios.
                    </li>
                    <li>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="checkmark-group--icon default-ltr-cache-4z3qvp e1svuwfo1" data-name="Checkmark" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg>
                        Recomendaciones exclusivas para ti.
                    </li>
                    <li>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="checkmark-group--icon default-ltr-cache-4z3qvp e1svuwfo1" data-name="Checkmark" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg>
                        Puedes cambiar de plan o cancelar cuando quieras.
                    </li>
                </ul>
            </section>
            <div className="plan_grid">
                <table className='plan_table'>
                    <tbody className='plan_table_tbody'>
                        <tr role='row'>
                            <th></th>
                            <td>
                                <label
                                    htmlFor="plan_choice_0"
                                    className={`plan_grid_selector_choice ${selectedPlan == 0 ? 'selected' : ''}`}
                                    onClick={(e) => { handleSelectedPlan(0, e) }}
                                >
                                    <input id="plan_choice_0"
                                        type="radio"
                                        name="plan_choice"
                                        className="plan_grid_selector_input"
                                        // checked={selectedPlan === 0}
                                        value={0} />
                                    <span className="plan_grid_span">Básico</span>
                                </label>

                            </td>
                            <td>
                                <label
                                    htmlFor="plan_choice_1"
                                    className={`plan_grid_selector_choice ${selectedPlan == 1 ? 'selected' : ''}`}
                                    onClick={(e) => { handleSelectedPlan(1, e) }}>
                                    <input
                                        id="plan_choice_1"
                                        type="radio"
                                        name="plan_choice"
                                        className="plan_grid_selector_input"
                                        // checked={selectedPlan === 1}
                                        value={1} />
                                    <span className="plan_grid_span">Estándar</span>
                                </label>
                            </td>
                            <td>
                                <label
                                    htmlFor="plan_choice_2"
                                    className={`plan_grid_selector_choice ${selectedPlan == 2 ? 'selected' : ''}`}
                                    onClick={(e) => { handleSelectedPlan(2, e) }}>
                                    <input
                                        id="plan_choice_2"
                                        type="radio"
                                        name="plan_choice"
                                        className="plan_grid_selector_input"
                                        // checked={selectedPlan === 2}
                                        value={2} />
                                    <span className="plan_grid_span">Premium</span>
                                </label>
                            </td>
                        </tr>
                        <tr role="row" className='tr_tbody'>
                            <th>Precio mensual (sin impuestos incluidos)</th>
                            <td className={selectedPlan === 0 ? 'red' : ''}>$6.99</td>
                            <td className={selectedPlan === 1 ? 'red' : ''}>$15.49</td>
                            <td className={selectedPlan === 2 ? 'red' : ''}>$22.99</td>
                        </tr>
                        <tr role="row" className='tr_tbody'>
                            <th>Calidad de video</th>
                            <td className={selectedPlan === 0 ? 'red' : ''}>Buena</td>
                            <td className={selectedPlan === 1 ? 'red' : ''}>Mejor</td>
                            <td className={selectedPlan === 2 ? 'red' : ''}>Óptima</td>
                        </tr>
                        <tr role="row" className='tr_tbody'>
                            <th>Resolución</th>
                            <td className={selectedPlan === 0 ? 'red' : ''}>720p</td>
                            <td className={selectedPlan === 1 ? 'red' : ''}>1080p</td>
                            <td className={selectedPlan === 2 ? 'red' : ''}>4k + HDR</td>
                        </tr>
                        <tr role="row" className='tr_tbody'>
                            <th>Ve Netflix en tu TV, computadora, celular y tablet</th>
                            <td className={selectedPlan === 0 ? 'red' : ''}> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="checkmark-group--icon default-ltr-cache-4z3qvp e1svuwfo1" data-name="Checkmark" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg></td>
                            <td className={selectedPlan === 1 ? 'red' : ''}> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="checkmark-group--icon default-ltr-cache-4z3qvp e1svuwfo1" data-name="Checkmark" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg></td>
                            <td className={selectedPlan === 2 ? 'red' : ''}> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="checkmark-group--icon default-ltr-cache-4z3qvp e1svuwfo1" data-name="Checkmark" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg></td>
                        </tr>
                    </tbody>
                </table>
                <div className='plan_info'>
                    <small>La disponibilidad del contenido en HD (720p), Full HD (1080p), Ultra HD (4K) y HDR depende de tu servicio de internet y del dispositivo en uso. No todo el contenido está disponible en todas las resoluciones.</small>
                    <small>Solo las personas que vivan contigo pueden usar tu cuenta. Puedes ver Netflix en 4 dispositivos al mismo tiempo con el plan Premium, en 2 con el plan Estándar y en 1 con el plan Básico.</small>
                </div>
                <button className='create_account_btn' onClick={sendRegister}>Crear cuenta</button>
            </div>

        </div>
    )
}