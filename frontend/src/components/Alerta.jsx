

/* Lo coge mediante el props*/
// eslint-disable-next-line react/prop-types
const Alerta = ({alerta}) => {
    /* from to va en degradado*/
    /* esta es la dirección en la que se hace el degradado bg-gradient-to-r */
  return (
    // eslint-disable-next-line react/prop-types
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 
        'from-indigo-400 to indigo-600'} bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold 
            text-sm mb-10`}>
        {alerta.msg}
    </div>
    
  )
}

export default Alerta;