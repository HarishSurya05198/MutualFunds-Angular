# MutualFundsApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# docker buildx build -t mutual-funds-front:v1 .  
# docker run -d -p 8000:8000 --name angular-app mutual-funds-front:v1

# minikube start (after opening docker desktop)
# minikube image load imageName:tag
# minikube image ls
# kubectl apply -f filename.yaml
# kubectl exec -i db-pod-0 -- psql -u username -d dbname < backup.sql (dump data from existing db)
# kubectl exec -it db-pod-0 -- psql -u username -d dbname , then run DROP SCHEMA public CASCADE; and CREATE SCHEMA public; (if dumping data have issues)
# kubectl get pods/svc/deployments
# kubectl logs podname
# kubectl describe pod/svc/deployment name
# once deployment and service starts running successfully
# kubectl port-forward service/serviceName newport:createdport (spring) or minikube service serviceName (angular)
# kubectl delete -f filename.yaml (stop deployment/pod/service)
# kubectl delete statefulset name (stop stateful avoid DB data deletion)
# minikube stop


# aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws
# docker tag mutual-funds-front:v1 public.ecr.aws/k6z9s9k6/mutualfunds-angular-repo
# docker push public.ecr.aws/k6z9s9k6/mutualfunds-angular-repo
# docker run -p 8000:8000 public.ecr.aws/k6z9s9k6/mutualfunds-angular-repo:latest (test in local)
# eksctl create cluster --name frontend-cluster --region us-east-1 --without-nodegroup
# eksctl create nodegroup --cluster frontend-cluster --name mutualfunds-nodegroup --region us-east-1 --nodes 1 --node-type t3.medium --managed=false
# kubectl apply -f deployment and service yaml files