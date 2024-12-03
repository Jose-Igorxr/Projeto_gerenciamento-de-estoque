import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'

//COMPONENTES MARCA
import ListMarca from './components/ListMarca'
import CreateMarca from './components/EditMarca'
import EditMarca from './components/EditMarca'
import ReadMarca from './components/ReadMarca'

//COMPONENTES CATEGORIA
import ListCategoria from './components/ListCategoria'
import CreateCategoria from './components/EditCategoria'
import EditCategoria from './components/EditCategoria'
import ReadCategoria from './components/ReadCategoria'

//COMPONENTES PRODUTO
import ListProduto from './components/ListProduto'
import CreateProduto from './components/EditProduto'
import EditProduto from './components/EditProduto'
import ReadProduto from './components/ReadProduto'

import Home from './components/Home'

function AppRouter(): JSX.Element {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home/>} />
          {}
          <Route path="/categorias" element={<ListCategoria />} />
          <Route path="/categorias/create" element={<CreateCategoria />} />
          <Route path="/categorias/:categoriaId/edit" element={<EditCategoria />} />
          <Route path="/categorias/:categoriaId/detail" element={<ReadCategoria />} />
          {}
          <Route path="/marcas" element={<ListMarca />} />
          <Route path="/marcas/create" element={<CreateMarca />} />
          <Route path="/marcas/:marcaId/edit" element={<EditMarca />} />
          <Route path="/marcas/:marcaId/detail" element={<ReadMarca />} />

          <Route path="/produtos" element={<ListProduto />} />
          <Route path="/produtos/create" element={<CreateProduto />} />
          <Route path="/produtos/:produtoId/edit" element={<EditProduto />} />
          <Route path="/produtos/:produtoId/detail" element={<ReadProduto />} />

        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
