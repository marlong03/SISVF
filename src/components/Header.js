function Header() {
   
  return (
    <div>
        <section className='d-flex justify-content-between p-3 bg-primary text-light header'>
            <div><h3>Sistema de votaciones</h3></div>
            <div>   
              <input type="button" value="Cerrar Sesión" className='btn btn-sm btn-outline-light my-2' />
            </div>
        </section> 
        
    </div>
  )
}

export default Header