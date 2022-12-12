
import React, { useState, useEffect } from 'react';
import {Link, Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAccess as updateAccess}  from "../store/UserSlice" ;


function Auth(props){
    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const [refresh, setRefresh] = useState(localStorage.getItem('refreshToken'))
    const [refreshRequired, setRefreshRequired] = useState(false)
    const [loading, setLoading] = useState()
    const [formUsername, setFormUsername] = useState()
    const [formPassword, setFormPassword] = useState()
    const [ firstName, setFirstName] = useState('')
    const [ lastName, setLastName] = useState('')
    const [ username, setUsername] = useState('')
    const [ email, setEmail] = useState('')
    const [ dateJoined, setDateJoined] = useState('')
    const [ error, setError] = useState()
    const dispatch = useDispatch();

    useEffect(() => {
        if (access) {
            fetch(
                'http://localhost:8000/api/user',
                {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${access}`,
                    },

                }
            )
                .then(response => {
                    console.log(response)
                    if (response.ok) {
                        // dispatch(updateAccess(access));
                        return response.json()

                    }
                    else {
                        if (response.status === 401) {
                            // dispatch(updateAccess(access));

                            throw Error('refresh')
                        }
                        throw Error(`Something went wrong: code ${response.status}`)
                    }
                })
                .then(({data}) => {
                    setFirstName(data.first_name)
                    setLastName(data.last_name)
                    setUsername(data.username)
                    setEmail(data.email)
                    setDateJoined(data.date_joined)
                    setError(null)
                    localStorage.setItem('userId', data.id)

                })
                .catch(error => {
                    console.log(`ОШибка:${error.message}`)
                    if (error.message === 'refresh') {
                        setRefreshRequired(true)
                    } else {
                        console.log(error)
                        setError('Ошибка, подробности в консоли')
                    }
                })
        }
    }, [access])


    useEffect(() => {

        if (refreshRequired) {
            fetch(
                'http://localhost:8000/api/token/refresh',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({ refresh })
                }
            )
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw Error(`Something went wrong: code ${response.status}`)
                    }
                })
                .then(({access, refresh}) => {
                    localStorage.setItem('accessToken', access)
                    setAccess(access)
                    localStorage.setItem('refreshToken', refresh)
                    // setRefresh(refresh)
                    setError(null)
                    dispatch(updateAccess(access));

                })
                .catch(error => {
                    console.log(error)
                    setError('Ошибка, подробности в консоли')
                })
        }
    }, [refreshRequired])


    const submitHandler = e => {
        e.preventDefault();
        setLoading(true);
        fetch(
            'http://localhost:8000/api/token/obtain',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    username: formUsername,
                    password: formPassword,
                })
            }
        )
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error(`Something went wrong: code ${response.status}`)
                }
            })
            .then(({access, refresh}) => {
                localStorage.setItem('accessToken', access)
                setAccess(access)
                localStorage.setItem('refreshToken', refresh)
                setRefresh(refresh)
                setError(null)
                setError(null)
                dispatch(updateAccess(access));
            })
            .catch(error => {
                console.log(error)

                setError('Ошибка, подробности в консоли')
            })
            .finally(setLoading(false))
    }
    console.log(access)
    return (
        <div className="App">
            {error?
                <div>
                Сессия завершена.<Link to={"/logout"}>Перезайдите</Link>.
                </div> : null}
            {!access?
                loading? "Загрузка..." :
                    <form className="loginForm" onSubmit={submitHandler}>
                        <input type="text" name="username" value={formUsername} onChange={e => setFormUsername(e.target.value)} placeholder="Username"/>
                        <input type="password" name="password" value={formPassword} onChange={e => setFormPassword(e.target.value)} placeholder="Password"/>
                        <input type="submit" name="submit" value="Войти"/>
                    </form>
                :
                !error?
                    <div className="Profile">
                        <h1>{firstName} {lastName}</h1>
                        <h2>{username}</h2>
                        <p>email: {email}</p>
                        <p>Профиль создан {dateJoined}</p>
                        <Link to={`/logout`}>Выйти.</Link>

                    </div>


                    :
                    null
            }
        </div>
    );
}



export default Auth;