import React, { Component } from 'react';
import { connect } from 'react-redux';
import selectN from 'selectn';
import Avatar from 'material-ui/Avatar';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import { logout } from '../../actions/session';

class AccountMenu extends Component {

  state = {
    open: false,
    anchorEl: null,
  };

  handleTouchTap = event => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <Avatar
          src={selectN('user.avatar_url', this.props)}
          className="app-bar-item"
          onClick={this.handleTouchTap}
        />
        <Popover
          open={this.state.open}
          onTouchTap={this.handleTouchTap}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Sign Out" onClick={this.props.logout} />
          </Menu>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = ({ session }) => ({ user: session.user });

export default connect(mapStateToProps, { logout })(AccountMenu);
