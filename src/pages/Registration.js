import React, {Component} from 'react';
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
import {updateUsername, updatePassword, updateEmail, addUser} from "../store/UserSlice";


export const Registration=()=>{
    const { username } = useSelector((state) => state.username);
    const { email } = useSelector(state => state.email);
    const { password } = useSelector(state => state.password);
    const { userStatus } = useSelector(state => state.userStatus);
    const { userError } = useSelector(state => state.userError);
    const dispatch = useDispatch();

    return(
        <div>
            <div className={"assortment"}>
                Регистрация
            </div>
            <form className={"reg_form"}>
                <input type={"text"} placeholder={"Имя пользователя"} className={"username_input"}
                       value={username}
                       onChange={(event)=>dispatch(updateUsername(event.target.value))}/>

                <input type={"text"} placeholder={"Почта"} className={"email_input"}
                       value={email}
                       onChange={(event)=>dispatch(updateEmail(event.target.value))}/>

                <input type={"text"} placeholder={"Пароль"} className={"password_input"}
                       value={password}
                       onChange={(event)=>dispatch(updatePassword(event.target.value))}/>
            </form>
            <input id="reg_button" className="reg_button" type="submit" value="Создать аккаунт"
                   onClick={()=>{dispatch(addUser({
                       username:username,
                       email:email,
                       password:password,
                   }))}}/>

            {userStatus===SuccessMessage&&
                <div className={"success-message"}><div>Аккаунт успешно создан :)</div></div>
            }
            {userStatus===ErrorMessage&&
                <div className={"error-message"}><div>Ошибка: {userError}</div></div>
            }

        </div>

    )

}

export default Registration;