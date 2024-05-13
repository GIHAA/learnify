# Project Deployment Guide

## Prerequisites
- Docker and Docker Compose installed
- Minikube and kubectl installed for Kubernetes deployment
- Node.js and npm installed (for any local dependency management)
- Git installed (for cloning the repository)

## General Setup
1. Clone the repository:
   ```
   https://github.com/GIHAA/learnify
   ```

2. Navigate to the project directory:
   ```
   cd learnify
   ```

## Frontend Setup (React.js)
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the React application (optional for local testing without Docker):
   ```
   npm start
   ```

## Backend Setup and Deployment

### Deploy using Docker Compose
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Build the Docker images:
   ```
   docker-compose build
   ```

3. Launch the containers:
   ```
   docker-compose up
   ```

### Deploy using Minikube (Kubernetes)
1. Start Minikube:
   ```
   minikube start
   ```

2. Apply the Kubernetes configurations:
   ```
   kubectl apply -f deployment
   ```

3. Enable external access to the services:
   ```
   minikube tunnel
   ```

## Accessing the Application
- Once the servers are running, the frontend should be accessible via the browser on the host machine at `http://localhost:3000` (adjust port as necessary based on your React app's configuration).
