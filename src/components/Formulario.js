import React from "react";
import { useState } from "react";
import Error from "./Error";

const Formulario = ({ guardarBusqueda }) => {
  // --------------------
  // Helpers
  // --------------------
  const buscarImagenes = e => {
    e.preventDefault();
    if (!termino.trim()) {
      guardarError(true);
      return;
    }
    guardarBusqueda(termino);
    guardarTermino("");
  };

  // --------------------
  // Hooks
  // --------------------
  const [termino, guardarTermino] = useState("");
  const [error, guardarError] = useState(false);

  // --------------------
  // Main Component
  // --------------------
  return (
    <form onSubmit={buscarImagenes}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: fútbol o café"
            onChange={({ target: { value } }) => guardarTermino(value)}
            value={termino}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error && <Error mensaje="Agrega un término de búsqueda" />}
    </form>
  );
};

export default Formulario;
