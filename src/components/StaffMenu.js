import React,{useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import DocumentTitle from 'react-document-title'
import {useSelector, useDispatch} from "react-redux";

export const StaffMenu = () => {


    return (
        <DocumentTitle title = 'Staff'>

            <div>
                <div className={'manager_choices_list'}>
                    <div className={'manager_choice'}>
                        <Link to={"/manager/add"}>Добавить</Link>
                    </div>
                    <div className={'manager_choice'}>
                        <Link to={"/manager/edit"}>Изменить</Link>
                    </div>
                    <div className={'manager_choice'}>
                        <Link to={"/manager/clients"}>Наши клиенты</Link>
                    </div>
                </div>
            </div>

        </DocumentTitle>
    );
};

export default StaffMenu;