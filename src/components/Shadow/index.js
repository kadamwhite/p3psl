import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import ScreenReaderText from '../ScreenReaderText';
import { groupWeaknesses } from '../../isomorphic-utils/weaknesses';
import { shadow } from '../../lib/shapes';
import './Shadow.css';

const ArcanaMessage = ({ arcana }) => arcana ? (
  <p className="arcana">
    A shadow of the <strong>{ arcana }</strong> Arcana
  </p>
) : null;

const hasStats = (shadow) => (
  shadow.lvl || shadow.hp || shadow.sp
);

const Stats = ({ shadow, color }) => hasStats(shadow) ? (
  <div className="stats">
    <table style={{ borderColor: color.secondary }}>
      <thead>
        <tr style={{ background: color.secondary }}>
          <th>Level</th>
          <th>HP</th>
          <th>SP</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>{ shadow.lvl }</td>
        <td>{ shadow.hp }</td>
        <td>{ shadow.sp }</td>
      </tr>
      { shadow.location ? (
        <tr>
          <td className="location" colSpan="3">
            { shadow.location }
          </td>
        </tr>
      ) : null }
      </tbody>
    </table>
  </div>
) : null;

const Elements = ({ elements }) => (
  <div className="elements">
    <ScreenReaderText>
      Elemental resistances:
    </ScreenReaderText>
    { groupWeaknesses(elements).map((str) => (
      <p key={str}>
        <strong>{ str.replace(/\s.*$/, '') }</strong>
        &nbsp;{ str.replace(/^\S+\s/, '') }
      </p>
    )) }
  </div>
)

// const Shadow = ({ shadow, color }) => {
const Shadow = (props) => {
  const { shadow, color } = props;
  return (
    <li className="shadow" style={{ borderColor: color.secondary }}>
      <h2>
        <Link
          style={{ color: color.secondary }}
          to={ `/${ shadow.slug }/` }
        >
          { shadow.name }
        </Link>
      </h2>

      <ArcanaMessage arcana={ shadow.arcana } />

      <Stats { ...{ shadow, color } } />

      <Elements elements={shadow.weaknesses} />

      <div className="skills">
        <p>Skills:</p>
        <ul className="skills">
          { shadow.skills.map((skill) => (
            <li key={skill}>{ skill }</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

Shadow.propTypes = {
  color: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }),
  shadow: shadow.isRequired,
};

export default Shadow;
