import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase' 
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Show = () => {
  const [products, setProducts] = useState( [] ) //hooks para traer articulos
  const [busqueda, setBusqueda] = useState('') //seteo estado para buscador de articulos
  const [categoria, setCategoria] = useState('') //Estado para categoria seleccionada

  const productsCollection = collection(db, "articulos") //referenciamos la DB firestore
    
  //listo todos los articulos
  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    setProducts( 
      data.docs.map ( (doc) => ( {...doc.data(), id:doc.id}))
    )
  }

  //funcion de busqueda
  const buscarProductos = async () => {
    const data = await getDocs(productsCollection);
    
    let filteredProducts = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((product) =>
        product.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
      //filtramos por categoria
      if (categoria) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoria === categoria //filtramos producto con categoria igual a la de nuestro input
        )
      }
    setProducts(filteredProducts);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(productsCollection);
      setProducts(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    fetchData();
  }, []); // Se ejecuta al montar el componente
  useEffect(() => {
    buscarProductos();
  }, [busqueda]);

  const handleCategoryFilter = (categoria) => {
    setCategoria(categoria);
    buscarProductos();
  };

  //funcion para eliminar un DOC
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "articulos", id)
    await deleteDoc(productDoc)
    getProducts()
  }
  //funcion de confirmacion para sweet alert 2
    const confirmDelete = (id) => {
      MySwal.fire({
        title: 'Seguro que desea eliminar este producto?',
        text: "No podras recuperarlo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor:'#3085d6',
        confirmButtonText: 'Eliminar',
    }).then((result) => {
      if(result.isConfirmed) {
        //llamamos a la funcion de eliminar
        deleteProduct(id)
        Swal.fire(
          'Producto eliminado!',
       )
      }
    })
  }
  useEffect( () => {
      getProducts()
  }, [])

  return (
    <>
      <div className="overflow-x-auto">
        
        <div className='m-4 lg:mx-20 p-4 flex justify-between'>
          <div className="flex gap-2">
            {/* boton buscar producto */} 
            <div className='input-group'>
              <input 
                type="text" 
                placeholder="Buscar articulo" 
                className="input bg-negro" 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button className="btn btn-square" onClick={() => buscarProductos()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>

            {/* boton para filtros */}
            <div className="dropdown">
              <label tabIndex={0} className="btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M15 17h3v-3h2v3h3v2h-3v3h-2v-3h-3v-2m-2 2.88c.04.3-.06.62-.28.83c-.4.39-1.03.39-1.42 0L7.29 16.7a.989.989 0 0 1-.29-.83v-5.12L2.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L13 10.75v9.13M5.04 5L9 10.07v5.51l2 2v-7.53L14.96 5H5.04Z"/></svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <li>Filtrar por categorias:</li>
                  <ul className="p-2">
                    <li onClick={() => handleCategoryFilter('Remeras')}><a>Remeras</a></li>
                    <li onClick={() => handleCategoryFilter('Camperas')}><a>Camperas</a></li>
                    <li onClick={() => handleCategoryFilter('Pantalones-Shorts')}><a>Pantalones / Shorts</a></li>
                    <li onClick={() => handleCategoryFilter('Championes')}><a>Championes</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        
          {/* boton agregar producto */}
          <div>
            <Link to={`/create`} className='btn'>Agregar articulo</Link>
          </div>
        </div>
        
        <div className='rounded-lg bg-crema sm:m-0 lg:p-8 lg:mx-24'> {/* ajustar margin para cel, dejar en 0 */}
          <table className="table table-xs">
            {/* //Cabezales */}
            <thead>
              <tr>
                <th>Nombre</th> 
                <th>Descripcion</th> 
                <th>Categoria</th> 
                <th>Precio</th> 
                <th>Talle</th> 
                <th>Color</th>
                <th>Imagen</th>
                <th>Accion</th>
              </tr>
            </thead> 
            <tbody>
                {products
                  .sort((a, b) => a.nombre.localeCompare(b.nombre)) 
                  .map ( (product) => (
                    <tr key={product.id}>
                    <th>{product.nombre}</th> 
                    <th>{product.descripcion}</th> 
                    <th>{product.categoria}</th> 
                    <th>$ {product.precio}</th> 
                    <th>{product.talle}</th> 
                    <th>{product.color}</th> 
                    <th><img src={product.imagen} width="50px" alt='Imagen'/></th> 
                    <th>
                      <Link to={`/edit/${product.id}`}><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 256 256"><path fill="currentColor" d="m227.31 73.37l-44.68-44.69a16 16 0 0 0-22.63 0L36.69 152A15.86 15.86 0 0 0 32 163.31V208a16 16 0 0 0 16 16h44.69a15.86 15.86 0 0 0 11.31-4.69L227.31 96a16 16 0 0 0 0-22.63ZM51.31 160L136 75.31L152.69 92L68 176.68ZM48 179.31L76.69 208H48Zm48 25.38L79.31 188L164 103.31L180.69 120Zm96-96L147.31 64l24-24L216 84.68Z"/></svg></Link>
                      <button onClick={ () => { confirmDelete(product.id) } }><svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg></button> 
                    </th>                
                    </tr>
              ))} 
            </tbody>             
            </table>
        </div>
      </div>
    </>
  )
}

export default Show