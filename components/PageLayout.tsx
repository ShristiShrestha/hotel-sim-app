import React, { ReactElement } from "react";
import { Layout } from "antd";

const { Header, Content } = Layout;

type Props = {
    _header_menu: ReactElement;
    _content: ReactElement;
};

const PageLayout = (props: Props) => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                {props._header_menu}
            </Header>
            <Content style={{ padding: "24px" }}>
                <div className="site-layout-content">{props._content}</div>
            </Content>
        </Layout>
    );
};

export default PageLayout;
