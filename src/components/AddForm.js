import React, { useState, useEffect } from 'react';
import {Link, Route} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {checkIfStaff, updateIfStaff, userInfo} from "../store/UserSlice";
import {IP4} from "../store/pref";
import {fetchRange} from "../store/RangeSlice";
import {fetchModels,fetchAllModels, fetchProducers} from "../store/ModelSlice";



function AddForm(props) {
    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const [refresh, setRefresh] = useState(localStorage.getItem('refreshToken'))
    // const [refreshRequired, setRefreshRequired] = useState(false)
    const [userID, setUserId] = useState(localStorage.getItem('ID'))
    // const [loading, setLoading] = useState()
    // const [error, setError] = useState()
    const [newRange, setNewRange] = useState()
    const [newProducer, setNewProducer] = useState()
    const [newModel, setNewModel] = useState()
    const [formProducer, setFormProducer] = useState()
    const [formRange, setFormRange] = useState()
    const [formPrice, setFormPrice] = useState()
    const [formImage, setFormImage] = useState()
    const [formSize, setFormSize] = useState()
    const [formAmount, setFormAmount] = useState()
    const [formModel, setFormModel] = useState()

    const { range } = useSelector((state) => state.range);
    const { producers } = useSelector((state) => state.producers);
    const { isStaff } = useSelector((state) => state.isStaff);
    const { allModels } = useSelector((state) => state.allModels);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Add form');
        dispatch(fetchRange())
        dispatch(fetchProducers())
        dispatch(fetchAllModels())

    }, [])


    const add_range= e=>{
        e.preventDefault();
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${access}`  },
            body: JSON.stringify({
                    rangename:newRange
                })
            };
            fetch(`${IP4}range/`, requestOptions)
            setNewRange("")
        }

        const add_producer = e=>{
            e.preventDefault();
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${access}`  },
            body: JSON.stringify({
                    producername:newProducer
                })
            };
            fetch(`${IP4}producer/`, requestOptions)
            setNewProducer("")
        }
        const add_model= e=>{
            e.preventDefault();
            let range1=JSON.parse(document.getElementById('range_list').value)
            let producer1=JSON.parse(document.getElementById('producers_list').value)

            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${access}` },
            body: JSON.stringify({
                idrange:range1,
                modelname:newModel,
                idproducer:producer1,
                price:formPrice,
                image: formImage,
                })
            };
            fetch(`${IP4}models/`, requestOptions)
            setFormImage("")
            setFormPrice("")
            setNewModel("")
        }

        const add_stock = e=>{
            e.preventDefault();
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${access}`  },
            body: JSON.stringify({
                size:'',
                amount:0,
                idmodel:0,
                })
            };
            fetch(`${IP4}stock/`, requestOptions)
            setNewProducer("")
        }

        return (
            <div className="AddForm">
                {isStaff&&
                <div>
                <h1>Добавление </h1>
                    <form className="AddForm" onSubmit={add_range}>
                        <div>Категория одежды</div>
                        <input type="text" name="Категория одежды" value={newRange}
                               onChange={e => setNewRange(e.target.value)} placeholder="Название"/>
                        <input type="submit" name="submit" value="+"/>
                    </form>
                    <form className="AddForm" onSubmit={add_producer}>
                        <div>Производитель</div>
                        <input type="text" name="Производитель" value={newProducer}
                               onChange={e => setNewProducer(e.target.value)} placeholder="Производитель"/>
                        <input type="submit" name="submit" value="+"/>
                    </form>

                    <form className="AddForm" onSubmit={add_model}>
                        <div>Модель</div>

                        <input type="text" name="Модель" value={newModel}
                               onChange={e => setNewModel(e.target.value)} placeholder="Название"/>
                        <select name="range_list" id="range_list">
                            <option value="">Категория</option>
                            {range.map((item, index) => {
                                return <option key={index}
                                               value={JSON.stringify(item.rangeid)}>{item.rangename} </option>
                            })}
                        </select>
                        <select name="producers_list" id="producers_list">
                            <option value="">Производитель</option>
                            {producers.map((producer, index) => {
                                return <option key={index}
                                               value={JSON.stringify(producer.producerid)}>{producer.producername} </option>
                            })}
                        </select>
                        <input type="text" name="Цена" value={formPrice}
                               onChange={e => setFormPrice(e.target.value)} placeholder="Цена (руб.)"/>
                        <input type="text" name="Изображение" value={formImage}
                               onChange={e => setFormImage(e.target.value)} placeholder="Изображение"/>
                        <input type="submit" name="submit" value="+"/>
                    </form>

                    {/*<form className="AddForm" onSubmit={add_stock}>*/}
                    {/*    <div>Размер</div>*/}
                    {/*    <input type="text" name="Размеры" value={newProducer}*/}
                    {/*           onChange={e => setFormSize(e.target.value)} placeholder="Производитель"/>*/}
                    {/*    <input type="submit" name="submit" value="+"/>*/}

                    {/*</form>*/}
                </div>
                }
            </div>
        );

}


export default AddForm;