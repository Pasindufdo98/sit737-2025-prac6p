# sit737-2025-prac6p
In this task, I deployed a containerized Node.js application (created in Task 5.1P) to a Kubernetes cluster using Docker Desktop. 

### Step 1: Enable Kubernetes in Docker Desktop
Open Docker Desktop.

Go to Settings > Kubernetes.

Enable “Enable Kubernetes”.

Click Apply & Restart.

Wait until Kubernetes status shows as “Running” (green dot at the bottom of Docker Dashboard).

### Step 2: Build and Push Docker Image to Docker Hub
Open a terminal in the root of your Node.js project (where the Dockerfile is).
Build the image locally:

```docker build -t docker_web_app .```

Tag the image for Docker Hub:

```docker tag docker_web_app pasindufdo98/docker_web_app```

Push it to your Docker Hub repository:

```docker push pasindufdo98/docker_web_app```

### Step 3: Set Up Kubernetes Dashboard

``` kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml```

### Step 4: Create Admin User for Dashboard

 ```kubectl apply -f deployment/dashboard-adminuser.yaml```
 
```kubectl apply -f deployment/cluster_role_binding.yaml```


### Step 5:  Deploy the Pod

Created the createPod.yaml file and applied using below command.

```kubectl apply -f createPod.yaml```

### Step 6:  Create Kubernetes Deployment

Created the deployment.yaml file and applied using below command.

```kubectl apply -f deployment.yaml```

### Step 7:  Create Kubernetes Deployment

Created the service.yaml file and applied using below command.

```kubectl apply -f service.yaml```

### Step 5:  Access the application

http://localhost:30080/
