import React from 'react'

function HistorialVotacion() {
  return (
    <div>
        <h3 className="border-bottom border-primary border-2">Historial de Votación</h3>

        <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">Año</th>
                <th scope="col">Tipo votación</th>
                <th scope="col">Plancha escogída</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">2024</th>
                <td>Seccional Capital</td>
                <td>Plancha 2</td>
                </tr>
                <tr>
                <th scope="row">2024</th>
                <td>Regional Capital</td>
                <td>Plancha 3</td>
                </tr>
                <tr>
                <th scope="row">2024</th>
                <td>Nacional</td>
                <td>Plancha 4</td>
                </tr>
                <tr>
                <th scope="row">2025</th>
                <td>Regional Capital</td>
                <td>Plancha 6</td>
                </tr>
                <tr>
                <th scope="row">2025</th>
                <td>Nacional</td>
                <td>Plancha 1</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default HistorialVotacion