import React,{useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import DocumentTitle from 'react-document-title'
import {useSelector, useDispatch} from "react-redux";
import {checkIfStaff, updateIfStaff, userInfo} from "../store/UserSlice";
import {fetchManagerClients} from "../store/ManagerSlice";

export const ManagerClients = () => {
    const { user } = useSelector((state) => state.user);
    const { isStaff } = useSelector((state) => state.isStaff);
    const { managerClients } = useSelector((state) => state.managerClients);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            if(localStorage.getItem('userId')!=='null'){
                await dispatch(userInfo(localStorage.getItem('userId')))
                    .then((originalPromiseResult) => {
                        console.log('USER FETCHED')
                        console.log(originalPromiseResult.payload)
                        if(isStaff){
                            dispatch(fetchManagerClients());
                        }
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        console.log('ERROR APPEARED WHILE MANAGER FETCHING')
                        console.log(rejectedValueOrSerializedError)
                    })
                    .then(async()=>{

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
                    {managerClients.length>0?
                        <div>
                            {managerClients.map((item,index) => (
                            <div className={"clientInfo"} key={index}>
                                Пользователь: {item.username} {item.first_name} {item.last_name}
                                {item.is_staff && <> (staff) </>}
                                 <> email: {item.email} </>
                                <Link to={`/manager/clients/${item.id}`}> Заказы </Link>
                             </div>

                        ))}
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

export default ManagerClients;