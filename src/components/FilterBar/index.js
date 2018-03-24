import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './FilterBar.css';

class FilterBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  render() {
    const { onKeyUp, onSubmit } = this;
    const { color } = this.props;
    return (
      <form
        className="filters"
        style={{
          borderColor: color.primary,
          background: color.secondary,
        }}
        onSubmit={ onSubmit }
      >
        <input
          type="text"
          name="search"
          placeholder="Filter List..."
          onKeyUp={ onKeyUp }
        />
        <button className="screen-reader-text" type="submit">Search</button>
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
