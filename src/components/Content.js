import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderable } from '../lib/shapes';

class Content extends Component {
  constructor(props) {
    super(props);
    // this.onScroll = debounce(this.onScroll.bind(this));
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.contentContainer.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    this.contentContainer.removeEventListener('scroll', this.onScroll);
  }

  shouldComponentUpdate( nextProps ) {
    return (
      this.props.children !== nextProps.children ||
      this.props.LoadingSpinner !== nextProps.LoadingSpinner
    );
  }

  onScroll() {
    const { collapsed, onExpand, onCollapse } = this.props;
    if (!collapsed && this.contentContainer.scrollTop > 65) {
      onCollapse();
    } else if (collapsed && this.contentContainer.scrollTop <= 65) {
      onExpand();
    }
  }

  render() {
    const { children, className, LoadingSpinner } = this.props;
    const contentClasses = classNames(className, {
      loading: LoadingSpinner,
    });
    return (
      <div
        className={ contentClasses }
        ref={ node => { this.contentContainer = node } }
      >
        { LoadingSpinner ? (
          <LoadingSpinner />
        ) : (
          children
        )}
      </div>
    );
  }
}

Content.propTypes = {
  className: PropTypes.string,
  children: renderable.isRequired,
  collapsed: PropTypes.bool.isRequired,
  LoadingSpinner: PropTypes.func,
  onExpand: PropTypes.func.isRequired,
  onCollapse: PropTypes.func.isRequired,
};

Content.defaultProps = {
  className: 'content',
};

export default Content;
