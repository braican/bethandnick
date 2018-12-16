import React from 'react';
import PropTypes from 'prop-types';

import './infobox.scss';

const InfoBox = ({ weddingDate, venueName }) => {
  return (
    <div className="infobox">
      {/* <p className="infobox__wedding-info">
        <span className="wedding-info__date">{weddingDate}</span>
        <br />
        <span className="wedding-info__venue">at {venueName}</span>
      </p> */}
    </div>
  );
};

InfoBox.propTypes = {
  weddingDate: PropTypes.string,
  venueName: PropTypes.string
};

export default InfoBox;
