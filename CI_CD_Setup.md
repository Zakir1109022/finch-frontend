# ♻️ CI/CD Pipeline Setup for Finch Frontend

This document provides a comprehensive overview of the CI/CD pipeline for the **Finch Frontend** project using **GitHub Actions**. It covers the CI/CD architecture, tools used, pipeline stages, and guidance on how to trigger and monitor the pipeline.

---

## 🚀 CI/CD Tool: GitHub Actions

GitHub Actions is the chosen CI/CD tool for this project. It allows the automation of build, test, and deployment workflows directly from the GitHub repository.

**Benefits:**

* Native integration with GitHub repositories
* Scalable and fast
* Extensive marketplace for pre-built actions
* Supports secrets management

---

## 🔄 Workflow Trigger

The CI/CD pipeline is triggered automatically:

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

This means the pipeline runs:

* When code is pushed to the `main` branch
* When a pull request is opened or updated targeting the `main` branch

---

## 📈 Pipeline Architecture

The workflow defines two main jobs:

### 1. `unit_test_lint`

**Purpose**: Ensure code quality before deployment

```yaml
jobs:
  unit_test_lint:
    runs-on: ubuntu-latest
```

**Steps:**

* `checkout` the repository code
* Install dependencies: `npm ci --f`
* Build the project: `npm run build`
* Run unit tests: `npm run test`
* Run linter: `npm run lint`

This stage ensures that code is properly built, tested, and linted before moving to the deployment phase.

---

### 2. `deploy`

**Purpose**: Build Docker image and push to Docker Hub (after successful tests)

```yaml
  deploy:
    needs: unit_test_lint
    runs-on: ubuntu-latest
```

**Steps:**

* **Checkout Code:**

  ```yaml
  - name: Checkout code
    uses: actions/checkout@v3
  ```

* **Login to Docker Hub:**

  ```yaml
  - name: Login to Docker Hub
    uses: docker/login-action@v1
    with:
      username: ${{ secrets.DOCKER_USERNAME }}
      password: ${{ secrets.DOCKER_PASSWORD }}
  ```

* **Build & Push Docker Image:**

  ```bash
  docker build -t ${DOCKER_USERNAME}/finch-frontend:latest .
  docker push ${DOCKER_USERNAME}/finch-frontend:latest
  ```

* **Login to GitHub Packages (optional):**

  ```yaml
  - name: Login to GitHub Packages
    uses: actions/checkout@v3
    with:
      repository: Zakir1109022/finch-frontend
      ref: 'main'
      token: ${{ secrets.G_TOKEN }}
  ```

This stage packages the app into a Docker container and pushes it to Docker Hub for deployment to Kubernetes.

---

## 🔢 Environment Variables and Secrets

The workflow uses GitHub Secrets for secure authentication:

* `DOCKER_USERNAME`: Docker Hub username
* `DOCKER_PASSWORD`: Docker Hub password or access token
* `G_TOKEN`: GitHub personal access token for private repositories

These should be configured under **Settings > Secrets and variables > Actions** in your GitHub repository.

---

## 🔄 How to Trigger the Pipeline

* **Automatic Trigger**:

  * Push or pull request to `main` branch.

* **Manual Trigger (optional setup)**:
  You can define a `workflow_dispatch` event in your YAML to allow manual runs from the GitHub Actions UI:

  ```yaml
  on:
    workflow_dispatch:
  ```

---

## 📊 How to Monitor the Pipeline

1. Navigate to your GitHub repository.
2. Click the **"Actions"** tab.
3. Select the latest workflow run to view:

   * Each job (e.g., `unit_test_lint`, `deploy`)
   * Logs and outputs per step
   * Errors or failures if any

Each run displays real-time logs and clearly marks success ✅ or failure ❌ per stage.

---
