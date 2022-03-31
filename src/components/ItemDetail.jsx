import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

import ItemCount from './ItemCount'

const ItemDetail = ({ productDetail }) => {

    const { id, nombre, cover, stock = 5, precio, editorial, categoria } = productDetail

    const { cart, addItem, isInCart } = useContext(CartContext)


    const navigate = useNavigate()
    const handleNavigate = () => { navigate(-1) }


    const [compra, setCompra] = useState(1)

    const agregarAlCarrito = () => {

        const ItemToAdd = {
            nombre,
            editorial,
            cover,
            precio,
            compra
        }

        addItem(ItemToAdd)
    }


    return (

        <div className='d-flex flex-column align-items-center justify-content-center'>

            <div className="card text-dark" style={{ width: "700px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={cover} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h4 className="card-title text-uppercase fw-bold">
                                {nombre}
                            </h4>
                            <div className='mt-4'>
                                <p className='card-text'>Categoría: {categoria}</p>
                                <p className='card-text'>Editorial: {editorial}</p>
                                <p className="card-text">Precio: ${precio}</p>
                                <p className="card-text">Stock disponible: {stock} unidades</p>
                            </div>
                        </div>

                        {
                            !isInCart(nombre) ?
                                <ItemCount
                                    compra={compra}
                                    stock={productDetail.stock}
                                    setCompra={setCompra}
                                    agregarAlCarrito={agregarAlCarrito}
                                />
                                :

                                <div className='mt-3'>
                                    <Link to="/">
                                        <button className='btn mx-2 btn-sm btn-warning'>Continuar comprando</button>
                                    </Link>
                                    <Link to="/cart">
                                        <button className='btn mx-2 btn-sm btn-primary'>Terminar compra</button>
                                    </Link>
                                </div>
                        }


                    </div>

                </div>

            </div>

            <div className='mt-5'>
                <button onClick={handleNavigate} className='m-2 mb-5 btn btn-primary'>
                    Volver
                </button>
                <Link to="/" ><button className='m-2 mb-5 btn btn-primary'>
                    Ir a la Home
                </button></Link>
            </div>

        </div>

    )
}

export default ItemDetail