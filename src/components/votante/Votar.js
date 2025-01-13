import React, { useState,useRef, useEffect } from 'react';
import logo from '../../logo.svg';

function Votar() {
    useEffect(()=>{
        //Seleccionar tipoVotacion
        /* 
        //votos = votosDelUsuarioLogueado =  []
        votos.filter((voto)=>{
            if(voto.id_tipovotacion == 1){
                setTipoVotacion(getTipoVotacion(2))
                setCifraProgreso(40)
                planchas = getPlanchasTipoVotacion(tipoVotacion.id)
            }
            if(voto.id_tipovotacion == 2){
                setTipoVotacion(getTipoVotacion(3))
                setCifraProgreso(60)

                planchas = getPlanchasTipoVotacion(tipoVotacion.id)
            }
            if(voto.id_tipovotacion == 3){
                setTipoVotacion(getTipoVotacion(4))
                setCifraProgreso(80)
                
                planchas = getPlanchasTipoVotacion(tipoVotacion.id)
            }
            if(voto.id_tipovotacion == 4){
                setTipoVotacion(getTipoVotacion(5))
                setCifraProgreso(90)
                planchas = getPlanchasTipoVotacion(tipoVotacion.id)
                //Confetti y despedir si hace falta una encuesta de satisfaccion o algo así hiría aquí
            }
            //########################################################################################
            //Falta verificar que solo me traiga las planchas activas y que solo me cargue las votaciones activas
            // falta definir votaciones cargadas para todos los usuarios
        })
        
        */
    },[])
  const [title, setTitle] = useState('Votar');
  const [planchas, setPlanchas] = useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }]);
  const [tipoVotacion, setTipoVotacion] = useState({name:"Seccional Capital"});
  const [cifraProgreso, setCifraProgreso] = useState(18);
  const [selectedId, setSelectedId] = useState(null); // Estado para guardar la tarjeta seleccionada
  const bottomRef = useRef(null); 
  const lightCard = (id) => {
    setSelectedId(id); // Actualiza el ID de la tarjeta seleccionada
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' }); // Desplázate suavemente al elemento referenciado
    }
  };

  return (
    <div className="w-100">
      <h3 className="border-bottom border-primary border-2">
        {title} - {tipoVotacion.name}
      </h3>
      <section className="container_cards d-flex justify-content-center flex-wrap w-100">
        {planchas.map((plancha, index) => (
          <div
            className={`card m-2 ${selectedId === plancha.id ? 'border border-2 border-primary shadow' : ''}`}
            style={{ width: '15rem' }}
            key={index}
          >
            <img className="card-img-top" src={logo} alt={`Plancha ${plancha.id}`} />
            <div className="card-body">
              <h5 className="card-title">Plancha {plancha.id}</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
              <div className="d-flex justify-content-end">
                <span className="btn btn-primary" onClick={() => lightCard(plancha.id)}>
                  Seleccionar
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className="d-flex justify-content-center flex-column align-items-center">
        {selectedId &&
            <div>
                <input type="button" className='btn btn-lg btn-outline-primary my-3 border border-2 border-primary' value={'Votar por Plancha '+selectedId}/>
            </div>  
        }
        <div>
            <label className='text-center'>Progreso: <span className='h6'>{cifraProgreso}%</span></label> <br/>
          <progress id="progress" max="100" value={cifraProgreso}>{cifraProgreso}</progress> 
        </div>
      </section>
        <section ref={bottomRef} className="mb-5"></section>
    </div>
  );
}

export default Votar;
