import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import Renderers from './Renderers';

function MarkdownRender({ source }) {
  console.log('source', source);
  return <ReactMarkdown source={source} renderers={Renderers} />;
}

MarkdownRender.propTypes = {
  source: PropTypes.string.isRequired,
};

export default MarkdownRender;
