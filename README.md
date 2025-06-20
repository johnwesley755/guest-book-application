# 📘 Guestbook Application – Docker & Kubernetes Deployment

This project simulates deploying a **Guestbook web application** using Docker and Kubernetes **on a local machine**, without relying on cloud platforms like IBM Cloud. It provides hands-on experience with **containerization**, **orchestration**, **versioning**, **scaling**, and **rollbacks** using two versions of the app (`v1` and `v2`).

---

## ✨ Features

* ✅ **Containerization**: Dockerfiles for `v1` and `v2` of a Node.js-based Guestbook app.
* ⚙️ **Kubernetes Orchestration**: Deployments, Services, and Horizontal Pod Autoscaler (HPA) YAML files.
* 🔁 **Version Management**: Easily switch between application versions.
* 📈 **Auto-Scaling**: HPA demonstrates scaling based on CPU usage.
* 🔙 **Rollback Support**: Revert to a previous stable deployment version.
* 💻 **Runs Locally**: Works with Minikube or Docker Desktop (Kubernetes enabled).

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure the following tools are installed:

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Kubernetes)
* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

---

### 📦 Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/johnwesley755/guest-book-application.git
   cd guest-book-application
   ```

2. **Build Docker Images**

   * Build and tag `v1`:

     ```bash
     cd src/v1
     docker build -t guestbook:v1 .
     docker tag guestbook:v1 fake/guestbook:v1
     cd ../..
     ```

   * Build and tag `v2`:

     ```bash
     cd src/v2
     docker build -t guestbook:v2 .
     docker tag guestbook:v2 fake/guestbook:v2
     cd ../..
     ```

3. **Deploy to Kubernetes**

   ```bash
   cd kubernetes
   kubectl apply -f deployment.yaml
   kubectl apply -f service.yaml
   cd ..
   ```

4. **Access the Application**

   * If you're using **Minikube**:

     ```bash
     minikube service guestbook-service
     ```

   * If you're using **Docker Desktop**, access the service via:

     ```
     http://localhost:<EXPOSED_PORT>
     ```

     > Use `kubectl get service guestbook-service` to find the correct port.

---

## 💡 Usage Guide

| Action                         | Command                                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| 🔍 View Deployments            | `kubectl get deployments`                                                                                                       |
| 🔍 View Services               | `kubectl get services`                                                                                                          |
| 🔁 Scale Application           | `kubectl scale deployment guestbook-v1 --replicas=<X>`                                                                          |
| ⬆️ Update to `v2`              | Modify the image in `kubernetes/deployment.yaml` to `fake/guestbook:v2`, then:<br>`kubectl apply -f kubernetes/deployment.yaml` |
| ⏪ Rollback to Previous Version | `kubectl rollout undo deployment guestbook-v1`                                                                                  |
| 📊 Monitor Autoscaler          | `kubectl get hpa` *(after applying `hpa.yaml`)*                                                                                 |

To apply HPA:

```bash
kubectl apply -f kubernetes/hpa.yaml
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

* Fork this repo
* Create a feature branch
* Submit a pull request
* Open issues for suggestions or bugs

---

## 📬 Contact

For any queries or suggestions, [open an issue](https://github.com/johnwesley755/guest-book-application/issues) in this repository.
