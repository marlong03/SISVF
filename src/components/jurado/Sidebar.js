import FotoPerfil from '../../logo.svg'
import { useNavigate } from 'react-router-dom';
function Sidebar() {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(`/dashboard-jurado/${path}`);
  };
  return (
    <div>
        <section className='sidebar text-light bg-primary' id='sidebar'>
            <ul>
                <li className='p-3 list-unstyled text-center w-100  mb-2 '>
                    <img src={FotoPerfil} alt="Foto perfil" name="Foto perfil" title="Foto perfil" className='fotoPerfil' />
                    <h6>Jurado</h6>  
                    <input type="button" value="Ver perfil" className='btn btn-sm btn-outline-light my-2' onClick={() => handleNavigation('perfil')}/>

                </li>
                <li className='p-3 list-unstyled btn btn-primary w-100' onClick={() => handleNavigation('Graficas')} >Graficas</li>
            </ul>
        </section>
    </div>
  )
}

export default Sidebar