import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api';
import '../styles/CreateEdit.css';
import NavBar from '../components/NavBar'; 
import { IProduto, IMarca, ICategoria } from './types';

function EditProduto(): JSX.Element {
    const { produtoId } = useParams<{ produtoId: string }>();
    const navigate = useNavigate();
    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [imagem, setImagem] = useState<File | null>(null);
    const [preco, setPreco] = useState<number>(0);
    const [categoria, setCategoria] = useState<ICategoria | null>(null);
    const [marca, setMarca] = useState<IMarca | null>(null);
    const [categorias, setCategorias] = useState<ICategoria[]>([]);
    const [marcas, setMarcas] = useState<IMarca[]>([]);
    const [currentImagem, setCurrentImagem] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriasResponse, marcasResponse] = await Promise.all([
                    api.get('/categorias'),
                    api.get('/marcas')
                ]);
                setCategorias(categoriasResponse.data);
                setMarcas(marcasResponse.data);

                if (produtoId) {
                    const produtoResponse = await api.get<IProduto>(`/produtos/${produtoId}/`);
                    const { nome, descricao, preco, marca, categoria, imagem } = produtoResponse.data;
                    setNome(nome);
                    setDescricao(descricao);
                    setPreco(preco);
                    setMarca(marca);
                    setCategoria(categoria);
                    setCurrentImagem(imagem);
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                setError('Erro ao carregar dados. Tente novamente mais tarde.');
            }
        };

        fetchData();
    }, [produtoId]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImagem(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('descricao', descricao);
            formData.append('preco', preco.toString());

            if (categoria) formData.append('categoria', categoria.id.toString());
            if (marca) formData.append('marca', marca.id.toString());
            if (imagem) formData.append('imagem', imagem);

            if (produtoId) {
                await api.put(`/produtos/${produtoId}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                alert('Produto atualizado com sucesso!');
            } else {
                await api.post(`/produtos/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                alert('Produto criado com sucesso!');
            }
            navigate('/produtos');
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            setError('Erro ao salvar produto. Verifique os dados e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="edit-produto-container">
    <NavBar/>
    <h1 className='h1-color'>{produtoId ? 'Editar Produto' : 'Criar Novo Produto'}</h1>
    {error && <div className="error-message">{error}</div>}
    <form className='form-center' onSubmit={handleSubmit}>
        <div className="image-upload">
            {currentImagem && <img src={currentImagem} alt="Imagem do Produto" className="produto-image" />}
            <label htmlFor="imagem">Escolher Imagem</label>
            <input type="file" id="imagem" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="form-group">
            <input
                type="text"
                id="nome"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />
        </div>
        <div className="form-group">
            <textarea
                id="descricao"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
            />
        </div>
        <div className="form-group">
            <input
                type="number"
                id="preco"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(parseFloat(e.target.value))}
                required
            />
        </div>
        <div className="form-group">
            <select
                id="categoria"
                value={categoria ? categoria.id : ''}
                onChange={(e) => {
                    const selectedCategoria = categorias.find(c => c.id.toString() === e.target.value);
                    setCategoria(selectedCategoria || null);
                }}
            >
                <option value="">Selecione a Categoria</option>
                {categorias.map(c => (
                    <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
            </select>
        </div>
        <div className="form-group">
            <select
                id="marca"
                value={marca ? marca.id : ''}
                onChange={(e) => {
                    const selectedMarca = marcas.find(m => m.id.toString() === e.target.value);
                    setMarca(selectedMarca || null);
                }}
            >
                <option value="">Selecione a Marca</option>
                {marcas.map(m => (
                    <option key={m.id} value={m.id}>{m.nome}</option>
                ))}
            </select>
        </div>
        <div className="button-container">
            <button type="submit" className="save-button" disabled={loading}>
                {loading ? 'Salvando...' : produtoId ? 'Salvar' : 'Criar'}
            </button>
            <div className ="button-back">
                <Link to="/produtos">
                    <button type="button" className="back-button">Voltar a listagem</button>
                </Link>
            </div>
        </div>
    </form>
</div>
    )
}

export default EditProduto;
