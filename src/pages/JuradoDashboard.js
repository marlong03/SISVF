import React,{useState} from 'react'
import Header from '../components/Header'
import Sidebar from '../components/jurado/Sidebar'
function JuradoDashboard({componentePintar}) {

   // Estado para controlar la visibilidad del Sidebar
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
    // Función para cerrar el Sidebar
    const handleCloseSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
    };
  

  return (
    <div>
        <Header />
        <span className='px-1 bg-primary position-absolute text-light btnSidebar text-light h4' style={{cursor:'pointer'}}  onClick={handleCloseSidebar}>
          { isSidebarVisible ? '⇱' : '⇲' }  
        </span>    

        <div className="d-flex">
            { isSidebarVisible &&
              <Sidebar />
            }
             {/* CONTENT */}
            <div className='mx-5 mt-4 w-100'>
              {componentePintar}
            </div>
            {/* CONTENT */}

        </div>
    </div>
  )
}

export default JuradoDashboard