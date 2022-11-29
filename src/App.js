import { BrowserRouter, Route, Link, Switch, Redirect} from "react-router-dom";
import React, {Component} from "react";
import './App.css';
import DocumentTitle from 'react-document-title'
import BackButton from "./components/BackButton";
import Home from "./pages/Home";
import Range from "./pages/Range";
import RangeModels from "./pages/RangeModels";
import Model from "./pages/Model"
import Bag from "./pages/Bag"
import Registration from "./pages/Registration"
import Auth from "./pages/Auth"
import Logout from "./pages/Logout"
import AddForm from "./components/AddForm";
import { lazy, Suspense } from 'react';

// const LoginPage = lazy(() => import('./Auth'));
// const Register = lazy(() => import('./Registration'));

function App() {

  return (
      <DocumentTitle title = 'Shop100'>
        <BrowserRouter basename="/" >
          <div>
            <div className={"navbar"}>
              <div className={"nav-tabs"}>
                <Link to="/">Дом</Link>
              </div>
              <div className={"nav-tabs"}>
                <Link to="/range">Ассортимент</Link>
              </div>
              <div className={"nav-tabs"}>
                <Link to="/bag">Корзина</Link>
              </div>
              <div className={"nav-tabs"}>
                <Link to="/reg">Регистрация</Link>
              </div>
              <div className={"nav-tabs"}>
                <Link to="/auth">Вход</Link>
              </div>
              <div className={"nav-tabs"}>
                  <Link to="/logout">Выход</Link>
              </div>
            </div>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route exact path="/range">
                <Range/>
                <BackButton/>
              </Route>
              <Route exact path={`/range/:rangeId/models`}>
                <RangeModels/>
                <BackButton/>
              </Route>
              <Route exact path={'/range/:rangeId/models/:modelId'}>
                <Model/>
                <BackButton/>
              </Route>
              <Route exact path={'/bag'}>
                <Bag/>
                <BackButton/>
              </Route>
              <Route exact path={'/reg'}>
                <Registration/>
                <BackButton/>
              </Route>
              <Route exact path={'/auth'}>
                <Auth/>
              </Route>
              <Route exact path={'/logout'}>
                <Logout/>
              </Route>
               <Route exact path={'/add'}>
                <AddForm/>
              </Route>
            </Switch>
          </div>
        </BrowserRouter>

      </DocumentTitle>
  );
}



export default App;