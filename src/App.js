import React, { useState } from "react";
import Formulario from "./components/Formulario";
import { useEffect } from "react";
import ListadoImagenes from "./components/ListadoImagenes";

const App = () => {
  // --------------------
  // Helpers 💁
  // --------------------
  const irPaginaAnterior = () => {
    if (paginaActual === 1) return;
    guardarPaginaActual(paginaActual - 1);
  };
  const irPaginaSiguiente = () => {
    if (paginaActual === totalPaginas) return;
    guardarPaginaActual(paginaActual + 1);
  };

  // --------------------
  // Hooks 🪝
  // --------------------
  const [busqueda, guardarBusqueda] = useState("");
  const [resultados, guardarResultados] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(paginaActual);

  useEffect(() => {
    const consultarApi = async () => {
      if (!busqueda) return;
      const imagenesPorPagina = 30;
      const key = process.env.REACT_APP_PIXABAY_KEY;
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
      const res = await fetch(url);
      const {
        hits: imagenesEncontradas,
        totalHits: imagenesTotales
      } = await res.json();
      // Resultados
      guardarResultados(imagenesEncontradas);
      // Paginación
      const calcularTotalPaginas = Math.ceil(
        imagenesTotales / imagenesPorPagina
      );
      guardarTotalPaginas(calcularTotalPaginas);
    };
    consultarApi();
  }, [busqueda, paginaActual]);

  // --------------------
  // Component View 🔎
  // --------------------
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
      {resultados && (
        <div className="row justify-content-center">
          <ListadoImagenes imagenes={resultados} />
          {paginaActual !== 1 && (
            <button
              type="button"
              className="btn btn-info mr-1"
              onClick={irPaginaAnterior}
            >
              &laquo; Anterior
            </button>
          )}
          {paginaActual !== totalPaginas && (
            <button
              type="button"
              className="btn btn-info"
              onClick={irPaginaSiguiente}
            >
              Siguiente &raquo;
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
