import React,{useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import DocumentTitle from 'react-document-title'
import {useSelector, useDispatch} from "react-redux";
import {checkIfStaff, updateIfStaff, userInfo} from "../store/UserSlice";
import StaffMenu from "../components/StaffMenu";
import {fetchRange, fetchRangeElement} from "../store/RangeSlice";
import {fetchModels, fetchPrices, fetchProducers} from "../store/ModelSlice";
import {IP4} from "../store/pref";
import {putBag} from "../store/ManagerSlice";
export const ManagerModel = (curr_model) => {
    const { user } = useSelector((state) => state.user);
    const { isStaff } = useSelector((state) => state.isStaff);
    const { range } = useSelector((state) => state.range);
    const { producers } = useSelector((state) => state.producers);
    const {models} = useSelector((state) => state.models);
    const {rangeId} = useParams();
    const [access, setAccess] = useState(localStorage.getItem('accessToken'))

    const [newModel, setNewModel] = useState(curr_model.modelname)
    const [formProducer, setFormProducer] = useState(curr_model.idproducer.producername)
    const [formRange, setFormRange] = useState(curr_model.idrange.rangename)
    const [formPrice, setFormPrice] = useState(curr_model.price)
    const [formImage, setFormImage] = useState(curr_model.image)



    const dispatch = useDispatch();


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
                dispatch(fetchModels(rangeId, true))
                })
                .then((originalPromiseResult) => {
                    console.log('MODELS FETCHED in RangeModels.js')
                    console.log(originalPromiseResult.payload)
                })
                .catch((rejectedValueOrSerializedError) => {
                    console.log('ERROR APPEARED WHILE MODELS FETCHING in RangeModels.js')
                    console.log(rejectedValueOrSerializedError)
                })
        dispatch(fetchRange())
        dispatch(fetchProducers())
            setNewModel(curr_model.modelname)
            setFormProducer(curr_model.idproducer.producername)
            setFormRange(curr_model.idrange.rangename)
            setFormPrice(curr_model.price)
            setFormImage(curr_model.image)

        }


        fetchData()

    }, [])

            const add_model= e=>{
            e.preventDefault();
            let range1=JSON.parse(document.getElementById('range_list').value)
            let producer1=JSON.parse(document.getElementById('producers_list').value)

            const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${access}` },
            body: JSON.stringify({
                modelid:curr_model.modelid,
                idrange:range1,
                modelname:newModel,
                idproducer:producer1,
                price:formPrice,
                image: formImage,
                })
            };
            alert(`Изменено!`)
            fetch(`${IP4}models/${curr_model.modelid}/`, requestOptions)
                dispatch(fetchModels(rangeId, true))
                dispatch(fetchRange())
                window.location.reload(false);
            // setFormImage("")
            // setFormPrice("")
            // setNewModel("")
        }
        const del=()=>{
            const requestOptions = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${access}`},
            }
            fetch(`${IP4}models/${curr_model.modelid}/`, requestOptions)
            alert(`Удалено!`)
            window.location.reload(false);


        }
    return (
        <DocumentTitle title = 'Shop100'>
            <div>
            {isStaff ?
                <div>
                    {curr_model.modelname}
                    <form className="AddForm" onSubmit={add_model}>
                        <input type="text" name="Модель" value={newModel}
                               onChange={e => setNewModel(e.target.value)} placeholder="Название"/>
                        <select name="range_list" id="range_list"
                        onChange={e=>{
                                    e.preventDefault();
                                    let newRange=Number(e.target.value)
                                    console.log(e.target.value)
                                    setFormRange(newRange);
                                }}>
                            <option value={curr_model.idrange.rangeid}>{formRange}</option>
                            {range.map((item, index) => {
                                return <option key={index}
                                               value={JSON.stringify(item.rangeid)}>{item.rangename} </option>
                            })}
                        </select>
                        {/*<select name="producers_list" id="producers_list"*/}
                        {/*onChange={e=>{*/}
                        {/*            e.preventDefault();*/}
                        {/*            let newProducer=Number(e.target.value)*/}
                        {/*            console.log(e.target.value)*/}
                        {/*            setFormProducer(newProducer);*/}
                        {/*        }}>*/}
                        {/*    <option value={curr_model.idproducer.producerid}>{formProducer}</option>*/}
                        {/*    {producers.map((producer, index) => {*/}
                        {/*        return <option key={index}*/}
                        {/*                       value={JSON.stringify(producer.producerid)}>{producer.producername} </option>*/}
                        {/*    })}*/}
                        {/*</select>*/}
                        <input type="text" name="Цена" value={formPrice}
                               onChange={e => setFormPrice(e.target.value)} placeholder="Цена (руб.)"/>
                        <input type="text" name="Изображение" value={formImage}
                               onChange={e => setFormImage(e.target.value)} placeholder="Изображение"/>
                        <input type="submit" name="submit" value="+"/>
                    </form>
                    <input type="submit" name="submit" onClick={()=>{del()}} value="X"/>



                </div>
                :
                <h1>Функционал недоступен.</h1>
            }
            </div>

        </DocumentTitle>
    );
};

export default ManagerModel;