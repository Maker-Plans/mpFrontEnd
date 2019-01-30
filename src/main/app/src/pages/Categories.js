import React from 'react';
import { Layout } from 'antd';

import CategoryList from '../components/CategoryList';

const { Sider, Content } = Layout;

const Categories = () => (
    <Layout>
        <Sider theme="light" >
            <CategoryList />
        </Sider>
        <Content style={{ minHeight: 280 }}>
                   CategoryDetailView
        </Content>
    </Layout>
);

export default Categories;
