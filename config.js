const react = require('lib/react/react');
const reactReducer = require('lib/react/generators/reducer');

const express = require('lib/express/express');
const expressController = require('lib/express/generators/controller');

module.export = {
  "frontend": {
    "react": {
      "class": react.default,
      "generators": {
        "reducer": reactReducer.default
      }
    }
  },
  "backend": {
    "express": {
      "class": express.default,
      "generators": {
        "controller": expressController.default
      }
    }
  }
};
