import React, {Component} from 'react';
import {Link, useHistory} from "react-router-dom";
import DocumentTitle from 'react-document-title'


export const Home = () => {
    return (
        <DocumentTitle title = 'Shop100'>

            <div>
                <h1>Добро пожаловать на Shop100!</h1>
                <Link to="/range">Посмотреть ассортимент!</Link>
            </div>

        </DocumentTitle>
    );
};

export default Home;