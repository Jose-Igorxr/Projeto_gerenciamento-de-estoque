import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar'; 
import api from '../api';
import '../styles/List.css';
import { IProduto } from './types';

function ListProduto(): JSX.Element {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

  const fetchProdutos = async (search = '', order = '') => {
    try {
      const response = await api.get<IProduto[]>(`/produtos/?search=${search}&ordering=${order}`);
      const produtosComPrecoCorreto = response.data.map(produto => ({
        ...produto,
        preco: Number(produto.preco) || 0,
      }));
      setProdutos(produtosComPrecoCorreto);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleSearch = () => {
    fetchProdutos(searchTerm, sortOrder);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    setSortOrder(order);
    fetchProdutos(searchTerm, order);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/produtos/${id}`);
      setProdutos(produtos.filter(produto => produto.id !== id));
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    <>
    <NavBar/>
    <div className="header">
      <h1>Lista de Produtos</h1>
      <Link to="/produtos/create" className="action-button">
        Criar Novo Produto
      </Link>
    </div>

    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar produtos..."
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
        <option value="preco">Preço (Menor para Maior)</option>
        <option value="-preco">Preço (Maior para Menor)</option>
      </select>
    </div>

    <ul className="list-container">
      {produtos.map(produto => (
        <li key={produto.id} className="list-item">
          <div className="item-details">
            <Link to={`/produtos/${produto.id}/detail`} className="item-name-link">
              {produto.nome}
            </Link>
            <Link to={`/produtos/${produto.id}/detail`}>
              <img src={produto.imagem} alt={produto.nome} className="item-image" />
            </Link>
            <p className="item-price">
              {typeof produto.preco === 'number' ? `R$${produto.preco.toFixed(2)}` : 'Preço não disponível'}
            </p>
          </div>
          <div className="actions">
            <Link to={`/produtos/${produto.id}/edit`} className="action-link"> 
              Editar
            </Link>
            <button onClick={() => handleDelete(produto.id)} className="delete-button">
              Deletar
            </button>
          </div>
        </li>
      ))}
    </ul>
  </>
  )
}

export default ListProduto;
