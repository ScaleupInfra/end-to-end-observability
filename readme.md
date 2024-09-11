# End-to-End Observability Hello World Application

This project demonstrates an end-to-end observability setup using the Grafana stack: **Grafana**, **Prometheus**, **Loki**, and **Tempo**. The application uses **OpenTelemetry (OTel)** to generate traces and metrics, and **Winston-Loki** to produce logs.

## Stack Overview
- **Grafana**: Visualization of metrics, traces, and logs.
- **Prometheus**: Metrics collection and storage.
- **Loki**: Logs aggregation.
- **Tempo**: Distributed tracing backend.
- **OpenTelemetry (OTel)**: Traces and metrics generator.
- **Winston-Loki**: Logging integration for Loki.

## Prerequisites
Make sure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/)

## Getting Started

### 1. Install Node.js Dependencies
Run the following command to install the required dependencies for the Node.js application:
```bash
npm install
```

### 2. Start the Observability Stack
Use Docker Compose to bring up the Grafana stack:
```bash
docker-compose up -d
```
This will spin up the following services:
 - Grafana on [localhost:3000](localhost:3000)
 - Prometheus on [localhost:9090](localhost:9090)
 - Loki on [localhost:3100](localhost:3100)
 - Tempo on [localhost:3200](localhost:3200)

### 3. Run the Application
Once the services are up and running, start the application with the following command:
```bash
node -r ./tracer.js index.js
```