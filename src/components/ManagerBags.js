import React,{useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import DocumentTitle from 'react-document-title'
import {useSelector, useDispatch} from "react-redux";
import {checkIfStaff, updateIfStaff, userInfo} from "../store/UserSlice";
import {fetchBagStates, fetchClientBags, fetchManagerBags, putBag} from "../store/ManagerSlice";
export const ManagerBags = () => {
    // const { user } = useSelector((state) => state.user);
    const { clientId} = useParams();
    const { isStaff } = useSelector((state) => state.isStaff);
    const { managerClient } = useSelector((state) => state.managerClient);
    const { managerBags } = useSelector((state) => state.managerBags);
    const { bagStates } = useSelector((state) => state.bagStates);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            if(localStorage.getItem('userId')!=='null'){
                await dispatch(userInfo(localStorage.getItem('userId')))
                    .then((originalPromiseResult) => {
                        console.log('USER FETCHED')
                        console.log(originalPromiseResult.payload)
                        if(isStaff){
                            dispatch(fetchClientBags(clientId));
                        }
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        console.log('ERROR APPEARED WHILE USER FETCHING')
                        console.log(rejectedValueOrSerializedError)
                    })
                    .then(async()=>{
                        if(isStaff){
                            await dispatch(fetchBagStates())
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
                    {managerBags.length>0?
                        <div className={'client_bags'}>
                            {managerBags.map((bag,index) => (

                            <div className={"client_bag"} key={index}>
                                <div>Заказ №{bag.bagid}</div>
                                <div>Клиент: {bag.idclient.username} </div>
                                <div>дата: {bag.date}</div>
                                <div>сумма: {bag.sum} р.</div>
                                <div>Статус:</div>

                                <select name="bagstate_list" id="bagstate_list"
                                onChange={e=>{
                                    e.preventDefault();
                                    let newBagState=Number(e.target.value)
                                    if(newBagState!==1){
                                    console.log(e.target.value)
                                    console.log('abcde')
                                    let data={
                                        bagid:bag.bagid,
                                        idclient:bag.idclient.id,
                                        sum:bag.sum,
                                        date:bag.date,
                                        bagstate:newBagState
                                    }
                                    dispatch(putBag(data))
                                    }
                                }}
                                >
                                <option value={JSON.stringify(bag.bagstate.id)}>{bag.bagstate.statename}</option>
                                {bagStates.map((item, index1) => {
                                    return <option key={index1}
                                                   value={JSON.stringify(item.id)}>{item.statename} </option>
                                })}
                        </select>



                            </div>

                        ))}
                        </div>
                        :
                        <div>Пусто. Заказов ещё нет.</div>
                    }
                </div>
                :
                <div>Функционал недоступен.</div>
            }
            </div>

        </DocumentTitle>
    );
};

export default ManagerBags;