import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import SearchInput from './Functions/SearchInput';
import ActionButtons from './Functions/ActionButtons';
import DataTableComponent from './Functions/DataTableComponent';
import {getData,createData,deleteData} from '../../services/usuariosService'
function Usuarios() {

    const [searchTerm, setSearchTerm] = useState('');
    const [isOpenModalCreate,setIsOpenModalCreate] = useState(false)
    const [title,setTitle] = useState('Usuarios')
    const [titleExport,setTitleExport] = useState('usuarios')
    const [keysData,setKeysData] = useState(['Correo', 'Documento','Estado','Nombre de usuario','Rol'])
    const [data,setData] = useState([])
    useEffect(() => {
        // Llamar a la API al montar el componente
        const fetchData = async () => {
          try {
            const result = await getData('usuarios/');  // Reemplaza con tu endpoint
            
            setData(result);
          } catch (error) {
            console.error('Error obteniendo los datos de usuarios fetching:', error);
          }
        };
        fetchData();
    }, []);
  
    const columns = [
        
        {
            name: 'Correo',
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: 'Documento',
            selector: (row) => row.document_number,
            sortable: true,
        },
        {
            name: 'Estado',
            selector: (row) => row.is_active,
            sortable: true,
        },
        {
            name: 'Nombre de usuario',
            selector: (row) => row.username,
            sortable: true,
        },
        {
            name: 'Rol',
            selector: (row) => row.id_rol,
            sortable: true,
        },
        {
            name: 'Acciones',
            selector: (row) => (
                <button
                    className="btn btn-outline-primary btn-sm mx-1"
                    onClick={() => handleOpenModalAction(row)}
                >
                    Editar
                </button>
            ),
            button:true
        },
        
    ];
    const filteredData = data.filter(item => 
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.document_number.toString().includes(searchTerm) ||
      item.is_active.toString().includes(searchTerm) || 
      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id_rol.toString().includes(searchTerm.toLowerCase()) // Descomenta si usas id_rol
  );
    const tableData = filteredData.map(item => [
        item.email,
        item.document_number,
        item.is_active,
        item.username,
        item.id_rol
    ]);
    const handleOpenModalAction = (editData = null) => {
        // Si editData existe, estamos editando un registro, de lo contrario estamos creando uno nuevo
        const isEdit = editData !== null;
    
        setIsOpenModalCreate(!isOpenModalCreate);
        Swal.fire({
            title: isEdit ? 'Editar Usuario' : 'Crear Usuario',
            html: `    
                <form id="form" class="p-3 text-start">
                    <label for="email">Correo</label> <br />
                    <input id="email" class="form-control p-2" placeholder="Correo" value="${isEdit ? editData.email : ''}" required/>
                    <label for="document_number">Numero de documento</label> <br />
                    <input id="document_number" class="form-control p-2" placeholder="Numero de documento" value="${isEdit ? editData.document_number : ''}" required/>
                    <label for="is_active">Estado</label> <br />
                    <input id="is_active" class="form-control p-2" placeholder="Estado" value="${isEdit ? editData.is_active : ''}" required/>
                    <label for="username">Nombre de usuario</label> <br />
                    <input id="username" class="form-control p-2" placeholder="Nombre de usuario" value="${isEdit ? editData.username : ''}" required/>
                    <label for="id_rol">Rol</label> <br />
                    <input id="id_rol" class="form-control p-2" placeholder="Rol" value="${isEdit ? editData.id_rol : ''}" required/>
                
                    </form>
            `,
            showCancelButton: true,
            confirmButtonText: isEdit ? 'Actualizar' : 'Crear',
            cancelButtonText: 'Cancelar',
            showDenyButton: isEdit,
            denyButtonText: 'Eliminar',
            customClass: {
                confirmButton: 'py-2 px-4 mx-1 mb-4 btn btn-success', 
                cancelButton: 'py-2 px-4 mx-1 mb-4 btn btn-secondary', 
                denyButton: ' m-4 btn-sm btn btn-outline-danger position-absolute btn-delete-modal' 
            },
            allowOutsideClick: false,
            didRender: () => {
                // Reordena los botones usando flexbox
                const confirmButton = document.querySelector('.swal2-confirm');
                const denyButton = document.querySelector('.swal2-deny');
                const cancelButton = document.querySelector('.swal2-cancel');
                
                // Asegúrate de que todos los botones estén en el contenedor correcto
                const buttonContainer = confirmButton.parentElement;
                buttonContainer.appendChild(cancelButton); // Coloca "Cancelar" al final
                buttonContainer.appendChild(denyButton); // Luego coloca "Eliminar"
            },
            preConfirm: () => {
                const email = document.getElementById('email').value;
                const document_number = document.getElementById('document_number').value;
                const is_active = document.getElementById('is_active').value;
                const username = document.getElementById('username').value;
                const id_rol = document.getElementById('id_rol').value;
        
                // Validación del formulario
                if (!email || !document_number || !is_active || !username || !id_rol) {
                    Swal.showValidationMessage('Faltan campos por llenar');
                    return false;
                }
                // Devolver los datos del formulario
                return {email ,document_number ,is_active ,username,id_rol };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const {email ,document_number ,is_active ,username,id_rol } = result.value;
                const apiUrl = isEdit ? `usuarios/${editData.id}/` : 'usuarios/';
                const method = isEdit ? 'PUT' : 'POST';
                const sendData = {email ,document_number ,is_active ,username,id_rol:parseInt(id_rol) }
                // Se envían los datos al servicio (Crear o actualizar según corresponda)
                createData(apiUrl, sendData, method).then((newData) => {
                    Swal.fire({
                        title: isEdit ? '¡Actualización exitosa!' : '¡Creación exitosa!',
                        text: `Nombre de usuario: ${username} Correo: ${email}, Numero de documento: ${document_number}`,
                        icon: 'success'
                    });
                    // Actualiza la lista de datos dependiendo de si es creación o edición
                    if (isEdit) {
                        const updatedData = data.map(item => item.id === newData.id ? newData : item);
                        setData(updatedData);
                    } else {
                        setData([...data, newData]);
                    }
                }).catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lo sentimos, no fue posible realizar la operación',
                        text: 'Intente nuevamente por favor'
                    });
                    console.error(err);
                });
            }
            else if (result.isDenied) {
                const apiUrl = `usuarios/${editData.id}/`;
        
                // Confirmar eliminación
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'Esta acción no se puede deshacer',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar',
                    customClass: {
                        confirmButton: 'py-2 px-4 mx-1 mb-4 btn btn-danger',
                        cancelButton: 'py-2 px-4 mx-1 mb-4 btn btn-secondary'
                    }
                }).then((deleteResult) => {
                    if (deleteResult.isConfirmed) {
                        // Eliminar el registro
                        deleteData(apiUrl).then(() => {
                            Swal.fire({
                                title: '¡Eliminado!',
                                text: 'El registro ha sido eliminado exitosamente.',
                                icon: 'success'
                            });
                            // Actualizar la lista de datos
                            const updatedData = data.filter(item => item.id !== editData.id);
                            setData(updatedData);
                        }).catch((err) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'No se pudo eliminar el registro. Inténtalo nuevamente.'
                            });
                            console.error(err);
                        });
                    }
                 })
            }
        })        
    };
    
  return (
    <div className='w-100'>
        <h3 className='border-bottom border-primary border-2'>{title}</h3>
        <section >
            <div className='mt-4 w-100'>
                <div className='d-flex justify-content-between'>
                    <div className='col-6'>
                        <SearchInput 
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            placeholder={'Nombre | Correo | Numero de documento'} />
                    </div>
                    <ActionButtons 
                        handleOpenModalAction={handleOpenModalAction}
                        filteredData={filteredData}
                        title={title}
                        tableData={tableData}
                        keysData={keysData}
                        titleExport={titleExport}/>
                </div>
                <DataTableComponent columns={columns} data={filteredData}/>
            </div>
        </section>
    </div>
  )
}

export default Usuarios