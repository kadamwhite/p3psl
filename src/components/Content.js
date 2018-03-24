import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compareProps from '../lib/compare-props';
import { renderable } from '../lib/shapes';

const hasObjectChanged = compareProps([
  'children',
  'LoadingSpinner',
  'location',
]);

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

  shouldComponentUpdate(nextProps) {
    return hasObjectChanged(this.props, nextProps);
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
    const loading = !!LoadingSpinner;

    return (
      <div className="content-wrapper">
        <div
          className={ classNames('content', { loading }) }
          ref={ node => { this.contentContainer = node } }
        >
          { LoadingSpinner ? (
            <LoadingSpinner />
          ) : (
            children
          )}
        </div>
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
