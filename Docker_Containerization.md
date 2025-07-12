# 📦 Docker Containerization for Vue.js Application

This document explains the structure of the multi-stage Dockerfile used to containerize a Vue.js application, the optimization techniques applied, and how to build and run the Docker image locally.

---

## 🧱 Dockerfile Structure

The Dockerfile is split into **two stages**:

### **Stage 1: Build the Vue.js App**

```dockerfile
FROM node:18-alpine AS build
```

* Uses a **lightweight Node.js Alpine image** for building the app.
* Helps reduce the final image size since it's used only for compilation.

```dockerfile
WORKDIR /app
COPY package*.json ./
RUN npm install --f
COPY . .
RUN npm run build
```

* Copies only `package.json` and optionally `package-lock.json` first to leverage **Docker cache** for dependency installs.
* Installs dependencies with `--f` (force), then copies the source code.
* Builds the Vue.js application using `npm run build`, generating production-ready static files in `/app/dist`.

---

### **Stage 2: Serve the App with Nginx**

```dockerfile
FROM nginx:alpine
```

* Uses a lightweight **Alpine-based Nginx** image for serving static files efficiently.

```dockerfile
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

* Copies the built assets from the first stage into the Nginx web root directory.
* Replaces the default Nginx config with a custom one (`nginx.conf`).

```dockerfile
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

* Exposes port `80` and runs Nginx in the foreground.

---

## 🛠️ Optimization Techniques Used

1. **Multi-Stage Build**:

   * Keeps the final image minimal by separating the build and runtime stages.
   * Only production artifacts are included in the final image.

2. **Alpine Base Images**:

   * Significantly reduce image size and surface area for vulnerabilities.

3. **Layer Caching**:

   * Dependencies are installed after copying `package*.json`, allowing Docker to cache layers if code changes but dependencies don’t.

4. **Minimal Final Image**:

   * No build tools or source files exist in the production image — only Nginx and static assets.

---

## 🔧 Build and Run the Docker Image Locally

### ✅ Step 1: Build the Image

```bash
docker build -t vue-app .
```

### ✅ Step 2: Run the Container

```bash
docker run -d -p 8080:80 --name vue-container vue-app
```
