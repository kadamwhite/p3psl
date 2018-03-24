import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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

const mapStateToProps = (state, ownProps) => ({
  // Collapse when scrolled down or when searching
  collapsed: !!(
    // Collapsed if we know we're collapsed
    state.collapsed ||
    // Show as collapsed when filtering
    state.filters.search ||
    // Show as collapsed on single shadow pages
    ownProps.match.params.shadow
  ),
});

export default withRouter(connect(mapStateToProps)(Header));
