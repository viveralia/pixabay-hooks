import React from "react";

const Imagen = ({ imagen }) => {
  const { largeImageURL, likes, tags, views, previewURL } = imagen;
  return (
    <div className="col-6 col-md-3 mb-4">
      <article className="card">
        <img className="card-img-top" src={previewURL} alt={tags} />
        <div className="card-body">
          <p className="card-text">{likes} Me Gusta</p>
          <p className="card-text">{views} Vistas</p>
        </div>
        <div className="card-footer">
          <a
            title="Ver imagen"
            href={largeImageURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Imagen
          </a>
        </div>
      </article>
    </div>
  );
};

export default Imagen;
