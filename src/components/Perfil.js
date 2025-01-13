import React, { useEffect } from 'react'
import logo from '../logo.svg'
import { getDataUsuario } from '../services/usuariosService'

function Perfil() {
    useEffect(()=>{

        /* console.log(userLogin); */
        
    },[])
  return (
    <div>
        <h3 className='border-bottom border-primary border-2'>Perfil</h3>
        <img src={logo} alt="foto perfil" style={{width:'200px'}}/>
        <form className='d-flex justify-content-around'>
            <div className='col-5'>
                <label for='name'>Nombre</label>
                <input disabled="true" className='form-control' placeholder='Nombre' title='Nombre' name='Nombre' id='name'/>
                <label for='email'>Correo</label>
                <input disabled="true" className='form-control' placeholder='Correo' title='Correo' name='Correo' id='email'/>
                <label for='id_rol'>Rol</label>
                <input disabled="true" className='form-control' placeholder='Rol' title='Rol' name='Rol' id='id_rol'/>


            </div>
            <div className='col-5'>
                <label for='document_number'>Número de documento</label>
                <input disabled="true" className='form-control' placeholder='Número de documento' title='Número de documento' name='Número de documento' id='document_number'/>
                <label for='last_login'>Ultimo inicio de sesión</label>
                <input disabled="true" className='form-control' placeholder='Ultimo inicio de sesión' title='Ultimo inicio de sesión' name='Ultimo inicio de sesión' id='last_login'/>
                <label for='number_phone'>Numero de Telefono</label>
                <input disabled="true" className='form-control' placeholder='Numero de Telefono' title='Numero de Telefono' name='Numero de Telefono' id='number_phone'/>
                <label for='is_active'>Estado</label>
                <input disabled="true" className='form-control' placeholder='Estado' title='Estado' name='Estado' id='is_active'/>

            </div>
        </form>
    </div>
  )
}

export default Perfil