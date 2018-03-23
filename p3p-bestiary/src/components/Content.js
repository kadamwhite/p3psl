import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    return this.props.children !== nextProps.children;
  }

  onScroll() {
    const { collapsed, onExpand, onCollapse } = this.props;
    if ( ! collapsed && this.contentContainer.scrollTop > 65 ) {
      onCollapse();
    } else if ( collapsed && this.contentContainer.scrollTop <= 65 ) {
      onExpand();
    }
  }

  render() {
    const { children, className } = this.props;
    return (
      <div
        className={ className }
        ref={ node => { this.contentContainer = node } }
      >
        { children }
      </div>
    );
  }
}

Content.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.arrayOf( PropTypes.node ),
  ]).isRequired,
  collapsed: PropTypes.bool.isRequired,
  onExpand: PropTypes.func.isRequired,
  onCollapse: PropTypes.func.isRequired,
};

Content.defaultProps = {
  className: 'content',
};

export default Content;
