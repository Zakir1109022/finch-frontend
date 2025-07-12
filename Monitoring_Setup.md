# 📊 Grafana Monitoring & Logging Setup for Finch Frontend

This document outlines the monitoring and logging setup for the **Finch Frontend** using **Grafana**, **Prometheus**, and **Loki**. It includes architecture, data sources, dashboards created, and instructions to manage observability.

---

## 🔧 Tooling Overview

| Tool              | Purpose                                    |
| ----------------- | ------------------------------------------ |
| **Grafana**       | Visualization & dashboarding platform      |
| **Prometheus**    | Metrics collection and time-series storage |
| **Node Exporter** | Collects system-level metrics from nodes   |
| **Loki**          | Centralized logging system for containers  |

---

## 🌐 Architecture Diagram

```
[Kubernetes Cluster]
   |
   |-- [Finch Frontend Pods]
   |         |---> Application Logs ---> [Loki]
   |         |---> Resource Metrics ---> [Prometheus] <--- [Node Exporter]
   |
   |---> Dashboards & Queries <--- [Grafana]
```

---

## 📈 Dashboards Created

### 1. **Node Exporter Dashboard**

* **Data Source**: Prometheus
* **Metrics Visualized**:

  * CPU Usage (per core & total)
  * Memory Utilization
  * Disk I/O
  * Network Throughput
  * Uptime and Load Average

<img width="1359" height="674" alt="promethus-dashboard" src="https://github.com/user-attachments/assets/f205b9e1-fc2e-4e71-b556-2bcf55699da5" />


### 2. **Frontend Logs Dashboard**
<img width="1357" height="723" alt="frontend-log" src="https://github.com/user-attachments/assets/b28d7595-2cfb-431f-95f3-33dd840aca60" />



## 🔄 Deployment Instructions

1. **Deploy Prometheus + Node Exporter**:

   * Used kube-prometheus-stack Helm chart
2. **Deploy Loki + Promtail**:

   * Promtail is used to collect logs from container stdout/stderr
   * Configure Promtail to match pod labels: `app: vue-app`
3. **Deploy Grafana**:

   * used Helm chart
   * Add Prometheus and Loki as data sources via UI or provisioning YAML

---

