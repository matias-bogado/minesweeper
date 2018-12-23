// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import { Col, Row } from 'antd';

type Props = {
  location: any;
};

class ViewGamePage extends Component<Props> {
  constructor(props: Props) {
    super(props);

    console.log(props);
  }

  componentDidMount() {

  }

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


export default withRouter(ViewGamePage);
