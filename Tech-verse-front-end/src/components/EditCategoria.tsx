import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import api from '../api'
import NavBar from '../components/NavBar'; 
import '../styles/CreateEdit.css'
import { ICategoria } from './types'

function EditCategoria(): JSX.Element {
    const { categoriaId } = useParams<{ categoriaId: string }>()
    const navigate = useNavigate()
    const [nome, setNome] = useState<string>('');    
    const [descricao, setDescricao] = useState<string>('');  
  
    useEffect(() => {
      if (!categoriaId) return
  
      api.get<ICategoria>(`/categorias/${categoriaId}/`)
        .then(response => {
          setNome(response.data.nome)
          setDescricao(response.data.descricao)
        })
        .catch(error => {
          console.error('Erro ao buscar detalhes do categoria:', error)
        })
    }, [categoriaId])
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()
      try {
        const formData = new FormData()
        formData.append('nome', nome)
        formData.append('descricao', descricao)
        if (categoriaId) {
          await api.put(`/categorias/${categoriaId}/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          alert('categoria atualizado com sucesso!')
        } else {
          await api.post(`/categorias/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        }
        navigate('/categorias')
      } catch (error) {
        console.error('Erro ao salvar post:', error)
      }
    }
  
    return (
    <div className="container">
    <NavBar/>
    <h1>{categoriaId ? 'Editar Categoria' : 'Criar Nova Categoria'}</h1>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input 
                type="text" 
                placeholder="Nome" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
            />
        </div>
        <div className="form-group">
            <textarea 
                placeholder="Descrição" 
                value={descricao} 
                onChange={(e) => setDescricao(e.target.value)} 
            />
        </div>
        <button className="save-button" type="submit">
            {categoriaId ? 'Salvar' : 'Criar'}
        </button>
        <Link to="/categorias">
            <button type="button" className="back-button">Voltar para Listagem</button>
        </Link>
    </form>
</div>

    )
  }
  
  export default EditCategoria