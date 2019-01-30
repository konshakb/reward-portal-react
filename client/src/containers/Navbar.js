import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'

class Navbar extends Component {
    state = {};
    componentWillMount() {
        this.setState({ fixed: true})
    }
    renderLinks() {
        if (this.props.authenticated) {
            return (
                <div>
                    <Link to='/feature'>
                        <Button as='a' inverted={!true} primary={true} style={{ marginLeft: '0.5em' }}>
                            Feature
                        </Button>
                    </Link>
                     <Link to='/signout'>
                        <Button as='a' inverted={!true} primary={true} style={{ marginLeft: '0.5em' }}>
                            Sign Out
                        </Button>
                    </Link>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Link to='/signin'>
                        <Button as='a' inverted={!true}>
                            Sign in
                        </Button>
                    </Link>
                    <Link to='/signup'>
                        <Button as='a' inverted={!true} primary={true} style={{ marginLeft: '0.5em' }}>
                            Sign Up
                        </Button>
                    </Link>
                </div>
            )
        }
    }
    
    render() {
        const { fixed } = this.state
        return (
            <Menu
                fixed={fixed ? 'top' : null}
                inverted={fixed}
                secondary={!fixed}
                size='large'
                >
                <Container>
                        <Menu.Item as='a' active>
                    <Link to='/'>
                        Home
                    </Link>
                        </Menu.Item>
                <Menu.Item position='right'>
                    <Link to='/signin'>
                        <Button as='a' inverted={!true}>
                            Sign in
                        </Button>
                    </Link>
                    <Link to='/signup'>
                        <Button as='a' inverted={!true} primary={true} style={{ marginLeft: '0.5em' }}>
                            Sign Up
                        </Button>
                    </Link>
                </Menu.Item>
                </Container>
            </Menu>

        )
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Navbar);