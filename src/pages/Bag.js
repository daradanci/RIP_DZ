import React, {Component} from 'react';
import {Link} from "react-router-dom";
import DocumentTitle from 'react-document-title'
import ErrorComponent from "../components/ErrorComponent";
import {IP4} from "../store/pref";


class Bag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            client:{},
            purchases:[],
            sum: 0,
            bag:{},
            bags:[],
            toDelete:null,
            bagStates:[],

        }
        this.bagId=0;
    }
    componentDidMount() {
        // this.load_bag_states();
        if(localStorage.getItem('userId')!=='null'){

        this.load_client();
        this.load_bag();
        this.load_purchases();
        this.load_bags();
        // this.load_sum();
        }
    }
    load_bag(){
        const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                };
        const res = fetch(`http://127.0.0.1:8000/client/${localStorage.getItem('userId')}/bag/`, requestOptions)
        .then (res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded:true,
                    bag: result[0],
                    sum:result[0]['sum']
                });
            }
        )
    }
    load_bags(){
        const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                };
        const res = fetch(`http://127.0.0.1:8000/client/${localStorage.getItem('userId')}/bags/`, requestOptions)
        .then (res => res.json())
        .then(
            (result) =>{
                // let temp=result;
                // temp.splice(temp[0],1)
                this.setState({
                    isLoaded:true,
                    bags: result,
                });
                console.log(result)
            }
        )
            // .then(()=>{
            //     this.load_bag_states()
            // })
    }
    load_client(){
        const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                };
        const res = fetch(`http://127.0.0.1:8000/client/${localStorage.getItem('userId')}`, requestOptions)
        .then (res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded:true,
                    client: result,
                });
            }
        )
    }
    load_purchases(){
        const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                };
        const res = fetch(`http://127.0.0.1:8000/client/${localStorage.getItem('userId')}/current_bag/`, requestOptions)
        .then (res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded:true,
                    purchases: result,
                });
            }
        )

    }
    load_bag_states(){
        const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                };
        const res = fetch(`http://127.0.0.1:8000/state/`, requestOptions)
        .then (res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded:true,
                    bagStates: result,
                });

            }
        )


    }

    render() {
        const {error, isLoaded,bag,bags, purchases, sum, bagStates} = this.state;
        // console.log(purchases);
        const decline=(purchase)=>{
            let item=purchase.idstock;
            const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`  },
                    body: JSON.stringify({ itemid:item.itemid, idmodel:item.idmodel.modelid, size: item.size, amount: item.amount+1 })
                };
            fetch(`http://127.0.0.1:8000/stock/${item.itemid}/`, requestOptions)
            this.setState({
                sum:this.state.sum-purchase.idstock.idmodel.price*purchase.quantity
            })
            const deleteOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`  },
                };
            fetch(`http://127.0.0.1:8000/purchase/${purchase.purchaseid}/`, deleteOptions)
                .then(response=> {
                    this.load_purchases();
                })
            alert(`Удалено из корзины: ${ purchase.idstock.idmodel.modelname } - ${purchase.idstock.size}`)
        }
        const buy=()=>{
            const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                };
            fetch(`http://127.0.0.1:8000/client/${localStorage.getItem('userId')}/bag/1/buy/`, requestOptions)
                .then(response=>{
                    this.load_purchases();
                    this.load_bags();
                    this.load_bag();
                    this.setState({sum:0})
                    // this.load_sum();
                    // this.setState({
                    //     bag:{}
                    // })

                    alert(`Покупки оплачены!`)
                })

        }
        if (localStorage.getItem('accessToken')==='')
            return (<div><ErrorComponent/></div>)
        return (
            <DocumentTitle title = 'Корзина'>
            <div>
                <div className={"bag_title"}>Корзина</div>
                <div className={'bag'}>
                {purchases.map((purchase)=>(
                    <div key={"purchaseId:"+purchase.purchaseid} className={'purchase'}>
                            <img src={"/images/"+purchase.idstock.idmodel.image} align={'top'}
                                     alt={"model_image:"+purchase.idstock.idmodel.image} height={'100px'} className={"small_image"}/>
                        <div className={'purchase_description'}>

                        <div className={'purchase_name'} align={'center'}>
                        {purchase.idstock.idmodel.modelname} {purchase.idstock.size} - {purchase.quantity} шт.
                        </div>

                        <div className={'purchase_price'}>
                            Цена: {purchase.idstock.idmodel.price} руб.
                        </div>
                        </div>

                        <input id="delete_purchase_button" className={'delete_purchase_button'}
                               type="submit" value="X" onClick={()=>{
                                   decline(purchase)
                        }}/>

                    </div>
                ))}
                </div>
                {sum>0&&<div>Итого: {sum} руб.</div>}

                {sum>0 &&
                    <input id="buy_bag_button" className={'buy_bag_button'}
                               type="submit" value="Оплатить" onClick={buy}/>
                }
                {!sum&&
                <div className={'error_message'}>Корзина пуста.</div>
                }
                {bags.length>0&&
                <div className={'assortment'}>Предыдущие заказы</div>
                }
                {bags.map((item,index)=>(
                    <div key={index} className={'old_bag'}>
                        Заказ от {item.date} на сумму {item.sum} руб.:{item.bagstate.statename}
                    </div>
                    ))
                }


            </div>
            </DocumentTitle>
        );


    }
}


export default Bag;