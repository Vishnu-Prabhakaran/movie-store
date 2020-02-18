import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Collapse = styled.div.attrs({
  classname: 'collapsed navbar-Collapse'
})``;

const List = styled.div.attrs({
  className: 'navbar-nav mr-auto'
})``;

const Item = styled.div.attrs({
  className: 'collapse navbar-collapse'
})``;

class Links extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to='/' className='navbar-brand'>
          {' '}
          Movie Studio
        </Link>
        <Collpse>
          <List>
            <Item>
              <Link to='/' className='nav-link'>
                {' '}
                Movies
              </Link>
            </Item>
            <Item>
              <Link to='/create' className='nav-link'>
                {' '}
                Create Movie
              </Link>
            </Item>
          </List>
        </Collpse>
      </React.Fragment>
    );
  }
}

export default Links;
