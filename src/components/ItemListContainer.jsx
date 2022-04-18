import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// Firebase
import { collection, getDocs, query, where} from "firebase/firestore"
import { db } from "../firebase/config"
// Componentes
import ItemList from './ItemList'
import Cargando from './Cargando'
import SearchForm from './SearchForm'
// Estilos
import '../styles/Catalogo.scss'
import BotonesHomeNavigation from './BotonesHomeNavigation'


const ItemListContainer = () => {

    const [listaProductos, setListaProductos] = useState([])

    const [cargando, setCargando] = useState(false)

    const {categoryId} = useParams()

    useEffect(() => {
        setCargando(true)

        const productosRef = collection(db, "productos")

        const q = categoryId ? query(productosRef, where('categoria', '==', categoryId)) : productosRef
        

        getDocs(q)
            .then( res => {
                let items = res.docs.map( (doc) => (
                    { 
                        id: doc.id,
                        ...doc.data()
                    }
                ))
                
                items = items.sort( (a, b) => {
                    if (a.nombre < b.nombre) { return -1 }
                    if (a.nombre > b.nombre) { return 1 }
                    return 0;
                })
                
                setListaProductos(items)
            })
            .catch( (err) => {console.log(err)} ) 
            .finally( () => setCargando(false) )

    }, [categoryId])


    // Search Form
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const [search, setSearch] = useState('')


    return (
        <div className='container'>
            <h3 className='catalogo-titulo fs-1'>
                {categoryId ? `Catálogo de ${categoryId}` : 'Catálogo de Productos'}
            </h3>

            <SearchForm 
                handleSubmit={handleSubmit} 
                handleChange={handleChange}
            />

            {
                cargando
                ? <Cargando /> 
                : <ItemList listaProductos={listaProductos} search={search} />
            }

            <BotonesHomeNavigation />
        </div>
    )
}

export default ItemListContainer