import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import TurndownService from 'turndown';
import Renderers from './Renderers';

const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

const turndownService = new TurndownService();

function MarkdownRender({ source }) {
  return (
    <ReactMarkdown
      source={turndownService.turndown(source)}
      renderers={Renderers}
    />
  );
}

MarkdownRender.propTypes = {
  source: PropTypes.string.isRequired,
};

export default MarkdownRender;
