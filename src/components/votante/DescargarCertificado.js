import React, { useState } from 'react'
import logo from '../../logo.svg'
function DescargarCertificado() {
    const [certificados,setCertificados] = useState([{year:2024,name:"MARLONG MENDOZA"},{year:2025,name:"MARLONG MENDOZA"}])
  return (
    <div>
        <h3 className="border-bottom border-primary border-2">Descargar certificado</h3>
        
        <section>
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Año</th>
                    <th scope="col">Fecha de votación</th>
                    <th scope="col">Archivo</th>
                    </tr>
                </thead>
                <tbody>
                    {certificados.map((certificado,index)=>(
                             <tr>
                                <th scope="row">{certificado.year}</th>
                                <td>{certificado.year}</td>
                                <td>
                                    <img src={logo} style={{width:'70px',cursor:'pointer'}} alt='imagen-descargable' download/>
                                </td>
                            </tr>
                    ))}
                   
                   
                </tbody>
            </table>
        </section>
    </div>
  )
}

export default DescargarCertificado