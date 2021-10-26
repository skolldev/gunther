import React from "react";
import Content from "../components/Content";
import PageHeaderWithActions from "../components/PageHeaderWithActions";

export default function Home() {
  return (
    <Content pageTitle="Dashboard">
      <PageHeaderWithActions pageTitle="Dashboard"></PageHeaderWithActions>
    </Content>
  );
}

Home.auth = true;
