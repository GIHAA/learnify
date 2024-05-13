### Deply using Docker Compose 

 ```bash
cd backend
docker-compose build
docker-compose up
 ```

### Deply using Minikibe

 ```bash
cd backend 
minikube start
kubectl apply -f deployment
minikube tunnel
