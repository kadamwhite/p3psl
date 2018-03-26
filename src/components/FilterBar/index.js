import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './FilterBar.css';
import ScreenReaderText from '../ScreenReaderText';

const CloseIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 20 20">
    <rect
      x="0"
      y="0"
      width="20"
      height="20"
      fill={color.primary}
    />
    <line
      x1="4"
      y1="4"
      x2="16"
      y2="16"
      stroke={color.secondary}
      strokeWidth="2"
    />
    <line
      x1="4"
      y1="16"
      x2="16"
      y2="4"
      stroke={color.secondary}
      strokeWidth="2"
    />
  </svg>
);

class FilterBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onKeyUp(evt) {
    this.setState({
      searchTerm: evt.target.value,
    });
    this.props.onSearch(evt.target.value);
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.props.onSearch(this.state.searchTerm);
  }

  onClear(evt) {
    this.form.reset();
    this.setState({
      searchTerm: '',
    });
    this.props.onSearch('');
    // this.form.querySelector('input').focus();
  }

  render() {
    const { onKeyUp, onSubmit, onClear } = this;
    const { color } = this.props;
    return (
      <form
        className="filters"
        style={{
          borderColor: color.primary,
          background: color.secondary,
        }}
        ref={ (form) => { this.form = form; } }
        onSubmit={ onSubmit }
      >
        <input
          type="text"
          name="search"
          placeholder="Filter List..."
          onKeyUp={ onKeyUp }
        />
        <button
          className="clear"
          type="button"
          onClick={ onClear }
        >
          <CloseIcon color={ color } />
          <ScreenReaderText>Clear</ScreenReaderText>
        </button>
        <ScreenReaderText>
          <button type="submit">Search</button>
        </ScreenReaderText>
      </form>
    );
  }
}

FilterBar.propTypes = {
  color: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }).isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default FilterBar;
