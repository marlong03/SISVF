import { logout } from "../services/login"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
   const logoutAction = () =>{
    Swal.fire({
      title: "Estas seguro?",
      text: "Al confirmar cerraras la sesión",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Cerrar sesión"
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
      }
    });
   }
  return (
    <div>
        <section className='d-flex justify-content-between p-3 bg-primary text-light header'>
            <div><h3>Sistema de votaciones</h3></div>
            <div>   
              <input type="button" value="Cerrar Sesión" className='btn btn-sm btn-outline-light my-2' onClick={()=>logoutAction()} />
            </div>
        </section> 
        
    </div>
  )
}

export default Header