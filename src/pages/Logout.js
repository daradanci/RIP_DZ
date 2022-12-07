import { useState, useEffect } from 'react';
import {setAccess as updateAccess} from "../store/UserSlice";
import {useDispatch} from "react-redux";

export const Logout=()=>{
      const dispatch = useDispatch();

  useEffect(() => {

    localStorage.setItem('accessToken', '')
    localStorage.setItem('userId', null)
    dispatch(updateAccess(null));
  }, [])

  return(<div>Вы вышли</div>);

}

export default Logout;