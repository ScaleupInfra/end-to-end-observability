const express = require('express');
const logger = require('./logger');
const meter = require('./meter');
// const tracer = require('./tracer');

// Create an Express app
const app = express();

// Define a custom metric (e.g., a request counter)
const requestCounter = meter.createCounter('http_requests', {
  description: 'Counts HTTP requests',
});

// Middleware to increment the counter on every request
app.use((req, res, next) => {
  // Increment the request counter
  // const span = tracer.startSpan('incoming_request', {
  //   attributes: {
  //     method: req.method,
  //     route: req.path,
  //   },
  // });
  logger.info(`Received request for ${req.url}`);
  requestCounter.add(1, { method: req.method, route: req.path });

  // End the span when the request is complete
  // res.on('finish', () => {
  //   span.end();
  // });

  next();
});

// Define a simple route
app.get('/', (req, res) => {
  // const span = tracer.startSpan('handle_root_request');

  // Simulate some work
  setTimeout(() => {
    res.send('Hello, World!');
    // span.end();
  }, 100);
});

// Start the server
app.listen(5000, () => {
  logger.info('Server is running on http://localhost:5000');
});
