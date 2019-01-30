import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Categories from '../pages/Categories';
import NewCategory from '../pages/NewCategory';

const ContentContainer = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/categories" component={Categories} />
        <Route path="/new-category" component={NewCategory} />
    </Switch>
);

export default ContentContainer;
