import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  Icon
} from 'semantic-ui-react'
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Nihal Employee Recognition'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content=''
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Link to='/signin'>
      <Button primary size='huge'>
          Get Started
        <Icon name='right arrow' />
      </Button>
    </Link>
  </Container>
)

export default HomepageHeading;