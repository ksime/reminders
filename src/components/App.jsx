import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as actions from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addReminder = this.addReminder.bind(this);
    this.renderReminders = this.renderReminders.bind(this);
    this.deleteReminder = this.deleteReminder.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      text: event.target.value,
    });
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group col-sm-4">
        {reminders.map(reminder => (
          <li key={reminder.id} className="list-group-item">
            <div className="list-item ">
              <div>{reminder.text}</div>
              <div>
                <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
              </div>
            </div>
            <Button
              bsStyle="danger"
              bsSize="xsmall"
              className="list-item delete-button"
              onClick={() => this.deleteReminder(reminder.id)}
            >
              &#x2715;
            </Button>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="title">Reminder App</div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have to ..."
              onChange={this.handleInputChange}
            />
            <input
              className="form-control"
              type="datetime-local"
              onChange={event => this.setState({ dueDate: event.target.value })}
            />
          </div>
          <Button type="button" bsStyle="success" onClick={this.addReminder}>
            Add Reminder
          </Button>
        </div>
        {this.renderReminders()}
        <Button bsStyle="danger" onClick={() => this.props.clearReminders()}>
          Clear Reminders
        </Button>
      </div>
    );
  }
}

App.propTypes = {
  reminders: PropTypes.arrayOf(PropTypes.object),
  addReminder: PropTypes.func,
  deleteReminder: PropTypes.func,
  clearReminders: PropTypes.func,
};

App.defaultProps = {
  reminders: [],
  addReminder: (text, dueDate) => ({ type: 'ADD_REMINDER', text, dueDate }),
  deleteReminder: id => ({ type: 'DELETE_REMINDER', id }),
  clearReminders: () => ({ type: 'CLEAR_REMINDERS' }),
};

export default connect(state => ({ reminders: state }), actions)(App);
