import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'
import '../styles/ReadCategoria.css'
import { ICategoria } from './types'
import NavBar from '../components/NavBar'; 

function ReadCategoria(): JSX.Element {
    const { categoriaId } = useParams<{ categoriaId: string }>()

    const [nome, setNome] = useState<string>('');    
    const [descricao, setDescricao] = useState<string>(''); 

  useEffect(() => {
    api.get<ICategoria>(`/categorias/${categoriaId}/`)
      .then(response => {
        setNome(response.data.nome)
        setDescricao(response.data.descricao)
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes do post:', error)
      })
  }, [categoriaId])

  return (
    <div className="read-categoria-container">
      <NavBar/>
      <h1>Detalhes da Categoria</h1>
      <Link to="/categorias">
        <button type="button" className="back-button">Voltar para Listagem</button>
      </Link>
      <h2>{nome}</h2>
      <p>{descricao}</p>
    </div>
  )
}

export default ReadCategoria