import React,{useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import DocumentTitle from 'react-document-title'
import {useSelector, useDispatch} from "react-redux";
import {checkIfStaff, updateIfStaff, userInfo} from "../store/UserSlice";
import {fetchManagerClient} from "../store/ManagerSlice";
import ManagerBags from "./ManagerBags";

export const ManagerClient = () => {
    const { clientId} = useParams();
    console.log(useParams())
    const { user } = useSelector((state) => state.user);
    const { isStaff } = useSelector((state) => state.isStaff);
    const { managerClient } = useSelector((state) => state.managerClient);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            if(localStorage.getItem('userId')!=='null'){
                await dispatch(userInfo(localStorage.getItem('userId')))
                    .then((originalPromiseResult) => {
                        console.log('USER FETCHED')
                        console.log(originalPromiseResult.payload)
                            console.log('AAAAAAAAAAAAAAAA!!!')
                        // if(isStaff){
                        //     dispatch(fetchManagerClient(clientId));
                        // }
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        console.log('ERROR APPEARED WHILE MANAGER FETCHING')
                        console.log(rejectedValueOrSerializedError)
                    })
                    .then(async()=>{
                        if(isStaff){
                            dispatch(fetchManagerClient(clientId));
                        }
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
            {isStaff ?
                <div>
                    {managerClient!==null?
                        <div>
                            <h1>Информация о пользователе {managerClient.username}</h1>
                            <div className={"clientInfo"} >
                                Пользователь: {managerClient.username} {managerClient.first_name} {managerClient.last_name}
                                {managerClient.is_staff && <> (staff) </>}
                                 <> email: {managerClient.email} </>
                             </div>
                            <ManagerBags />
                        </div>
                        :
                        <div>Пусто. Кажется, пора искать клиентов.</div>
                    }
                </div>
                :
                <div>Функционал недоступен.</div>
            }
            </div>

        </DocumentTitle>
    );
};

export default ManagerClient;