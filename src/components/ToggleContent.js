import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ToggleContent = ({ toggle, content }) => {
  const [isShown, setIsShown] = useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  return (
    <Fragment>
      {toggle({ show })}
      {isShown && content({ hide })}
    </Fragment>
  );
};

ToggleContent.propTypes = {
  toggle: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired
};

export default ToggleContent;