import React from "react";
import { Divider, Layout } from "antd";
import styled from "styled-components";
import FileMenu from "../menu/FileMenu";
import { ResText14SemiBold } from "../../www/utils/TextUtils";
import PlannerMenu from "../menu/PlannerMenu";
import HotelNameCard from "../card/HotelNameCard";

const { Header, Content } = Layout;

const TitleDiv = styled.div`
  background: white;
  line-height: 20px;
  padding: 20px 24px 0;
`;

const FileMenuDiv = styled.div<{ color?: string }>`
  width: 100vw;
  display: inline-flex;
  column-gap: 28px;
  align-items: center;
  padding-left: 16px;
  height: 32pt;
  background: ${(props) => props.color || "white"};

  .ant-menu::before {
    display: none;
  }
`;

export default function BodyLayout() {
  return (
    <Layout className="layout">
      <Header className={"main-layout-header"}>
        <TitleDiv>
          <ResText14SemiBold> Hotel Simulation </ResText14SemiBold>
        </TitleDiv>
        <FileMenuDiv>
          <FileMenu />
        </FileMenuDiv>
        <Divider />
        <FileMenuDiv color={"#f8f8f8"}>
          <HotelNameCard />
          <PlannerMenu />
        </FileMenuDiv>
      </Header>
      <Content className={"main-layout-content"}></Content>
    </Layout>
  );
}
