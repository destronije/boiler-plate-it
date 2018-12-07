const react = require('./lib/react/react');
const reactReducer = require('./lib/react/generators/reducer');

const express = require('./lib/express/express');
const expressController = require('./lib/express/generators/controller');

exports.config = {
  "frontend": {
    "react": {
      "class": react,
      "generators": {
        "reducer": reactReducer
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
