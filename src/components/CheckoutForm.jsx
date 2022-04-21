import React from 'react'

const CheckoutForm = ({props}) => {

    const {
        handleChange,
        handleSubmit,
        values,
        errorMsg, 
        differentEmail,
        comprando
    } = props

    return (

        <form
            onSubmit={handleSubmit}
            className='form-control d-flex flex-column justify-content-around'
            style={{ minHeight: '12rem', maxWidth: '18rem' }}
        >

            <input
                type="text"
                placeholder='Ingresá tu nombre'
                className='form-control my-2'
                value={values.nombre}
                onChange={handleChange}
                name='nombre'
            />
            {
                errorMsg && <small><i className="bi bi-x-lg"></i> Campo obligatorio</small>
            }

            <input type="email"
                placeholder='Ingresá tu mail'
                value={values.email}
                onChange={handleChange}
                name='email'
                className='form-control my-2'
            />
            {
                errorMsg &&
                <small>
                    <i className="bi bi-x-lg"></i> Campo obligatorio
                </small>
            }

            <input
                type="email"
                placeholder='Confirmá tu mail '
                value={values.emailconfirm}
                onChange={handleChange}
                name='emailconfirm'
                className='form-control my-2'
            />
            {
                differentEmail && <small><i className="bi bi-x-lg"></i> Los email no coinciden</small>
            }

            {/* no es un campo obligatorio */}
            <input
                type="tel"
                placeholder='Ingresá tu teléfono'
                value={values.tel}
                onChange={handleChange}
                name='tel'
                onKeyPress={(e) => { if (!/[0-9, +]/.test(e.key)) { e.preventDefault() } }}
                className='form-control my-2'
            />

            <div>
                <button
                    type='submit'
                    disabled={comprando}
                    className='btn btn-sm btn-success my-3'
                >
                    Finalizar compra
                </button>
            </div>
        </form>

    )
}

export default CheckoutForm