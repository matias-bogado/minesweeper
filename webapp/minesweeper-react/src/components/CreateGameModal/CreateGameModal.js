import React, { Component } from 'react';
import withRouter from 'react-router-dom/withRouter';
import { connect } from 'react-redux';
import { Modal, Input, Row, Col } from 'antd';
import currentUser from "../../redux/modules/currentUser/currentUser.containers";
import createGame from "../../redux/modules/createGame/createGame.containers";
import type {
  CreateGameMapDispatchToProps,
  CreateGameMapStateToProps
} from "../../redux/modules/createGame/createGame.containers";
import type {
  CurrentUserMapDispatchToProps,
  CurrentUserMapStateToProps
} from "../../redux/modules/currentUser/currentUser.containers";

type Props = CurrentUserMapStateToProps & CurrentUserMapDispatchToProps &
  CreateGameMapDispatchToProps & CreateGameMapStateToProps & {
  visible: boolean;
  onCloseRequest: () => void
}

type State = {
  formValues: any
}

class CreateGameModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.props.createGameReset();

    this.state = {
      formValues: {
        email: this.props.currentUser.email,
        name: '',
        rows: '',
        columns: '',
        mines: ''
      }
    }
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <Modal
        title="Create a new game"
        visible={this.props.visible}
        onOk={this.handleCreateGame}
        onCancel={this.props.onCloseRequest}
      >
        <Row>
          <Col span={24}>
            <label>Your email</label>
            <Input {...this.getInputProps('email')} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label>Game name</label>
            <Input {...this.getInputProps('name')} />
          </Col>
        </Row>
        <Row>
          <Col span={7}>
            <label>Number of rows</label>
            <Input {...this.getInputProps('rows')} />
          </Col>
          <Col span={8} offset={1}>
            <label>Number of columns</label>
            <Input {...this.getInputProps('columns')} />
          </Col>
          <Col span={7} offset={1}>
            <label>Number of mines</label>
            <Input {...this.getInputProps('mines')} />
          </Col>
        </Row>
      </Modal>
    );
  }

  getInputProps(inputName: string) {
    // TODO: validate inputs
    return {
      placeholder: '',
      value: this.state.formValues[inputName],
      onChange: e => this.handleInputChange(e, inputName)
    }
  }

  handleInputChange = (event: any, inputName: string) => {
    event.persist();
    this.setState((prevState: State) => ({
      formValues: { ...prevState.formValues, [inputName]: event.target.value }
    }));
  };

  handleCreateGame = () => {
    console.log('formValues', this.state.formValues)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...currentUser.mapStateToProps(state),
    ...createGame.mapStateToProps(state),
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...createGame.mapDispatchToProps(dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateGameModal))
