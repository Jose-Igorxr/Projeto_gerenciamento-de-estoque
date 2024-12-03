import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/Login.css';

function Login(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Verificação de campos vazios
    if (!username || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await api.post<{ access: string }>('/token/', { username, password });
      localStorage.setItem('token', response.data.access);
      navigate('/home/');
    } catch (error: any) {
      alert('Usuário ou senha incorretos. Tente novamente.');
      console.error('Erro ao fazer login.', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Bem-vindo à TechVerse</h2>
        
        <div className="input-div">
          <label htmlFor="username">Nome de usuário</label>
          <input
            id="username"
            className='input'
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-div">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            className='input'
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">ENTRAR</button>
      </form>
    </div>
  );
}

export default Login;
