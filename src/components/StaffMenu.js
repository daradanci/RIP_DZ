import React,{useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import DocumentTitle from 'react-document-title'
import {useSelector, useDispatch} from "react-redux";

export const StaffMenu = () => {


    return (
        <DocumentTitle title = 'Staff'>

            <div>
                <div className={'range_list'}>
                    <div className={'range'}>
                        <Link to={"/add"}>Добавить</Link>
                    </div>
                </div>
            </div>

        </DocumentTitle>
    );
};

export default StaffMenu;