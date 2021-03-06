'use strict';

import React from 'react';
import FRC from 'formsy-react-components';

import UserActions from 'actions/UserActions';

const UserRemoveModal = React.createClass({
  removeUser(e) {
    e && e.preventDefault();
    UserActions.remove(this.props.id, () => {
      this.props.close();
    });
  },

  render() {
    return (
      <form className="form-horizontal form" onSubmit={this.removeUser}>
        <h1>Remove {this.props.login}</h1>
        <p>Are you sure?</p>
        <FRC.Row layout="horizontal">
          <input className="btn btn-primary" type="submit" value="Remove" />
          <span> </span>
          <input className="btn btn-default" type="reset" value="Cancel" onClick={this.props.close} />
        </FRC.Row>
      </form>
    );
  }
});

export default UserRemoveModal;
