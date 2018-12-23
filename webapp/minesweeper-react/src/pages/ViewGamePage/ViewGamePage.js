// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import { Col, Row, Spin } from 'antd';
import currentGame from "../../redux/modules/currentGame/currentGame.containers";
import type {
  CurrentGameMapDispatchToProps,
  CurrentGameMapStateToProps
} from "../../redux/modules/currentGame/currentGame.containers";
import Minesweeper from "../../components/Minesweeper/Minesweeper";

type Props = CurrentGameMapDispatchToProps & CurrentGameMapStateToProps & {
  match: any;
};

class ViewGamePage extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.props.currentGameReset();
  }

  componentDidMount() {
    this.props.getCurrentGame({ gameId: this.props.match.params.gameId });
  }

  render() {
    return (
      <div className="view-game-page">
        {this.props.currentGameIsLoading ? this.renderLoading() : this.renderContent()}
      </div>
    )
  }

  renderLoading() {
    return (
      <Row>
        <Col span={12} offset={6}>
          <Spin size="large"/>
        </Col>
      </Row>
    )
  }

  renderContent() {
    return (
      <Row>
        <Col span={12} offset={6}>
          <h3>Play.</h3>
        </Col>
        <Col span={12} offset={6}>
          <Minesweeper game={this.props.currentGameData}/>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...currentGame.mapStateToProps(state),
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...currentGame.mapDispatchToProps(dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewGamePage));
