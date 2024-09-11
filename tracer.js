// const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
// const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
// const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
// const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
// const { Resource } = require('@opentelemetry/resources');
// const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
// const { registerInstrumentations } = require('@opentelemetry/instrumentation');
// const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

// // Create a tracer provider
// const tracerProvider = new NodeTracerProvider({
//   resource: new Resource({
//     [SemanticResourceAttributes.SERVICE_NAME]: 'hello-world-app',  // Service name for tracing
//   }),
// });

// // Exporter for Tempo (OTLP over HTTP)
// const otlpExporter = new OTLPTraceExporter({
//   url: 'http://localhost:4318/v1/traces', // Tempo OTLP HTTP endpoint
// });

// // Console exporter to log traces to the console
// const consoleExporter = new ConsoleSpanExporter();

// // Add span processors
// tracerProvider.addSpanProcessor(new SimpleSpanProcessor(otlpExporter)); // Send spans to Tempo
// tracerProvider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter)); // Log spans to console

// // Register the tracer provider to begin collecting traces
// tracerProvider.register();

// // Enable auto-instrumentation for core Node.js and popular libraries
// registerInstrumentations({
//   instrumentations: [
//     getNodeAutoInstrumentations(), // Auto-instrument core modules and libraries (http, express, etc.)
//   ],
//   tracerProvider, // Ensure auto-instrumentation uses your tracer provider
// });

// // Create a tracer for manual traces
// const tracer = tracerProvider.getTracer('hello-world-tracer');

// module.exports = tracer;


const opentelemetry = require('@opentelemetry/sdk-node')
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node')
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http')
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const dotenv = require("dotenv")
dotenv.config()

const sdk = new opentelemetry.NodeSDK({
  // traceExporter: new ConsoleSpanExporter(),
  traceExporter: new OTLPTraceExporter({ url: 'http://localhost:4418/v1/traces' }),
  instrumentations: [getNodeAutoInstrumentations()],
})
sdk.start()
