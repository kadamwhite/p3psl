import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import LogoHeader from '../components/Logo';

const Header = ({ collapsed }) => (
  <header className={ classNames({ collapsed }) }>
    <Link to="/">
      <LogoHeader />
    </Link>
  </header>
);

Header.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  // Collapse when scrolled down or when searching
  collapsed: !!(state.collapsed || state.filters.search),
});

export default connect(mapStateToProps)(Header);
