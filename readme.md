docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management

docker-compose build ; docker-compose up

### Kill process on port
netstat -ano | findstr :<PORT>
taskkill /F /PID <PID>

minikube start --memory 3000 --cpus 2

minikube stop