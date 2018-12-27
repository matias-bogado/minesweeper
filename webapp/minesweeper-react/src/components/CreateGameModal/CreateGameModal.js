import React, { Component } from 'react';
import * as yup from 'yup';
import withRouter from 'react-router-dom/withRouter';
import { connect } from 'react-redux';
import { Modal, Input, Row, Col, message } from 'antd';
import InputError from '../InputError/InputError'
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
import {URL_VIEW_GAME_PAGE} from "../../constants/urls";

type Props = CurrentUserMapStateToProps & CurrentUserMapDispatchToProps &
  CreateGameMapDispatchToProps & CreateGameMapStateToProps & {
  visible: boolean;
  onCloseRequest: () => void
}

type State = {
  formValues: any;
  formTouched: any;
  formErrors: any;
}

const validationSchema = yup.object().shape({
  email: yup.string().required('An email is required').email('This should be a valid email'),
  name: yup.string().required('A name for this game is required'),
  rows: yup
    .number()
    .required('Define a number of rows to play')
    .min(5, 'Min row number is 5')
    .max(50, 'Max row number is 50'),
  columns: yup
    .number()
    .required('Define a number of columns to play')
    .min(5, 'Min column number is 5')
    .max(50, 'Max column number is 50'),
  mines: yup
    .number()
    .required('Define a number of mines to play')
    .min(5, 'Min mines number is 5')
    .max(100, 'Max mines number is 100')
});

class CreateGameModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.props.createGameReset();

    this.state = {
      ...this.getInitialState()
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.visible && this.props.visible) {
      this.setState(() => this.getInitialState())
    }

    if (!prevProps.createGameData && this.props.createGameData) {
      message.success('Your new game has started');
      this.props.history.push(URL_VIEW_GAME_PAGE.replace(':gameId', this.props.createGameData.id));
      this.props.createGameReset();
    }

    if (!prevProps.createGameError && this.props.createGameError) {
      message.success('An error has occurred while creating your game. Try again later.');
      console.log(this.props.createGameError);
      this.props.createGameReset();
    }
  }

  render() {
    return (
      <Modal
        title="Create a new game"
        visible={this.props.visible}
        onOk={this.handleCreateGame}
        onCancel={this.props.onCloseRequest}
      >
        {this.renderContent()}
      </Modal>
    );
  }

  renderContent() {
    return this.props.visible ? (
      <React.Fragment>
        <Row>
          <Col span={24}>
            <label>Your email</label>
            <Input {...this.getInputProps('email')} />
            <InputError error={this.state.formTouched.email && this.state.formErrors.email} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label>Game name</label>
            <Input {...this.getInputProps('name')} />
            <InputError error={this.state.formTouched.name && this.state.formErrors.name} />
          </Col>
        </Row>
        <Row>
          <Col span={7}>
            <label>Number of rows</label>
            <Input {...this.getInputProps('rows')} />
            <InputError error={this.state.formTouched.rows && this.state.formErrors.rows} />
          </Col>
          <Col span={8} offset={1}>
            <label>Number of columns</label>
            <Input {...this.getInputProps('columns')} />
            <InputError error={this.state.formTouched.columns && this.state.formErrors.columns} />
          </Col>
          <Col span={7} offset={1}>
            <label>Number of mines</label>
            <Input {...this.getInputProps('mines')} />
            <InputError error={this.state.formTouched.mines && this.state.formErrors.mines} />
          </Col>
        </Row>
      </React.Fragment>
    ) : null;
  }

  getInitialState() {
    return {
      formValues: {
        email: this.props.currentUser.email,
        name: '',
        rows: '',
        columns: '',
        mines: ''
      },
      formTouched: {
        email: false,
        name: false,
        rows: false,
        columns: false,
        mines: false
      },
      formErrors: {
        email: '',
        name: '',
        rows: '',
        columns: '',
        mines: ''
      }
    }
  }

  getInputProps(inputName: string) {
    console.log(inputName, this.state.formValues[inputName])
    return {
      className: this.state.formTouched[inputName] && this.state.formErrors[inputName] ? 'input--has-error' : '',
      placeholder: '',
      value: this.state.formValues[inputName],
      onChange: e => this.handleInputChange(e, inputName),
      onBlur: () => this.handleInputTouched(inputName)
    }
  }

  handleInputChange = (event: any, inputName: string) => {
    event.persist();
    this.setState((prevState: State) => ({
      formValues: { ...prevState.formValues, [inputName]: event.target.value }
    }));
  };

  handleInputTouched = (inputName: string) => {
    this.setState((prevState: State) => {
      return {
        formTouched: {
          ...prevState.formTouched,
          [inputName]: true
        }
      }
    }, () => {
      this.evaluateInputErrors(inputName);
    });
  };

  evaluateInputErrors(inputName: string) {
    validationSchema.validateAt(inputName, this.state.formValues)
      .then(() => {
        this.setState((prevState: State) => ({
          formErrors: {
            ...prevState.formErrors,
            [inputName]: ''
          }
        }));
      })
      .catch((validationError) => {
        const { errors } = validationError;

        if (errors && errors.length) {
          this.setState((prevState: State) => ({
            formErrors: {
              ...prevState.formErrors,
              [inputName]: errors[0]
            }
          }));
        }
      })
  }

  handleCreateGame = () => {
    if (validationSchema.isValidSync(this.state.formValues)) {
      const { formValues } = this.state;

      this.props.currentUserSetEmail({ email: formValues.email });
      this.props.createGame({
        ownerEmail: formValues.email,
        name: formValues.name,
        numberOfColumns: formValues.columns,
        numberOfMines: formValues.mines,
        numberOfRows: formValues.rows
      });
    }
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
    ...currentUser.mapDispatchToProps(dispatch),
    ...createGame.mapDispatchToProps(dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateGameModal))
