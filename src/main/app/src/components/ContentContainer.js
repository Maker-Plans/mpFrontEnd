import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Categories from '../pages/Categories';

const ContentContainer = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/categories" component={Categories} />
        <Route path="/categories/:id" component={Categories} />
    </Switch>
);

export default ContentContainer;
