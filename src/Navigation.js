import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/open-news">Open News</Link>
        </li>
        <li>
          <Link to="/guardian">Guardian</Link>
        </li>
        <li>
          <Link to="/new-york-times">New York Times</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
