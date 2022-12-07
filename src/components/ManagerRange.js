import React,{useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import DocumentTitle from 'react-document-title'
import {useSelector, useDispatch} from "react-redux";
import {checkIfStaff, updateIfStaff, userInfo} from "../store/UserSlice";
import StaffMenu from "../components/StaffMenu";
import {fetchRange, fetchRangeElement} from "../store/RangeSlice";
import {fetchModels, fetchPrices} from "../store/ModelSlice";
import ManagerModel from "./ManagerModel";
export const EditForm = () => {
    const { user } = useSelector((state) => state.user);
    const { isStaff } = useSelector((state) => state.isStaff);
    const { range } = useSelector((state) => state.range);
    const {models} = useSelector((state) => state.models);
    const {rangeElement} = useSelector(state => state.rangeElement);
    const {rangeId} = useParams();

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
            await dispatch(fetchRangeElement(rangeId))
                .then((originalPromiseResult) => {
                    console.log('RANGE EL. FETCHED in RangeModels.js')
                    console.log(originalPromiseResult.payload)
                })
                .catch((rejectedValueOrSerializedError) => {
                    console.log('ERROR APPEARED WHILE RANGE EL. FETCHING in RangeModels.js')
                    console.log(rejectedValueOrSerializedError)
                })
                .then(()=>{
                dispatch(fetchModels(rangeId))
                })
                .then((originalPromiseResult) => {
                    console.log('MODELS FETCHED in RangeModels.js')
                    console.log(originalPromiseResult.payload)
                })
                .catch((rejectedValueOrSerializedError) => {
                    console.log('ERROR APPEARED WHILE MODELS FETCHING in RangeModels.js')
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
                        {/*<div className={"assortment"}>{rangeElement.rangename}</div>*/}
                        {models.map((model, index)=>(

                        <div>
                            <li key={index}>
                                    {/*<div className={"model_info"}>*/}

                                    {/*    <div className={"model_name"}>*/}
                                    {/*        <Link*/}
                                    {/*            to={`/range/${rangeId}/models/${model.modelid}/`}>{model.modelname}</Link>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={"price"}>Цена: {model.price} руб.</div>*/}
                                    {/*    <Link to={`/range/${rangeId}/models/${model.modelid}/`}>*/}
                                    {/*        <img src={"/images/" + model.image} alt={"model_image:" + model.image}*/}
                                    {/*             width={"200px"} className={"image"}/>*/}
                                    {/*    </Link>*/}
                                    {/*</div>*/}
                                <ManagerModel {...model}/>
                                <div>

                                </div>
                            </li>
                        </div>

                        ))}
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