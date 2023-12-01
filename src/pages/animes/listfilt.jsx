import React, { useState, useEffect } from 'react';

const ListaAnime = () => {
  const [data, setData] = useState([]);
  const [filtroLetra, setFiltroLetra] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await fetch(`${import.meta.env.PUBLIC_ANIMEAPI}/animes?sort=Titulo:asc`);
        const { data } = await respuesta.json();
        setData(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const filtrarAtributosLetra = (letra) => {
    setFiltroLetra(letra);
  };

  return (
    <>
      <div className="py-6 relative pl-6 pr-6">
        <div className="container mx-auto px-8 rounded-md text-center">
          <div className="flex flex-wrap justify-center space-x-2 mb-4">
            {/* Botones para cada letra del abecedario con estilos Tailwind */}
            <button
              onClick={() => filtrarAtributosLetra('0-9')}
              className="bg-slate-900 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mb-2 md:mb-0"
            >
              #
            </button>
            {Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)).map((letra) => (
              <button
                key={letra}
                onClick={() => filtrarAtributosLetra(letra)}
                className="bg-slate-900 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mb-2 md:mb-0"
              >
                {letra}
              </button>
            ))}
          </div>

          {data
            .filter((anime) => {
              if (filtroLetra === '0-9') {
                // Filtrar por números
                return anime.attributes.Titulo.match(/^\d/);
              } else {
                // Filtrar por letra seleccionada
                return anime.attributes.Titulo.startsWith(filtroLetra);
              }
            })
            .map((anime) => (
              <a href={`/animes/${anime.attributes.url}`} key={anime.id}>
                <h3 className="m-2">
                  ✔️ {anime.attributes.Titulo} - {anime.attributes.resolucion}
                </h3>
              </a>
            ))}
        </div>
      </div>
    </>
  );
};

export default ListaAnime;
