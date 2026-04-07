# Go to k8s folder
cd ~/devops-ums-project/k8s

# Apply all files in order
kubectl apply -f namespace.yaml
kubectl apply -f secrets.yaml
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mysql-service.yaml

# Wait for MySQL ready
kubectl wait \
  --for=condition=ready pod \
  -l app=ums-mysql \
  -n ums \
  --timeout=120s

kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml

# Wait for backend ready
kubectl wait \
  --for=condition=ready pod \
  -l app=ums-backend \
  -n ums \
  --timeout=120s

kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml