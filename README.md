# webUtils
# Build and deploy

Command to build the application. PLease remeber to change the project name and application name
```
gcloud builds submit --tag gcr.io/suhail-webutils/suhail-webutils-nyc  --project=suhail-webutils
```

Command to deploy the application
```
gcloud run deploy --image gcr.io/suhail-webutils/suhail-webutils-nyc --platform managed  --project=suhail-webutils --allow-unauthenticated
```
