import { useEffect, useState } from "react";
import axios from "axios";
import ListaProductos from "./componentes/ListaProductos";
import PanelEstadisticas from "./componentes/PanelEstadisticas";
import './App.css';


function App() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios.get("https://dummyjson.com/products")
      .then((respuesta) => {
        setProductos(respuesta.data.products);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  const productosFiltrados = productos.filter(producto =>
    producto.title.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">Tienda de Productos</h1>

      <input
        type="text"
        className="border p-2 w-full md:w-1/2 mb-6"
        placeholder="Buscar producto por título..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      {cargando ? (
        <p className="text-center">Cargando productos...</p>
      ) : (
        <>
          <PanelEstadisticas productos={productosFiltrados} />
          <ListaProductos productos={productosFiltrados} />
        </>
      )}
    </div>
  );
}

export default App;
