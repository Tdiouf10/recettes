import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import MenuRecette from './pages/common/MenuRecette'
import Favoris from './pages/favoris/Favoris'
import ListeRecette from './pages/recettes/ListeRecette'
import DetailsRecette from './pages/recettes/DetailsRecette'
import Planning from './pages/planning/Planning'
import Profil from './pages/profil/Profil'
import AuthProvider from './provider/AuthProvider'
import ProtectedRoute from './routes/ProtectedRoute'

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="*" element={<Navigate to='/login' />} />
        
          <Route path="/" element={
            <ProtectedRoute>
              <MenuRecette />
            </ProtectedRoute>
            }>
            <Route path="/liste-recette" element={<ListeRecette />} />
            <Route path="/recette/:id" element={<DetailsRecette />} />
            <Route path="/favoris" element={<Favoris />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/profil" element={<Profil />} />
          </Route>
        
        <Route path="/register" element={<Register />} />
        <Route index path="/login" element={<Login />} />
        
      </Routes>
    </AuthProvider>
  )
}

export default App
