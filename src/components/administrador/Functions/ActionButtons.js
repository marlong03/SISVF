import React from 'react'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
function ActionButtons({ handleOpenModalAction,
                        filteredData,title,
                        tableData,keysData,titleExport }) {
    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Agregar título
        doc.text(title, 14, 10);
        
        // Agregar la tabla al PDF (3 columnas)
        doc.autoTable({
            head: [keysData],
            body: tableData,
        });

        // Descargar el PDF
        doc.save(titleExport + '.pdf');
        };
        const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);  // Convertir los datos a una hoja
        const wb = XLSX.utils.book_new();  // Crear un libro de trabajo
        XLSX.utils.book_append_sheet(wb, ws, title);  // Añadir la hoja al libro de trabajo
        XLSX.writeFile(wb, titleExport + '.xlsx');  // Descargar el archivo Excel
        };
        
  return (
    <div className='col-6 d-flex justify-content-end align-items-center'>
        <input
            type="button"
            className="btn btn-primary p-2"
            value="Crear"
            onClick={()=>handleOpenModalAction()}
        />
        <input
            type="button"
            className="btn btn-danger mx-1 p-2"
            value="PDF"
            onClick={handleDownloadPDF}
        />
        <input
            type="button"
            className="btn btn-success p-2"
            value="XLSX"
            onClick={handleExportExcel}
        />
    </div>
  )
}

export default ActionButtons