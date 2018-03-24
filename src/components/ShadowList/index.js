import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ScreenReaderText from '../ScreenReaderText';
import { groupWeaknesses } from '../../isomorphic-utils/weaknesses';
import './ShadowList.css';

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
    <table
      style={{ borderColor: color.secondary }}
    >
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

const Shadow = ({ shadow, color }) => (
  <li className="shadow">
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
