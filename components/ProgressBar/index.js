import React from 'react';
import PropTypes from 'prop-types';

import Filler from './Filler';

function ProgressBar({ percentage }) {
  return (
    <>
      <div className="progress-bar">
        <Filler percentage={percentage} />
      </div>
      <style jsx>{`
        .progress-bar {
          border: 1px solid var(--action-primary);
          border-radius: 20px;
          width: 100%;
          height: 37px;
        }
      `}</style>
    </>
  );
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressBar;
