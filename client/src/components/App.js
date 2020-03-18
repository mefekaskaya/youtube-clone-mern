import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "./auth";
// pages for this product
import Home from "./views/Home/Home.js";
import LoginPage from "./views/User/LoginPage.js";
import RegisterPage from "./views/User/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import UploadVideo from './views/VideoPage/UploadVideoPage';
import DetailVideo from './views/VideoPage/DetailVideoPage';
import SubscriptionPage from './views/Subscription/SubscriptionPage';

export default function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(UploadVideo, true)} />
          <Route exact path="/video/:videoId" component={Auth(DetailVideo, null)} />
          <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

