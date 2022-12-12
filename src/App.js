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
import ManagerBags from "./components/ManagerBags";
import ManagerClients from "./components/ManagerClients";
import ManagerClient from "./components/ManagerClient";
import NavBar from "./components/NavBar";
import EditForm from "./components/EditForm";
import ManagerRange from "./components/ManagerRange";
import HomeNew from "./pages/NEW";
// const LoginPage = lazy(() => import('./Auth'));
// const Register = lazy(() => import('./Registration'));

function App() {
  return (
      <DocumentTitle title = 'Shop100'>
        <BrowserRouter basename="/" >
          <div>
            <NavBar/>
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
               <Route exact path={'/manager/add'}>
                <AddForm/>
              </Route>
              <Route exact path={'/manager/edit'}>
                <EditForm/>
              </Route>
              <Route exact path={'/manager/range/:rangeId'}>
                <ManagerRange/>
              </Route>
              <Route exact path={'/manager/clients'}>
                <ManagerClients/>
              </Route>
              <Route exact path={'/manager/clients/:clientId'}>
                <ManagerClient/>
              </Route>
              <Route exact path={'/new'}>
                <HomeNew/>
              </Route>
            </Switch>
          </div>
        </BrowserRouter>

      </DocumentTitle>
  );
}



export default App;