import React,{useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import DocumentTitle from 'react-document-title'
import {useSelector, useDispatch} from "react-redux";
import {checkIfStaff, updateIfStaff, userInfo} from "../store/UserSlice";
import StaffMenu from "../components/StaffMenu";
import {fetchRange} from "../store/RangeSlice";
export const EditForm = () => {
    const { user } = useSelector((state) => state.user);
    const { isStaff } = useSelector((state) => state.isStaff);
    const { range } = useSelector((state) => state.range);

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

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchRange())
                .then((originalPromiseResult) => {
                    console.log('RANGE FETCHED')
                    console.log(originalPromiseResult.payload)
                })
                .catch((rejectedValueOrSerializedError) => {
                    console.log('ERROR APPEARED WHILE RANGE FETCHING')
                    console.log(rejectedValueOrSerializedError)
                })
        }


        fetchData()

    }, [])
    return (
        <DocumentTitle title = 'Shop100'>
            <div>
            {isStaff ?
                <div>
                    <h1>Изменение данных о товарах.</h1>
                    <div>
                        <div className={"assortment"}>Классификация товаров:</div>
                        <div className={"range_list"}>

                            {range.map(item => (
                                <div className={"range"} key={"rangeId:" + item.rangeid}>
                                    <Link to={`/manager/range/${item.rangeid}/`}>{item.rangename}</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                :
                <h1>Функционал недоступен.</h1>
            }
            </div>

        </DocumentTitle>
    );
};

export default EditForm;