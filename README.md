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

# Streamlit App for Popular Movies

This Streamlit app loads the most popular movies based on TMDb and cycles through them. To keep the code efficient, it only pulls the latest JSON data from TMDb if the cache is more than 1 day old. Caching is implemented using a pickle file. If there is already a cache and it's less than 1 day old, the app uses the cache. If either the cache is not available or if it's more than 1 day old, a fresh pull is used.

## URL to Site
[Top TMDb movies](https://suhail-webutils-tmdb-q2jk2acl6q-wm.a.run.app)

