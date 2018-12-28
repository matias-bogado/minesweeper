// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import * as yup from 'yup';
import { Col, Row, Input, List, Button } from 'antd';
import { URL_VIEW_GAME_PAGE } from "../../constants/urls";
import currentUser from "../../redux/modules/currentUser/currentUser.containers";
import gameList from "../../redux/modules/gameList/gameList.containers";
import type {
  CurrentUserMapDispatchToProps,
  CurrentUserMapStateToProps
} from "../../redux/modules/currentUser/currentUser.containers";
import type {
  GameListMapDispatchToProps,
  GameListMapStateToProps
} from "../../redux/modules/gameList/gameList.containers";
import CreateGameModal from "../../components/CreateGameModal/CreateGameModal";
import classNames from "classnames";
import InputError from "../../components/InputError/InputError";
import './HomePage.scss';

const Search = Input.Search;

type Props = CurrentUserMapDispatchToProps & CurrentUserMapStateToProps &
  GameListMapDispatchToProps & GameListMapStateToProps & {};

type GameStatus = 'IN_PROGRESS' | 'WON' | 'LOST';

type State = {
  showCreateGameModal: boolean;
  searchHasErrors: boolean;
}

class HomePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showCreateGameModal: false,
      searchHasErrors: false
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.currentUser.email && !this.props.currentUser.email) {
      this.props.gameListReset();
    }
  }

  render() {
    // mock games
    const data = this.props.gameListData || [];

    return (
      <div className="home-page">
        <Row>
          <Col span={12} offset={6}>
            <h3>Start a new game or resume a previous one.</h3>
            <Search
              className={this.state.searchHasErrors ? 'input--has-errors' : ''}
              placeholder="Enter your email"
              onSearch={this.handleSearch}
              size="large"
              enterButton="Lookup for games!"
            />
            {this.state.searchHasErrors ?
              <InputError error="Please enter a valid email and hit 'Search' again" /> : null
            }
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            {this.props.currentUser.email ? (
              <Button
                className="home-page__create-button"
                size="large"
                onClick={this.toggleCreateGameModalState}
              >Create a new game</Button>
            ) : null}
            <List
              itemLayout="horizontal"
              dataSource={data}
              locale={{
                emptyText: this.props.currentUser.email ?
                  <span>This account doesn't have any games</span> :
                  <span>Enter an email to find games</span>
              }}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<ListItemGameStatus gameStatus={item.status}/>}
                    title={<ListItemTitle gameName={item.name} gameId={item.id} gameStatus={item.status} />}
                    description=""
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
        <CreateGameModal
          visible={this.state.showCreateGameModal}
          onCloseRequest={this.toggleCreateGameModalState}
        />
      </div>
    )
  }

  handleSearch = (value: string) => {
    if (yup.string().required().email().isValidSync(value)) {
      this.setState(() => ({ searchHasErrors: false }));
      this.props.currentUserSetEmail({ email: value });
      this.props.getGameList();
    } else {
      this.setState(() => ({ searchHasErrors: true }));
    }
  };

  toggleCreateGameModalState = () => {
    this.setState((prevState: State) => ({ showCreateGameModal: !prevState.showCreateGameModal }));
  };
}

const ListItemTitle = (props: { gameName: string; gameStatus: GameStatus, gameId: number }) => {
  const { gameStatus } = props;
  return (
    <Link to={URL_VIEW_GAME_PAGE.replace(':gameId', props.gameId)}>
      <h4>{props.gameName} - &nbsp;
        <span className={classNames({
          'home-page__game-status': true,
          'home-page__game-status--in-progress': gameStatus === 'IN_PROGRESS',
          'home-page__game-status--won': gameStatus === 'WON',
          'home-page__game-status--lost': gameStatus === 'LOST'
        })}>
          {gameStatusText[gameStatus]}
        </span>
      </h4>
    </Link>
  )
};

const gameStatusText = {
  IN_PROGRESS: 'In progress',
  WON: 'Won',
  LOST: 'Lost'
};

// TODO: circle with bg color: yellow/green/red
const ListItemGameStatus = (props: { gameStatus: GameStatus }) => {
  return (
    <div>{props.gameStatus}</div>
  )
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...currentUser.mapStateToProps(state),
    ...gameList.mapStateToProps(state),
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...currentUser.mapDispatchToProps(dispatch),
    ...gameList.mapDispatchToProps(dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
