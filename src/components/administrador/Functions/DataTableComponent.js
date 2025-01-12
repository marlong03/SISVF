import React from 'react'
import DataTable from 'react-data-table-component';

function DataTableComponent({ columns, data }) {
    return (
        <DataTable
            columns={columns}
            data={data}
            pagination
            responsive
        />
    );
}

export default DataTableComponent