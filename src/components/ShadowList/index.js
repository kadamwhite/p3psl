import React from 'react';
import PropTypes from 'prop-types';
import Shadow from '../Shadow';
import './ShadowList.css';

const ShadowList = ({ color, slugs, shadows }) => (
  <ul className="shadow-list">
    { slugs.map((id) => {
      const shadow = shadows[id];
      if (!shadow) {
        return null;
      }
      return (
        <Shadow
          key={shadows[id].slug}
          color={color}
          shadow={shadows[id]}
        />
      );
    }) }
  </ul>
);

ShadowList.propTypes = {
  slugs: PropTypes.arrayOf(PropTypes.string).isRequired,
  shadows: PropTypes.object.isRequired,
};

export default ShadowList;
