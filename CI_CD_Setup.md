**CI/CD:**
I used github action to implement CI/CD bucause it is secure and reliable. First I added all required env variable and secure data in github action variable and secrets.
I designed my finch frontend CI by two jobs. First one is for unit test and linting and second one is for build and deployment. I choosed docker hub to push application image after successfull build.
I configured mainn branch as CI build trigger branch. After push or accept pull request build will triggered. Build logs are found inside Actions tab. After every build I just go there and monitor build log.
