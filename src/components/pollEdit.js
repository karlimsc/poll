import React from 'react'
import { Link }  from 'react-router-dom'

export const pollEdit = ({ match }) => (
  <div>
    <h2>Detalle</h2>
    <p>Me han pasado la id {match.params.id} en la url</p>
    <Link to='/'>Volver a home</Link>
  </div>
)
