import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import SearchInput from './Functions/SearchInput';
import ActionButtons from './Functions/ActionButtons';
import DataTableComponent from './Functions/DataTableComponent';
import {getData,createData,deleteData} from '../../services/tipoVotacionesService'
function TipoVotaciones() {

    const [searchTerm, setSearchTerm] = useState('');
    const [isOpenModalCreate,setIsOpenModalCreate] = useState(false)
    const [title,setTitle] = useState('Tipo Votaciones')
    const [titleExport,setTitleExport] = useState('tipo_votaciones')
    const [keysData,setKeysData] = useState(['Name', 'Age', 'Profession'])
    const [data,setData] = useState([])
    useEffect(() => {
        // Llamar a la API al montar el componente
        const fetchData = async () => {
          try {
            const result = await getData('tipovotaciones/');  // Reemplaza con tu endpoint
            
            setData(result);
          } catch (error) {
            console.error('Error obteniendo los datos de tipo votaciones fetching:', error);
          }
        };
        fetchData();
    }, []);
  
    const columns = [
        {
            name: 'Nombre',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Descripción',
            selector: (row) => row.description,
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
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const tableData = filteredData.map(item => [
        item.name,
        item.description
    ]);
    const handleOpenModalAction = (editData = null) => {
        // Si editData existe, estamos editando un registro, de lo contrario estamos creando uno nuevo
        const isEdit = editData !== null;
    
        setIsOpenModalCreate(!isOpenModalCreate);
        Swal.fire({
            title: isEdit ? 'Editar tipo votación' : 'Crear tipo votación',
            html: `    
                <form id="form" class="p-3 text-start">
                    <label for="name">Nombre</label> <br />
                    <input id="name" class="form-control p-2" placeholder="Nombre" value="${isEdit ? editData.name : ''}" required/>
                    <label for="description">Descripción</label>
                    <textarea id="description" class="form-control p-2" placeholder="Descripción" required>${isEdit ? editData.description : ''}</textarea>
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
                const name = document.getElementById('name').value;
                const description = document.getElementById('description').value;
        
                // Validación del formulario
                if (!name || !description) {
                    Swal.showValidationMessage('Faltan campos por llenar');
                    return false;
                }
                // Devolver los datos del formulario
                return { name, description };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { name, description } = result.value;
                const apiUrl = isEdit ? `tipovotaciones/${editData.id}/` : 'tipovotaciones/';
                const method = isEdit ? 'PUT' : 'POST';
    
                // Se envían los datos al servicio (Crear o actualizar según corresponda)
                createData(apiUrl, { name, description }, method).then((newData) => {
                    Swal.fire({
                        title: isEdit ? '¡Actualización exitosa!' : '¡Creación exitosa!',
                        text: `Nombre: ${name}, Descripción: ${description}`,
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
                const apiUrl = `tipovotaciones/${editData.id}/`;
        
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
                            placeholder={'Nombre | Descripción'} />
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

export default TipoVotaciones