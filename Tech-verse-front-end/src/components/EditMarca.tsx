import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import api from '../api'
import '../styles/CreateEdit.css'
import NavBar from '../components/NavBar'; 
import { IMarca } from './types'

function EditMarca(): JSX.Element {
    const { marcaId } = useParams<{ marcaId: string }>()
    const navigate = useNavigate()
    const [nome, setNome] = useState<string>('');    
    const [descricao, setDescricao] = useState<string>('');  
  
    useEffect(() => {
      if (!marcaId) return
  
      api.get<IMarca>(`/marcas/${marcaId}/`)
        .then(response => {
          setNome(response.data.nome)
          setDescricao(response.data.descricao)
        })
        .catch(error => {
          console.error('Erro ao buscar detalhes do marca:', error)
        })
    }, [marcaId]) 
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()
      try {
        const formData = new FormData()
        formData.append('nome', nome)
        formData.append('descricao', descricao)
        if (marcaId) {
          await api.put(`/marcas/${marcaId}/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          alert('Marca atualizado com sucesso!')
        } else {
          await api.post(`/marcas/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        }
        navigate('/marcas')
      } catch (error) {
        console.error('Erro ao salvar post:', error)
      }
    }
  
    return (
      <div className="container">
        <NavBar/>
        <h1>{marcaId ? 'Editar Marca' : 'Criar Nova Marca'}</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          <button className="save-button" type="submit">{marcaId ? 'Salvar' : 'Criar'}</button>
          <Link to="/marcas">
            <button type="button" className="back-button">Voltar para Listagem</button>
          </Link>
        </form>
      </div>
    )
  }
  
  export default EditMarca