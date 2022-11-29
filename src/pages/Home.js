import React,{useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import DocumentTitle from 'react-document-title'
import {useSelector, useDispatch} from "react-redux";
import {checkIfStaff, updateIfStaff, userInfo} from "../store/UserSlice";
import StaffMenu from "../components/StaffMenu";
export const Home = () => {
    const { user } = useSelector((state) => state.user);
    const { isStaff } = useSelector((state) => state.isStaff);
    const dispatch = useDispatch();
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
        <DocumentTitle title = 'Shop100'>
            <div>
                <h1>Добро пожаловать на Shop100!</h1>
                <Link to="/range">Посмотреть ассортимент!</Link>

            {isStaff &&
                <StaffMenu/>
            }
            </div>

        </DocumentTitle>
    );
};

export default Home;