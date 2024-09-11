// const { NodeSDK } = require('@opentelemetry/sdk-node');
// const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
// const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
// const { MeterProvider, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
// const { Resource } = require('@opentelemetry/resources');
// const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { MeterProvider } = require('@opentelemetry/sdk-metrics');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// Prometheus Exporter for metrics
const prometheusExporter = new PrometheusExporter({
  port: 9464,             // Port where metrics will be exposed
  endpoint: '/metrics',    // Endpoint for Prometheus to scrape
}, () => {
  console.log('Prometheus scrape endpoint: http://localhost:9464/metrics');
});

// MeterProvider for manual metrics instrumentation
const meterProvider = new MeterProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'hello-world-app',  // Use semantic attributes for service name
  }),
});

// Bind the PrometheusExporter as a MetricReader to the MeterProvider
meterProvider.addMetricReader(prometheusExporter);

// Create a meter from the meterProvider
const meter = meterProvider.getMeter('hello-world-meter');

module.exports = meter;


// Prometheus Exporter for metrics
// const prometheusExporter = new PrometheusExporter({
//   port: 9464,
//   endpoint: '/metrics',
// });

// // OTLP (Tempo) Trace Exporter
// const traceExporter = new OTLPTraceExporter({
//   url: 'http://tempo:4317', // Assuming Tempo is accessible at this URL
// });

// // Initialize OpenTelemetry SDK for manual instrumentation
// const sdk = new NodeSDK({
//   traceExporter,
//   resource: new Resource({
//     [SemanticResourceAttributes.SERVICE_NAME]: 'hello-world-service',
//   }),
// });

// sdk.start();
// console.log('Tracing initialized');

// // Create MeterProvider for manual metrics
// const meterProvider = new MeterProvider({
//   resource: new Resource({
//     [SemanticResourceAttributes.SERVICE_NAME]: 'hello-world-service',
//   }),
// });

// // Add Prometheus metric reader to the MeterProvider
// meterProvider.addMetricReader(
//   new PeriodicExportingMetricReader({
//     exporter: prometheusExporter,
//     exportIntervalMillis: 60000, // Export metrics every 60 seconds
//   })
// );

// // Create a meter for manual metrics
// const meter = meterProvider.getMeter('manual-metrics');

// // Graceful shutdown
// process.on('SIGTERM', () => {
//   sdk.shutdown()
//     .then(() => console.log('Tracing terminated'))
//     .catch((err) => console.log('Error terminating tracing', err))
//     .finally(() => process.exit(0));
// });

// module.exports = { sdk, meter };


