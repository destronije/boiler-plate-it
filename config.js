const react = require('./lib/react/react');
const reactReducer = require('./lib/react/generators/reducer');
const reactComponent = require('./lib/react/generators/component');

const express = require('./lib/express/express');
const expressController = require('./lib/express/generators/controller');

exports.config = {
  "frontend": {
    "react": {
      "class": react,
      "generators": {
        "reducer": reactReducer,
        "component": reactComponent
      }
    }
  },
  "backend": {
    "express": {
      "class": express,
      "generators": {
        "controller": expressController
      }
    }
  }
};
