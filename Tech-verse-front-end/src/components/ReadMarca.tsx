import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'
import { IMarca } from './types'
import NavBar from '../components/NavBar';
import '../styles/ReadCategoria.css'

function ReadMarca(): JSX.Element {
    const { marcaId } = useParams<{ marcaId: string }>()

    const [nome, setNome] = useState<string>('');    
    const [descricao, setDescricao] = useState<string>(''); 
  useEffect(() => {
    api.get<IMarca>(`/marcas/${marcaId}/`)
      .then(response => {
        setNome(response.data.nome)
        setDescricao(response.data.descricao)
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes do post:', error)
      })
  }, [marcaId])

  return (
    <div className="read-categoria-container">
      <NavBar/>
      <h1>Detalhes da Marca</h1>
      <Link to="/marcas">
        <button type="button" className="back-button">Voltar para Listagem</button>
      </Link>
      <h2>{nome}</h2>
      <p>{descricao}</p>
    </div>
  )
}

export default ReadMarca