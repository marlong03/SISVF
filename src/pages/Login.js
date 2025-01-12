import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  // Estado para almacenar los valores de los campos
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Maneja los cambios en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (!formData.email || !formData.password) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    
    console.log('Formulario enviado:', formData);
    // Aquí puedes realizar la solicitud al servidor o manejar la lógica de autenticación
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='p-4 border rounded shadow-sm' style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className='mb-4 text-center'>Inicia Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>Correo Electrónico</label>
            <input
              type='email'
              className='form-control p-2'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Introduce tu correo'
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Contraseña</label>
            <input
              type='password'
              className='form-control p-2'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Introduce tu contraseña'
              required
            />
          </div>
          <button type='submit' className='btn btn-primary w-100 p-2'>Iniciar Sesión</button>
        </form>
        <div className='text-center mt-1'>
            <Link to="#">Recordar contraseña</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;