import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import { db, storage } from "../firebaseConfig/firebase"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Atras from './Atras'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Edit = () => {
  const [ nombre, setNombre ] = useState('')
  const [ descripcion, setDescripcion ] = useState('') 
  const [ categoria, setCategoria ] = useState('') 
  const [ precio, setPrecio ] = useState('') 
  const [ talle, setTalle ] = useState([]) 
  const [ color, setColor ] = useState('') 
  const [ imagen, setImagen ] = useState([]) /* almaceno URL de la imagen*/
  const [ imagenArchivo, setImagenArchivo ] = useState([]) /* almaceno archivos subidos (imagenes) */

  const navigate = useNavigate()
  const {id} = useParams()
  const articulo = doc(db, "articulos", id)

    const handleSubirImagenes = async () => {
        const promises = imagenArchivo.map(async (imagenArchivo) => {
            try {
                if(imagenArchivo) {
                    const storageRef = ref(storage, `imagen/${imagenArchivo.name}`);
                    await uploadBytes(storageRef, imagenArchivo);
                    const imageURL = await getDownloadURL(storageRef);
                    console.log("Imagen subida correctamente")
                    return imageURL;            
                } else {
                    console.log("Error al guardar la imagen") 
                    return null
                }  
            } catch (error) {
                console.error("Error al subir la imagen", error)
                return null
            }
        });
        const imageURLs = await Promise.all(promises);
        setImagen(imageURLs.filter((url) => url !== null));
    };

    const actualizar = async () => {
        /* e.preventDefault() */
        await handleSubirImagenes(); //que se suban antes de actualizar
        const data = {
            nombre: nombre, 
            descripcion: descripcion, 
            categoria: categoria, 
            precio: precio, 
            talle: talle, 
            color: color, 
            imagen: imagen, 
        }
        navigate('/') 
        await updateDoc(articulo, data)
        console.log("articulo actualizado")
    }
    const confirmarActualizar = async () => {
        const result = await MySwal.fire({
            title: 'Seguro que desea estos cambios?',
            text: 'No se podrán recuperar',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Guardar cambios',
        });
        if (result.isConfirmed) {
            await actualizar();
            MySwal.fire('Producto editado!');
            console.log("producto actualizado")
        } else {
            console.error("Error al actualizar")
        }
    };
    
    const obtenerPorId = async (id) => { 
        try {
            const art = await getDoc(articulo)
            if(art.exists()) {
            const articuloData = art.data()
            setNombre(articuloData.nombre)
            setDescripcion(articuloData.descripcion)
            setCategoria(articuloData.categoria)
            setPrecio(articuloData.precio)
            setTalle(articuloData.talle || {})
            setColor(articuloData.color)
            setImagen(articuloData.imagen || {})
                /* setImagenArchivo(articuloData.imagenArchivo) */
            } else {
            console.log("Producto no existe")
            }
        } catch (error) {
            console.error("Error al obtener producto por ID", error)
        }
        
    }

    useEffect( () => {
    obtenerPorId(id)
    }, [])

  return (
    <>
        <Atras/>
        <form className="flex justify-center bg-crema sm:mx-0 :mx-40 lg:mx-96 mt-8 rounded-lg drop-shadow-2xl">      {/* onSubmit={confirmarActualizar} */}
            <div className="form-control w-full max-w-xs mt-8">
                <h1 className='text-center font-bold text-xl'>Editando articulo</h1>
                
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
                    className="input input-bordered w-full max-w-xs" 
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
                    <option>Remeras</option>
                    <option>Camperas</option>
                    <option>Shorts</option>
                    <option>Pantalones</option>
                </select>
                {/* PRECIO */}
                <label className="label">
                    <span className="label-text">Ingresar precio</span>
                </label>
                <input 
                    value={precio}
                    onChange={ (e) => setPrecio(e.target.value)}
                    type="number" 
                    placeholder="$" 
                    className="input input-bordered w-full max-w-xs" 
                />
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
                    type="file" 
                    className="file-input file-input-bordered file-input-accent w-full max-w-xs" 
                    onChange={ (e) => setImagenArchivo(Array.from(e.target.files))}
                    multiple
                />
                <button type="button" className="btn btn-active btn-ghost m-4" onClick={handleSubirImagenes} >Subir Imagen</button>
    
                {/* MOSTRAR IMAGENES SUBIDAS */}
                {imagen.length > 0 && (
                    <div className='grid grid-cols-3 gap-2'>
                        {imagen.map((url, id) => (
                            <div className='w-20'>
                            <img src={url} alt={`Imagen ${id}`} className='rounded-xl'/>
                        </div> 
                        ))}
                    </div>
                )}
                <button type='button' onClick={confirmarActualizar} className="btn btn-success m-8">
                    Guardar cambios
                </button>
            </div>
        </form>
    </>
  )
}

export default Edit