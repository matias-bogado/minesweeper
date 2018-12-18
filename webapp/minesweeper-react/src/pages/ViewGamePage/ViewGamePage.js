// @flow
import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { Col, Row } from 'antd';

type Props = {};

class ViewGamePage extends Component<Props> {
  render() {
    return (
      <div className="view-game-page">
        <Row>
          <Col span={12} offset={6}>
            <h3>Play.</h3>
          </Col>
        </Row>
      </div>
    )
  }
}


export default ViewGamePage;
