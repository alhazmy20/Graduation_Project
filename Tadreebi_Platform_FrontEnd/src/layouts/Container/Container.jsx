import React from "react";
import { Row, Col } from "antd";
import "./Container.scss";

const Container = (props) => {
  return (
    <Row
      justify="center"
      align="top"
      className={`${props.className} container-layout`}
    >
      <Col lg={props.colLg} sm={24} xs={24}>
        <section>{props.children}</section>
      </Col>
    </Row>
  );
};

export default Container;
