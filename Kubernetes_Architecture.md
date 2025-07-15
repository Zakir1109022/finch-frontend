# 🌐 Kubernetes Architecture for Vue Frontend

This document outlines the Kubernetes architecture used to deploy the **Vue Frontend** application. It includes an explanation of the Kubernetes manifests, resource considerations, scaling strategies, and deployment structure.

---

## ⚖️ Overview of Kubernetes Architecture

The Vue.js application is deployed using Kubernetes components defined in the following manifest files:

* **Namespace**: Logical isolation for the frontend app
* **Deployment**: Ensures multiple replicas of the Vue.js container run and stay healthy
* **Service**: Exposes the Vue.js pods internally for network access

These components work together to ensure availability, scalability, and manageability.

---

## 📰 Manifest Files Explained

### 1. Namespace

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: vue
```

Namespaces provide isolation for resources. This `vue` namespace separates the frontend environment from others (e.g., backend, dev/test).

---

### 2. Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vue-app
  namespace: vue
  labels:
    app: vue-app
```

* Defines a **Deployment** in the `vue` namespace.
* Uses label `app: vue-app` to match associated pods.

```yaml
spec:
  replicas: 2
```

* **Scaling Strategy**: Two replicas ensure high availability. You can autoscale based on CPU/Memory usage using the Horizontal Pod Autoscaler (HPA).

```yaml
  selector:
    matchLabels:
      app: vue-app
```

* Matches pods with the same label.

```yaml
  template:
    metadata:
      labels:
        app: vue-app
    spec:
      containers:
      - name: vue-app-container
        image: zakir22/finch-frontend:latest
        ports:
        - containerPort: 80
```

* **Container Details**:

  * Runs the Docker image `zakir22/finch-frontend:latest`
  * Exposes port `80` for Nginx (serving the built Vue.js app)

---

### 3. Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: vue-app-service
  namespace: vue
```

* Defines an internal **ClusterIP** service to expose the Vue application.

```yaml
spec:
  selector:
    app: vue-app
  ports:
    - port: 8080
      targetPort: 80
```
## 4. **Resource Allocation**

### Deployment Resources
The Vue application deployment defines specific **CPU and memory resources** for efficient usage and to avoid overcommitment of cluster resources.

- **Requests**:
  - CPU: `500m` (0.5 vCPU)
  - Memory: `512Mi`
  - These values define the minimum resources guaranteed to the container.
  
- **Limits**:
  - CPU: `1` (1 vCPU)
  - Memory: `1Gi`
  - These are the maximum resources the container can consume.

* **Port 8080** is exposed for internal access (e.g., by Ingress or backend services)
* Traffic is forwarded to **container port 80**

> To expose the app externally, consider using an **Ingress** or changing the service type to `NodePort` or `LoadBalancer` in a cloud setup.

---
