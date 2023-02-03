import React from "react";
import {Divider, Layout} from "antd";
import styled from "styled-components";
import FileNav from "../page_nav/FileNav";
import {ResText14SemiBold} from "../../www/utils/TextUtils";
import PlanNav from "../planner_nav/PlanNav";
import FileName from "../planner_nav/FileName";

const { Header, Content } = Layout;

const TitleDiv = styled.div`
  background: white;
  line-height: 20px;
  padding: 20px 24px 0;
`;
const FileNavDiv = styled.div<{ color?: string }>`
  display: inline-flex;
  column-gap: 28px;
  align-items: center;
  padding-left: 16px;
  width: 100vw;
  background: ${(props) => props.color || "white"};

  .ant-menu::before {
    display: none;
  }
`;

export default function MainLayout() {
  return (
    <Layout className="layout">
      <Header className={"main-layout-header"}>
        <TitleDiv>
          <ResText14SemiBold> Hotel Simulation </ResText14SemiBold>
        </TitleDiv>
        <FileNavDiv>
          <FileNav />
        </FileNavDiv>
        <Divider />
        <FileNavDiv color={"#f8f8f8"}>
          <FileName />
          <PlanNav />
        </FileNavDiv>
      </Header>
      <Content className={"main-layout-content"}></Content>
    </Layout>
  );
}
