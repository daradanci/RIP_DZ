import React,{useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import DocumentTitle from 'react-document-title'
import {useSelector, useDispatch} from "react-redux";
import {checkIfStaff, updateIfStaff, userInfo} from "../store/UserSlice";
import StaffMenu from "../components/StaffMenu";
export const NavBar = () => {
    const { user } = useSelector((state) => state.user);
    const { access } = useSelector((state) => state.access);
    const { isStaff } = useSelector((state) => state.isStaff);
    const dispatch = useDispatch();
    let userId=localStorage.getItem('userId')
    // const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    // const [userId, setUserId] = useState(localStorage.getItem('userId'))

    useEffect(() => {
        const fetchData = async () => {
            if(localStorage.getItem('userId')!=='null'){
                await dispatch(userInfo(localStorage.getItem('userId')))
                    .then((originalPromiseResult) => {
                        console.log('USER FETCHED')
                        console.log(originalPromiseResult.payload)
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        console.log('ERROR APPEARED WHILE USER FETCHING')
                        console.log(rejectedValueOrSerializedError)
                    })
            }
            else{
                await dispatch(updateIfStaff(false))
            }
        }


        fetchData()

    }, [])

    return (
        <div className={"navbar"}>
              <div className={"nav-tabs"}>
                <Link to="/">Дом</Link>
              </div>
              <div className={"nav-tabs"}>
                <Link to="/range">Ассортимент</Link>
              </div>
              <div className={"nav-tabs"}>
                <Link to="/bag">Корзина</Link>
              </div>
              {access===null?
                  <>
                    <div className={"nav-tabs"}>
                <Link to="/reg">Регистрация</Link>
                    </div>
                    <div className={"nav-tabs"}>
                      <Link to="/auth">Вход</Link>
                    </div>
                    </>
                    :
                    <div className={"nav-tabs"}>
                    <Link to="/auth">Профиль</Link>
                    </div>
              }


            </div>
    );
};

export default NavBar;