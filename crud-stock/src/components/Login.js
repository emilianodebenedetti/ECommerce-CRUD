import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Inicio de sesion exitoso!')
            navigate('/home');
        } catch (error) {
            console.error(error.message);
        }
    }
  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='flex form-control rounded-lg bg-crema p-4 px-12 drop-shadow-2x1'>
            <h1 className='text-center font-bold text-xl'>Inicia Sesion</h1>
            <label className="label">
                <span className="label-text">Ingresar email</span>
            </label>
            <input
              type="text"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full max-w-xs"
              />
            <label className="label">
                <span className="label-text">Ingresar Contraseña</span>
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs"
              />
            <button onClick={handleLogin} className='btn m-4'>
                Iniciar sesión
            </button>
        </div>
    </div>
  )
}

export default Login