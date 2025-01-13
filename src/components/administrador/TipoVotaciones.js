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
    const [keysData,setKeysData] = useState(['Nombre','Numero de votos','Descripción','Fecha inicial','Fecha Fin','Estado'])
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
       /*  {
            name: 'Descripción',
            selector: (row) => row.description,
            sortable: true,
        }, */
        {
            name: 'Numero de votos',
            selector: (row) => row.number_votes,
            sortable: true,
        },
        /* {
            name: 'Fecha inicial',
            selector: (row) => formatDate(row.date_start),
            sortable: true,
        },
        {
            name: 'Fecha fin',
            selector: (row) => formatDate(row.date_end),
            sortable: true,
        }, */
        {
            name: 'Estado',
            selector: (row) => (
                
                
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled checked={row.state} />
                    <label className="form-check-label" for="flexSwitchCheckDefault"></label>
                </div>
            ),
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
    const formatDateForInput = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        const hours = d.getHours().toString().padStart(2, '0');
        const minutes = d.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    
    
    const formatDate = (dateString) => {
        
        if (!dateString) return 'N/A'; // Si no hay fecha, muestra "N/A"
        const date = new Date(dateString);
        return date.toLocaleString(); // Formato de fecha y hora local
        // O usa `date-fns` para personalizar más el formato:
        // return format(date, 'dd/MM/yyyy HH:mm');
    };
    const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.number_votes.toString().includes(searchTerm.toLowerCase()) ||
        item.state.toString().includes(searchTerm.toLowerCase()) ||
        item.date_start.toString().includes(searchTerm.toLowerCase()) ||
        item.date_end.toString().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const tableData = filteredData.map(item => [
        item.name,
        item.number_votes,
        item.description,
        item.date_start,
        item.date_end,
        item.state
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
                    <div class="d-flex justify-content-center align-items-center">
                    <div class="col-6 mx-2">
                    <label for="date_start">Fecha inicio</label>
                        <input 
                            id="date_start" 
                            name="date_start" 
                            class="form-control p-2" 
                            type="datetime-local" 
                            value=${isEdit ? formatDateForInput(editData.date_start) : ''}
                            required 
                        />
                    </div>
                    
                    <div class="col-6">

                        <label for="date_end">Fecha fin</label>
                        <input 
                            id="date_end" 
                            name="date_end" 
                            class="form-control p-2" 
                            type="datetime-local" 
                            value=${isEdit ? formatDateForInput(editData.date_end) : ''}
                            required 
                        />
                    </div>

                        </div>
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
                const state = document.getElementById('state').value;
                const date_start = document.getElementById('date_start').value;
                const date_end = document.getElementById('date_end').value;
        
                // Validación del formulario
                if (!name || !description || !state || !date_start || !date_end) {
                    Swal.showValidationMessage('Faltan campos por llenar');
                    return false;
                }
                // Devolver los datos del formulario
                return { name, description, state, date_start, date_end };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { name, description, state, date_start, date_end} = result.value;
                const apiUrl = isEdit ? `tipovotaciones/${editData.id}/` : 'tipovotaciones/';
                const method = isEdit ? 'PUT' : 'POST';
    
                // Se envían los datos al servicio (Crear o actualizar según corresponda)
                createData(apiUrl, { name, description, state, date_start, date_end }, method).then((newData) => {
                    Swal.fire({
                        title: isEdit ? '¡Actualización exitosa!' : '¡Creación exitosa!',
                        text: `Nombre: ${name}, Descripción: ${description}, Estado: ${state}`,
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
                            placeholder={'Nombre | Descripción | Estado | Fechas'} />
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