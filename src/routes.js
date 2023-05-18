import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login} from './components/login';
import { Register } from './components/register.js';
import { OpenNews } from './components/opneNews.js';
import { Guardian } from './components/guardian.js';
import { NewYorkTimes } from './components/newYorkTimes.js';

const MainRoute = () => {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/open-news" component={OpenNews} />
        <Route path="/guardian" component={Guardian} />
        <Route path="/new-york-times" component={NewYorkTimes} />
      </BrowserRouter>
    );
  };

export default MainRoute;

  