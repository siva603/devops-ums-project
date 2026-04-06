# 🚀 Spring Boot CRUD with MySQL

\`\`\`
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.5)
\`\`\`

---

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Maven Build](#maven-build)
- [Docker Setup](#docker-setup)
- [Kubernetes Setup](#kubernetes-setup)
- [API Testing](#api-testing)
- [Swagger UI](#swagger-ui)
- [Logs](#logs)
- [Cleanup](#cleanup)

---

## ✅ Prerequisites

### 1️⃣ Check Java
\`\`\`bash
# Check Java version
java -version
javac -version

# Expected Output:
# openjdk version "21.0.10"
# javac 21.0.10

# Install Java 21 if not installed
sudo apt-get update
sudo apt-get install -y openjdk-21-jdk
\`\`\`

### 2️⃣ Set JAVA_HOME
\`\`\`bash
# Set JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export PATH=\$JAVA_HOME/bin:\$PATH

# Make it permanent
echo 'export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=\$JAVA_HOME/bin:\$PATH' >> ~/.bashrc
source ~/.bashrc

# Verify
echo \$JAVA_HOME
\`\`\`

### 3️⃣ Check Maven
\`\`\`bash
# Check Maven version
mvn --version

# Expected Output:
# Apache Maven 3.8.7
# Java version: 21.0.10

# Install Maven if not installed
sudo apt-get install -y maven
\`\`\`

### 4️⃣ Check Docker
\`\`\`bash
# Check Docker version
docker --version
docker compose version

# Install Docker if not installed
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=\$(dpkg --print-architecture) \
    signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/ubuntu \
    \$(. /etc/os-release && echo "\$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo systemctl start docker
sudo systemctl enable docker
\`\`\`

---

## ⚡ Quick Start

\`\`\`bash
# Clone the project
git clone <your-repo-url>
cd spring-boot-crud-with-mysql

# Run setup script
chmod +x setup.sh
./setup.sh
\`\`\`

---

## 🔧 Fix pom.xml (Important!)

\`\`\`bash
# Fix MySQL groupId (must be com.mysql not mysql)
sed -i 's|<groupId>mysql</groupId>|<groupId>com.mysql</groupId>|g' pom.xml

# Fix Java version to match installed Java
sed -i 's|<java.version>17</java.version>|<java.version>21</java.version>|' pom.xml

# Verify fixes
grep "java.version" pom.xml
grep -A3 "mysql" pom.xml
\`\`\`

### ✅ Correct MySQL dependency in pom.xml:
\`\`\`xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
\`\`\`

---

## 🌍 Environment Variables

### Create .env file
\`\`\`bash
cat > .env << 'EOF'
# Database Configuration
DB_HOST=mysql
DB_PORT=3306
DB_NAME=userdb
DB_USERNAME=root
DB_PASSWORD=root

# Server Configuration
SERVER_PORT=8080
EOF
\`\`\`

### View .env file
\`\`\`bash
cat .env
\`\`\`

---

## 🏗️ Maven Build

\`\`\`bash
# Clean and build project (skip tests)
mvn clean package -DskipTests

# Clean and build with tests
mvn clean package

# Just compile
mvn compile

# Run tests only
mvn test

# Verify build
ls -lh target/*.jar

# Expected Output:
# -rw-r--r-- 1 root root 45M Mar 26 target/user-management-service-1.0.0.jar
\`\`\`

---

## 🐳 Docker Setup

### Dockerfile
\`\`\`dockerfile
# Use official OpenJDK 21 slim image
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy JAR file
COPY target/user-management-service-1.0.0.jar app.jar

# Expose port
EXPOSE 8080

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

### Build Docker Image
\`\`\`bash
# Build image
docker build -t user-management-service:1.0.0 .

# Verify image
docker images | grep user-management-service

# Expected Output:
# user-management-service   1.0.0   abc123   2 min ago   500MB
\`\`\`

### Docker Compose Commands
\`\`\`bash
# Start all services (MySQL + App)
docker compose up -d

# Start with fresh build
docker compose up -d --build

# Check running containers
docker ps

# Stop all containers
docker compose down

# Stop and remove volumes
docker compose down -v

# Restart all services
docker compose restart

# Restart specific service
docker compose restart app
docker compose restart mysql
\`\`\`

### Access MySQL Container
\`\`\`bash
# Access MySQL shell
docker exec -it mysql-db mysql -u root -proot

# Inside MySQL - useful commands
SHOW DATABASES;
USE userdb;
SHOW TABLES;
SELECT * FROM users;
DESC users;
EXIT;
\`\`\`

### Access App Container
\`\`\`bash
# Access app shell
docker exec -it spring-boot-app /bin/bash

# Check app files inside container
ls -lh /app
\`\`\`

---

## ☸️ Kubernetes Setup

### Load Docker Image to Kubernetes
\`\`\`bash
# Load image into k8s
docker save user-management-service:1.0.0 | \
    sudo ctr -n k8s.io images import -

# Verify image loaded
sudo ctr -n k8s.io images list | grep user-management-service
\`\`\`

### Apply Kubernetes Manifests
\`\`\`bash
# Apply all manifests
kubectl apply -f k8s/namespace.yml
kubectl apply -f k8s/mysql-secret.yml
kubectl apply -f k8s/mysql-pv.yml
kubectl apply -f k8s/mysql-pvc.yml
kubectl apply -f k8s/mysql-deployment.yml
kubectl apply -f k8s/mysql-service.yml
kubectl apply -f k8s/app-configmap.yml
kubectl apply -f k8s/app-deployment.yml
kubectl apply -f k8s/app-service.yml

# OR apply all at once
kubectl apply -f k8s/
\`\`\`

### Check Kubernetes Resources
\`\`\`bash
# Check all resources
kubectl get all -n spring-app

# Check pods
kubectl get pods -n spring-app

# Watch pods until running
kubectl get pods -n spring-app -w

# Check services
kubectl get svc -n spring-app

# Check deployments
kubectl get deployments -n spring-app

# Check persistent volumes
kubectl get pv,pvc -n spring-app

# Check configmap
kubectl get configmap -n spring-app

# Check secrets
kubectl get secrets -n spring-app

# Check nodes
kubectl get nodes -o wide
\`\`\`

### Kubernetes Logs
\`\`\`bash
# App logs
kubectl logs -f deployment/spring-boot-app -n spring-app

# MySQL logs
kubectl logs -f deployment/mysql -n spring-app

# Previous pod logs
kubectl logs deployment/spring-boot-app -n spring-app --previous

# Events
kubectl get events -n spring-app
\`\`\`

### Kubernetes Debug Commands
\`\`\`bash
# Describe pod (detailed info)
kubectl describe pod -n spring-app

# Describe deployment
kubectl describe deployment spring-boot-app -n spring-app

# Describe service
kubectl describe svc spring-boot-app-service -n spring-app

# Access MySQL pod shell
kubectl exec -it deployment/mysql -n spring-app -- mysql -u root -proot

# Access App pod shell
kubectl exec -it deployment/spring-boot-app -n spring-app -- /bin/bash
\`\`\`

### Access Application in Kubernetes
\`\`\`bash
# Get Node IP
kubectl get nodes -o wide

# Get NodePort
kubectl get svc spring-boot-app-service -n spring-app

# Access App (NodePort: 30080)
NODE_IP=\$(kubectl get nodes -o wide | awk 'NR==2{print \\$6}')
echo "App URL:    http://\$NODE_IP:30080"
echo "Swagger UI: http://\$NODE_IP:30080/swagger-ui/index.html"
echo "API URL:    http://\$NODE_IP:30080/api/users"

# Test API
curl http://\$NODE_IP:30080/api/users
\`\`\`

### Kubernetes Cleanup
\`\`\`bash
# Delete all resources
kubectl delete -f k8s/

# Delete namespace (removes everything)
kubectl delete namespace spring-app

# Verify cleanup
kubectl get all -n spring-app
\`\`\`

---

## 🔌 API Testing

### Create User
\`\`\`bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }'
\`\`\`

### Get All Users
\`\`\`bash
curl -X GET http://localhost:8080/api/users
\`\`\`

### Get User by ID
\`\`\`bash
curl -X GET http://localhost:8080/api/users/1
\`\`\`

### Update User
\`\`\`bash
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com",
    "phone": "9876543210"
  }'
\`\`\`

### Delete User
\`\`\`bash
curl -X DELETE http://localhost:8080/api/users/1
\`\`\`

---

## 📖 Swagger UI

\`\`\`bash
# Open in browser
# Docker:     http://localhost:8080/swagger-ui/index.html
# Kubernetes: http://NODE_IP:30080/swagger-ui/index.html

# Check if accessible
curl -s -o /dev/null -w "%{http_code}" \
    http://localhost:8080/swagger-ui/index.html
\`\`\`

---

## 📜 Logs

### Docker Logs
\`\`\`bash
# App logs (follow)
docker compose logs app -f

# MySQL logs (follow)
docker compose logs mysql -f

# All logs (follow)
docker compose logs -f

# Last 100 lines
docker compose logs app --tail=100
\`\`\`

### Kubernetes Logs
\`\`\`bash
# App logs
kubectl logs -f deployment/spring-boot-app -n spring-app

# MySQL logs
kubectl logs -f deployment/mysql -n spring-app

# Last 100 lines
kubectl logs deployment/spring-boot-app \
    -n spring-app --tail=100
\`\`\`

---

## 🧹 Cleanup

### Docker Cleanup
\`\`\`bash
# Stop containers
docker compose down

# Remove volumes
docker compose down -v

# Remove image
docker rmi user-management-service:1.0.0

# Remove all unused resources
docker system prune -a
\`\`\`

### Kubernetes Cleanup
\`\`\`bash
# Delete all resources
kubectl delete -f k8s/

# Delete namespace
kubectl delete namespace spring-app
\`\`\`

---

## 📊 Quick Reference

| Task                  | Command                                              |
|-----------------------|------------------------------------------------------|
| Build JAR             | \`mvn clean package -DskipTests\`                    |
| Build Docker Image    | \`docker build -t user-management-service:1.0.0 .\`  |
| Start Docker          | \`docker compose up -d\`                             |
| Stop Docker           | \`docker compose down\`                              |
| App Logs (Docker)     | \`docker compose logs app -f\`                       |
| K8s Deploy            | \`kubectl apply -f k8s/\`                            |
| K8s Status            | \`kubectl get all -n spring-app\`                    |
| K8s Logs              | \`kubectl logs -f deployment/spring-boot-app -n spring-app\` |
| Swagger UI (Docker)   | \`http://localhost:8080/swagger-ui/index.html\`      |
| Swagger UI (K8s)      | \`http://NODE_IP:30080/swagger-ui/index.html\`       |
| API URL (Docker)      | \`http://localhost:8080/api/users\`                  |
| API URL (K8s)         | \`http://NODE_IP:30080/api/users\`                   |

---

## 🛠️ Troubleshooting

\`\`\`bash
# Java version mismatch
javac -version
java -version
echo \$JAVA_HOME

# Maven build failure
mvn clean package -DskipTests -e

# Docker container not starting
docker compose logs app
docker compose logs mysql

# Kubernetes pod not starting
kubectl describe pod -n spring-app
kubectl get events -n spring-app

# MySQL connection issues
docker exec -it mysql-db mysql -u root -proot -e "SHOW DATABASES;"
\`\`\`

---
> 💡 **Made with ❤️ for Spring Boot + MySQL + Docker + Kubernetes**
