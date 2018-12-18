// @flow
import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { Col, Row, Input, List } from 'antd';
import { URL_VIEW_GAME_PAGE } from "../../constants/urls";

const Search = Input.Search;

type Props = {};
type GameStatus = 'IN_PROGRESS' | 'WON' | 'LOST';

class HomePage extends Component<Props> {
  render() {
    // mock games
    const data = [
      {
        id: 1,
        name: 'My new game',
        status: 'IN_PROGRESS'
      },
      {
        id: 2,
        name: 'My new game 2',
        status: 'WON'
      },
      {
        id: 3,
        name: 'My new game 3',
        status: 'LOST'
      },
    ];


    return (
      <div className="home-page">
        <Row>
          <Col span={12} offset={6}>
            <h3>Start a new game or resume a previous one.</h3>
            <Search
              placeholder="Enter your email"
              onSearch={value => console.log(value)}
              size="large"
              enterButton="Lookup for games!"
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
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
      </div>
    )
  }
}

const ListItemTitle = (props: { gameName: string; gameStatus: GameStatus, gameId: number }) => {
  return (
    <Link to={URL_VIEW_GAME_PAGE.replace(':gameId', props.gameId)}>
      <h4>{props.gameName} <span>{props.gameStatus}</span></h4>
    </Link>
  )
};

// TODO: circle with bg color: yellow/green/red
const ListItemGameStatus = (props: { gameStatus: GameStatus }) => {
  return (
    <div>{props.gameStatus}</div>
  )
};

export default HomePage;
