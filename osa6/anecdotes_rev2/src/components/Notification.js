import React from 'react'

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  
  if (store.getState().notification == null) {
    return null
  }

  return store.getState().notification == null
    ? null
    :
    <div style={style}>
      { store.getState().notification }
    </div>
}

export default Notification