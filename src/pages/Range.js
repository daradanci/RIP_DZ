import React,{useEffect, useState} from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import {ErrorMessage, SuccessMessage, LoadingMessage} from "../store/pref";
import {useSelector, useDispatch} from "react-redux";
import {fetchRange, fetchRangeElement} from "../store/RangeSlice";

export const Range=()=>{
    const { range } = useSelector((state) => state.range);
    const {rangeStatus} = useSelector(state => state.rangeStatus)
    const {rangeError} = useSelector(state => state.rangeError)
    const dispatch = useDispatch();



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



    return(
        <div>
            {rangeStatus === SuccessMessage &&
                <div>
                    <div className={"assortment"}>Ассортимент</div>
                    <div className={"range_list"}>

                        {range.map(item => (
                            <div className={"range"} key={"rangeId:" + item.rangeid}>
                                <Link to={`/range/${item.rangeid}/models/`}>{item.rangename}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {rangeStatus===LoadingMessage&&
                <div className={"loading-message"}><h1>Загрузка...</h1></div>
            }
            {rangeStatus===ErrorMessage&&
                <div className={"error-message"}><h1>Ошибка: {rangeError}</h1></div>
            }
        </div>

    )

}

export default Range;

