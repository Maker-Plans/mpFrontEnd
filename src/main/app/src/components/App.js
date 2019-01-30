import React from 'react';
import { withRouter } from 'react-router';
import { Layout } from 'antd';

import HeaderMenu from './HeaderMenu';
import ContentContainer from './ContentContainer';

const { Header, Content, Footer } = Layout;

const App = () => (
    <Layout>
        <Header className="header">
            <div className="logo" />
            <HeaderMenu />
        </Header>
        <Content>
            <ContentContainer />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
                    Ractoc.com ©2019 Created by Mark Schrijver
        </Footer>
    </Layout>
);

export default withRouter(App);
