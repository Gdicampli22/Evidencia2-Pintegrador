import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProductos(response.data.products);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
       <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">Lista de Productos</h1>
      {productos.map((producto) => (
        <div key={producto.id} className="border p-4 rounded-md">
          <h2 className="text-lg font-semibold">{producto.title}</h2>
          <p>Precio: ${producto.price}</p>
          {/* Agrega más detalles del producto aquí */}
        </div>
      ))}
    </div>
  );
}

export default App;
