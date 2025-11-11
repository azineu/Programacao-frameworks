import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function MovieList() {
  const [movies, setMovies] = useState([]);

  async function fetchMovies() {
    try {
      const response = await api.get('/movies');
      setMovies(response.data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      alert('Não foi possível conectar ao servidor. Verifique se o backend está rodando e tente novamente.');
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja excluir este filme?')) {
      try {
        await api.delete(`/movies/${id}`);
        fetchMovies(); // Recarrega a lista após a exclusão
      } catch (error) {
        console.error('Failed to delete movie', error);
        alert('Erro ao excluir filme.');
      }
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Lista de Filmes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map(movie => (
          <div key={movie.id} className="bg-white p-4 rounded shadow flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold">{movie.title}</h2>
              <p>Gênero: {movie.genre}</p>
              <p>Faixa Etária: {movie.age_rating}</p>
              <p className="font-semibold mt-2">Atores:</p>
              <ul className="list-disc list-inside">
                {movie.actors && movie.actors.map(actor => (
                  <li key={actor.id}>{actor.name}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end mt-4">
              <Link to={`/edit/${movie.id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2">
                Editar
              </Link>
              <button onClick={() => handleDelete(movie.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;