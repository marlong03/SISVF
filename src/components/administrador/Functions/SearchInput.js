import React from 'react'

function SearchInput({ searchTerm, setSearchTerm,placeholder }) {
    return (
        <div className='col-6'>
            <label>Buscar</label>
            <input
                type="text"
                className="form-control mb-3 p-2"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}

export default SearchInput