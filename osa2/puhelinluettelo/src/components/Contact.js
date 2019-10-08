import React from 'react';

/* Render the list of contact */
const Contact = ({ id, name, number }) => 
    <div>{ id }: { name } <b>{ number }</b></div>

export default Contact