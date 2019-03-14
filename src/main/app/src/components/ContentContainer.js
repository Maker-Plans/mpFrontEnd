import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Categories from '../pages/Categories';
import Articles from '../pages/Articles';

const ContentContainer = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/categories" component={Categories} />
        <Route path="/categories/:id" component={Categories} />
        <Route path="/articles" component={Articles} />
        <Route path="/articles/:categoryId" component={Articles} />
        <Route path="/articles/:categoryId/:articleId" component={Articles} />
    </Switch>
);

export default ContentContainer;
