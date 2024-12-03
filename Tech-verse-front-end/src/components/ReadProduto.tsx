import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import api from '../api';
import { IProduto } from './types';
import '../styles/ReadProduto.css';

function ReadProduto(): JSX.Element {
    const { produtoId } = useParams<{ produtoId: string }>();

    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [imagem, setImagem] = useState<string | null>(null);
    const [preco, setPreco] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!produtoId) return;

            try {
                const response = await api.get<IProduto>(`/produtos/${produtoId}/`);
                setNome(response.data.nome);
                setDescricao(response.data.descricao);
                setPreco(response.data.preco);
                setImagem(response.data.imagem || '');
            } catch (error) {
                setError('Erro ao buscar detalhes do produto.');
                console.error('Erro ao buscar detalhes do produto:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [produtoId]);

    if (loading) {
        return (
            <>
                <NavBar />
                <p>Carregando...</p>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBar />
                <p>{error}</p>
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="read-produto-container">
                <h1>Detalhes do Produto</h1>
                <Link to="/produtos">
                    <button type="button" className="back-button">Voltar para Listagem</button>
                </Link>
                <div className="produto-detalhes">
                    <div className="produto-info">
                        <div className="produto-header">
                            <h2>{nome}</h2>
                            <p className="produto-preco"><strong>R${preco}</strong></p>
                        </div>
                        <p>{descricao}</p>
                    </div>
                    <img 
                        src={imagem || undefined} 
                        alt={nome} 
                        className="produto-image" 
                    />
                </div>
            </div>
        </>
    );
}

export default ReadProduto;
