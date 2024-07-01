import React from 'react'
import style from './Prueba.module.css'
import base from '/bienvenida.png'
export const Prueba = () => {
  return (
    <>
     <div className='container'>
        <img src={base} alt="Imagen" className='image'/>
    </div>
    </>
  )
}
