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
import {fetchModels, fetchPrices, updateSearchValue, updatePrices, setIsOpen} from "../store/ModelSlice";
import {fetchRangeElement} from "../store/RangeSlice";
import ReactSlider from "react-slider";

export const RangeModels=()=>{
    const {models} = useSelector((state) => state.models);
    const {modelStatus} = useSelector(state => state.modelStatus);
    const {modelError} = useSelector(state => state.modelError);
    const {rangeElement} = useSelector(state => state.rangeElement);
    const {rangeStatus}=useSelector(state=>state.rangeStatus);
    const {maxPrice}=useSelector(state=>state.maxPrice);
    const {minPrice}=useSelector(state=>state.minPrice);
    const {maxBorder}=useSelector(state=>state.maxBorder);
    const {minBorder}=useSelector(state=>state.minBorder);
    const {search_input}=useSelector(state=>state.search_input);
    const {isOpen}=useSelector(state=>state.isOpen);
    const dispatch = useDispatch();
    const {rangeId} = useParams();

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
            await dispatch(fetchPrices(rangeId))
                .then((originalPromiseResult) => {
                    console.log('PRICES FETCHED in RangeModels.js')
                    console.log(originalPromiseResult.payload)
                })
                .catch((rejectedValueOrSerializedError) => {
                    console.log('ERROR APPEARED WHILE PRICE FETCHING in RangeModels.js')
                    console.log(rejectedValueOrSerializedError)
                })

        }


        fetchData()

    }, [])

    const filteredModels = models.filter(models=>{
        return models.modelname.toLowerCase().includes(search_input.toLowerCase())
    })
    // const update_search_value=(new_search_value)=>{
    //     this.setState({search_input:new_search_value});
    //     console.log(new_search_value);
    // }
    const itemCLickHandler=(event)=>{
        dispatch(updateSearchValue(event.target.textContent));
        dispatch(setIsOpen(!isOpen));
    }
    // const setIsOpen=(isOpened)=>{
    //     this.setState({isOpen:isOpened});
    // }
    const InputClickHandler=()=>{
        dispatch(setIsOpen(true));
    }

    return(
        <div>
            <form className={"search_form"}>
                <input type={"text"} placeholder={"Поиск"} className={"search_input"}
                       value={search_input} onClick={InputClickHandler}
                       onChange={(event)=>dispatch(updateSearchValue(event.target.value))}/>
                <ul className={"autocomplete"}>{
                    search_input && isOpen
                        ?
                        // filteredModels.map(model => (
                        filteredModels.map(model => (

                            <li className={"autocomplete_item"} onClick={itemCLickHandler}
                                key={"modelId:" + model.modelid}>{model.modelname}</li>

                        ))

                        : null
                }</ul>
                <div className={'container'}>
                    <ReactSlider
                        // defaultValue={[minPrice, maxPrice]}
                        value={[minPrice, maxPrice]}
                        className={'slider'} trackClassName={'tacker'}
                        min={minBorder} max={maxBorder}
                        step={100}
                        withTracks={true} pearling={true}
                        renderThumb={(props)=>{
                            return <div {...props} className={'thumb'}></div>
                        }}
                        renderTrack={(props)=>{
                            return <div {...props} className={'track'}></div>
                        }}
                        onChange={([min, max])=>{
                            dispatch(updatePrices({minPrice: min, maxPrice: max}))
                        }}
                    />

                    <div className={'values-wrapper'}>
                        <p>
                            Min:
                            <span>{minPrice} руб.</span>
                        </p>
                        <p>
                            Max:
                            <span>{maxPrice} руб.</span>
                        </p>
                    </div>
                </div>
            </form>

            {modelStatus === SuccessMessage &&
                <div>
                    <div className={"models_list"}>
                        {rangeStatus==='succeeded' &&
                        <div className={"assortment"}>{rangeElement.rangename}</div>
                        }



                        {filteredModels.map((model, index)=>(

                        <div>
                            <li key={index}>
                                {model.price >= minPrice && model.price <= maxPrice &&
                                    <div className={"model_info"}>

                                        <div className={"model_name"}>
                                            <Link
                                                to={`/range/${rangeId}/models/${model.modelid}/`}>{model.modelname}</Link>
                                        </div>
                                        {/*<div className={"producer"}>Производитель: {model.producer}</div>*/}
                                        <div className={"price"}>Цена: {model.price} руб.</div>
                                        <Link to={`/range/${rangeId}/models/${model.modelid}/`}>
                                            <img src={"/images/" + model.image} alt={"model_image:" + model.image}
                                                 width={"200px"} className={"image"}/>
                                        </Link>
                                    </div>
                                }
                            </li>
                        </div>

                        ))}

                    </div>


                </div>
            }
            {modelStatus===LoadingMessage&&
                <div className={"loading-message"}><h1>Загрузка...</h1></div>
            }
            {modelStatus===ErrorMessage&&
                <div className={"error-message"}><h1>Ошибка: {modelError}</h1></div>
            }
        </div>

    )

}

export default RangeModels;

