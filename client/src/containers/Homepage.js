import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter} from 'react-router-dom';
import { Segment, Visibility } from 'semantic-ui-react';
import Navbar from './Navbar';

class DesktopContainer extends Component {
  state = {}
      
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  render() {
    const { children } = this.props
    console.log('this.props', this.props.location);
    return (
      <div>
        <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
          <Segment
            inverted={this.props.location.pathname === '/' ? true : false} // Enables inverted background only on hgome
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
            >
          <Navbar />
        {children}
        </Segment>
        </Visibility>
      </div>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

export default withRouter(DesktopContainer);