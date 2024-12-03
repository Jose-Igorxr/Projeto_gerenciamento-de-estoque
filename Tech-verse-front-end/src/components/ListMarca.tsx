import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import api from '../api';
import '../styles/List.css';

interface Marca {
  id: number;
  nome: string;
  descricao: string;
}

function ListMarca(): JSX.Element {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

  const fetchMarcas = async (search = '', order = '') => {
    try {
      const response = await api.get<Marca[]>(`/marcas/?search=${search}&ordering=${order}`);
      setMarcas(response.data);
    } catch (error) {
      console.error('Erro ao buscar marcas:', error);
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  const handleSearch = () => {
    fetchMarcas(searchTerm, sortOrder);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    setSortOrder(order);
    fetchMarcas(searchTerm, order);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/marcas/${id}`);
      setMarcas(marcas.filter(marca => marca.id !== id));
    } catch (error) {
      console.error('Erro ao deletar marca:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="header">
        <h1>Lista de Marcas</h1>
        <Link to="/marcas/create" className="action-button">
          Criar Nova Marca
        </Link>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar marcas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
        <select value={sortOrder} onChange={handleSortChange} className="sort-select">
          <option value="">Ordenar por...</option>
          <option value="nome">Nome (A-Z)</option>
          <option value="-nome">Nome (Z-A)</option>
        </select>
      </div>

      <ul className="list-container">
        {marcas.map(marca => (
          <li key={marca.id} className="list-item">
            <div className="item-details">
              <Link to={`/marcas/${marca.id}/detail`} className="item-name-link">
                {marca.nome}
              </Link>
            </div>
            <div className="actions">
              <Link to={`/marcas/${marca.id}/edit`} className="action-link">
                Editar
              </Link>
              <button onClick={() => handleDelete(marca.id)} className="delete-button">
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListMarca;
