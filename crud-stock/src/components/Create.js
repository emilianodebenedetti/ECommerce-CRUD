import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db, storage } from '../firebaseConfig/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Atras from './Atras'


const Create = () => {
    const [ nombre, setNombre ] = useState('') 
    const [ descripcion, setDescripcion ] = useState('') 
    const [ categoria, setCategoria ] = useState('') 
    const [ precio, setPrecio ] = useState('') 
    const [ talle, setTalle ] = useState([]) 
    const [ color, setColor ] = useState('') 
    const [ imagen, setImagen ] = useState([])/* almaceno URL de la imagen*/
    const [ imagenArchivo, setImagenArchivo ] = useState([]) /* almaceno archivos subidos (imagenes) */
    
    const navigate = useNavigate()
    const productsCollection = collection(db, "articulos") //base de datos


    /* Funcion para guardar imagen en firebase storage*/
    const handleGuardarImagen = async () => {
        const promises = imagenArchivo.map(async (imagenArchivo) => {
            if (imagenArchivo) {
                const storageRef = ref(storage, `imagen/${imagenArchivo.name}`);
                await uploadBytes(storageRef, imagenArchivo);
                const imageURL = await getDownloadURL(storageRef); 
                return imageURL
            } else {
                console.log("Error al guardar imagen")
            }
            return null
        })
        const imageURLs = await Promise.all(promises)
        setImagen(imageURLs.filter((url) => url !== null)) 
    }    
    
    const limpiarInput = () => {
        document.getElementById('imagen-input').value = '' //limpio campo de archivos
    }

    const handleSubirImagen = (e) => {
       const archivos = e.target.files
       if (archivos) {
        setImagenArchivo(Array.from(archivos)) //
        console.log("Imagen subida")
       } else {
        console.error("Error al subir archivo", )
       }
    }

    /* ALMACENAMOS LOS VALORES DEL FORM */
    const almacenar = async (e) => {
        e.preventDefault()
        if (!nombre || !descripcion || !categoria || !precio || !talle || !color || imagenArchivo.length === 0) {
            console.error("Todos los campos son obligatorios");
            return
        }

        await handleGuardarImagen()

        await addDoc( productsCollection, { 
            nombre: nombre, 
            descripcion: descripcion, 
            categoria: categoria, 
            precio: precio, 
            talle: talle, 
            color: color, 
            imagen: imagen,
            /* imagenArchivo: imagenArchivo, */
        })
        navigate('/home')  
    }

    return (
        <>
            <Atras />
            <form onSubmit={almacenar} className="flex justify-center bg-crema lg:mx-96 mt-8 rounded-lg drop-shadow-2xl">
            
                <div className="form-control w-full max-w-xs mt-8">
                    <h1 className='text-center font-bold text-xl'>Creando nuevo producto</h1>
                    
                    {/* NOMBRE */}
                    <label className="label">
                        <span className="label-text">Ingresar nombre del articulo</span>
                    </label>
                    <input 
                        value={nombre}
                        onChange={ (e) => setNombre(e.target.value)}
                        type="text" 
                        placeholder="Nombre del articulo" 
                        className="input input-bordered w-full max-w-xs" 
                    />

                    {/* DESCRIPCION */}
                    <label className="label">
                        <span className="label-text">Ingresar descripcion</span>
                    </label>
                    <textarea 
                        value={descripcion}
                        onChange={ (e) => setDescripcion(e.target.value)}
                        type="text" 
                        placeholder="Descripcion" 
                        className="input textarea-bordered w-full max-w-xs" 
                    />

                    {/* CATEGORIA */}
                    <label className="label">
                        <span className="label-text">Ingresar categoria</span>
                    </label>
                    <select
                        value={categoria}
                        onChange={ (e) => setCategoria(e.target.value)}
                        type="text" 
                        placeholder="Categoria" 
                        className="input input-bordered w-full max-w-xs" 
                        required
                    >
                        <option>Seleccionar</option>
                        <option>Calzas</option>
                        <option>Abrigos</option>
                        <option>Musculosas&Remeras</option>
                        <option>Tops</option>
                        <option>Biker&Shorts</option>
                    </select>

                    {/* PRECIO */}
                    <label className="label">
                        <span className="label-text">Ingresar precio</span>
                    </label>
                    <label className="input-group">
                        <span>$</span>
                        <input 
                            value={precio}
                            onChange={ (e) => setPrecio(e.target.value)}
                            type="number" 
                            placeholder="Precio en pesos" 
                            className="input input-bordered w-full max-w-xs" 
                        />
                    </label>

                    {/* TALLE */}
                    <label className="label">
                        <span className="label-text">Ingresar talle (separado por comas)</span>
                    </label>
                    <input 
                        value={talle}
                        onChange={(e) => setTalle(e.target.value.split(','))} // Dividir la entrada en un array
                        type="text"
                        placeholder="Talle"
                        className="input input-bordered w-full max-w-xs"
                    />

                    {/* COLOR */}
                    <label className="label">
                        <span className="label-text">Ingresar color</span>
                    </label>
                    <input 
                        value={color}
                        onChange={ (e) => setColor(e.target.value)}
                        type="text" 
                        placeholder="Color" 
                        className="input input-bordered w-full max-w-xs" 
                    />

                    {/* IMAGENES */}
                    <label className="label">
                        <span className="label-text">Selecciona imágen/es del producto</span>
                    </label>
                    <input
                        accept='image/*'
                        onChange={handleSubirImagen} 
                        type="file" 
                        className="file-input file-input-bordered file-input-accent w-full max-w-xs" 
                        multiple
                        id='imagen-input'
                    />
                    <button type="button" className="btn btn-active btn-ghost m-4" onClick={handleGuardarImagen}>Subir Imagen</button>
                    {/* <button type="button" className="btn btn-active btn-ghost m-4" onClick={limpiarInput}>
                        Limpiar
                    </button> */}
                    
                    {/* MOSTRAR IMAGENES SUBIDAS */}
                    {imagen.length > 0 && (
                        <div className='grid grid-cols-3 gap-2'>
                            {imagen.map((url, id) => (
                               <div className='w-20 '>
                                <img key={id} src={url} alt={`Imagen ${id}`} className='rounded-xl'/>
                               </div> 
                            ))}
                        </div>
                    )}

                    <button type='submit' className="btn btn-success m-8">
                        Crear producto
                    </button>
                </div>
            </form>
        </>
    )
}

export default Create