import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function MovieForm() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [ageRating, setAgeRating] = useState('');
  const [actors, setActors] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      api.get(`/movies/${id}`).then(response => {
        setTitle(response.data.title);
        setGenre(response.data.genre);
        setAgeRating(response.data.age_rating);
        if (response.data.actors) {
          setActors(response.data.actors.map(actor => actor.name).join(', '));
        }
      });
    }
  }, [id, isEditing]);

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Título é obrigatório';
    if (!genre) newErrors.genre = 'Gênero é obrigatório';
    if (!ageRating) newErrors.ageRating = 'Faixa etária é obrigatória';
    if (ageRating && isNaN(ageRating)) newErrors.ageRating = 'Faixa etária deve ser um número';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const actorsArray = actors.split(',').map(name => name.trim()).filter(name => name);

    const movieData = { 
      title, 
      genre, 
      age_rating: Number(ageRating),
      actors: actorsArray
    };

    try {
      if (isEditing) {
        await api.put(`/movies/${id}`, movieData);
      } else {
        await api.post('/movies', movieData);
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save movie', error);
      alert('Erro ao salvar filme. Verifique o console para mais detalhes.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">{isEditing ? 'Editar Filme' : 'Cadastrar Filme'}</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Título</label>
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          className={`w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded mt-1`}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Gênero</label>
        <input 
          type="text" 
          value={genre} 
          onChange={e => setGenre(e.target.value)} 
          className={`w-full p-2 border ${errors.genre ? 'border-red-500' : 'border-gray-300'} rounded mt-1`}
        />
        {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Faixa Etária</label>
        <input 
          type="text" 
          value={ageRating} 
          onChange={e => setAgeRating(e.target.value)} 
          className={`w-full p-2 border ${errors.ageRating ? 'border-red-500' : 'border-gray-300'} rounded mt-1`}
        />
        {errors.ageRating && <p className="text-red-500 text-sm">{errors.ageRating}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Atores (separados por vírgula)</label>
        <input 
          type="text" 
          value={actors} 
          onChange={e => setActors(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Salvar
      </button>
    </form>
  );
}

export default MovieForm;