const opentelemetry = require('@opentelemetry/sdk-node')
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node')
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc')
// const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const dotenv = require("dotenv")
dotenv.config()

const sdk = new opentelemetry.NodeSDK({
  // traceExporter: new ConsoleSpanExporter(),
  traceExporter: new OTLPTraceExporter(),
  instrumentations: [getNodeAutoInstrumentations()],
})
sdk.start()
