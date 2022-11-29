import { useState, useEffect } from 'react';

export const Logout=()=>{
  useEffect(() => {

    localStorage.setItem('accessToken', '')
    localStorage.setItem('userId', null)
  }, [])

  return(<div>Вы вышли</div>);

}

export default Logout;