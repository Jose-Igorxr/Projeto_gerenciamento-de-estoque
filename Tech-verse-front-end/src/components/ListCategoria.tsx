import { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import '../styles/List.css';
import NavBar from '../components/NavBar';

interface Categoria {
  id: number;
  nome: string;
  descricao: string;
}

function ListCategoria(): JSX.Element {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

  const fetchCategorias = async (search = '', order = '') => {
    try {
      const response = await api.get<Categoria[]>(`/categorias/?search=${search}&ordering=${order}`);
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleSearch = () => {
    fetchCategorias(searchTerm, sortOrder);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    setSortOrder(order);
    fetchCategorias(searchTerm, order);
  };

  const handleDelete = async (categoriaId: number) => {
    try {
      await api.delete(`/categorias/${categoriaId}/`);
      const updatedCategoria = categorias.filter(categoria => categoria.id !== categoriaId);
      setCategorias(updatedCategoria);
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
    }
  };

  return (
    <div className="marca-list-container">
    <NavBar/>
    <div className="header-2">
      <h1>Lista de Categorias</h1>
      <Link to="/categorias/create" className="action-button">Criar Nova Categoria</Link> {}
    </div>
  
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar categorias..."
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
  
    <ul>
      {categorias.map(categoria => (
        <li key={categoria.id} className="list-item"> {}
          <Link to={`/categorias/${categoria.id}/detail`} className="item-name-link">
            {categoria.nome}
          </Link>
          <div className="actions">
            <Link to={`/categorias/${categoria.id}/edit`} className="action-link">Editar</Link> {}
            <button onClick={() => handleDelete(categoria.id)} className="delete-button">Deletar</button>
          </div>
        </li>
      ))}
    </ul> 
  </div>  
  );
}

export default ListCategoria;
