# Localstack Samples

## Pre-requisites

1. Install NodeJS 18
   ```bash
   $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   $ nvm install 18
   $ nvm use 18
   ```
2. Install Yarn using corepack
   ```bash
   $ corepack enable
   $ npm install -g yarn
   ```

## Reproductions

### [BUG?] Multiple containers launched for same lambda
To reproduce a case where many containers are launched to process the same lambda code
(which is problematic for attempting to attach a debugger):

```bash
# Bring up localstack
$ docker compose up -d

# Install Localstack CLI (creates a python virtualenv and installs localstack + awscli-local)
$ bin/install-tools

# Build and deploy the lambdas
$ yarn install
$ yarn deploy

# Invoke the same lambda multiple times in-parallel, which triggers this behavior
$ for i in {1..10}; do echo $i; done | xargs -I{} -P 10 bin/lambda-invoke echo {}

# Check to see that multiple instances of the lambda have launched
$ docker ps --filter name=localstack-sample-echo
CONTAINER ID   IMAGE                             COMMAND             CREATED         STATUS         PORTS                     NAMES
ce27891d0949   public.ecr.aws/lambda/nodejs:18   "/var/rapid/init"   3 minutes ago   Up 3 minutes   0.0.0.0:54197->9229/tcp   localstack-samples-localstack-1-lambda-localstack-sample-echo-ee07c71f6ee3d532d3ec33df8ff6d3d7
3997d442ac0b   public.ecr.aws/lambda/nodejs:18   "/var/rapid/init"   3 minutes ago   Up 3 minutes   0.0.0.0:54196->9229/tcp   localstack-samples-localstack-1-lambda-localstack-sample-echo-748b2e7d1b96d95ce0c00dcc96af3e37
9a2350a015f1   public.ecr.aws/lambda/nodejs:18   "/var/rapid/init"   3 minutes ago   Up 3 minutes   0.0.0.0:54194->9229/tcp   localstack-samples-localstack-1-lambda-localstack-sample-echo-26cc6fa2ea416740f21a820909b435c6
0366c5908370   public.ecr.aws/lambda/nodejs:18   "/var/rapid/init"   3 minutes ago   Up 3 minutes   0.0.0.0:54195->9229/tcp   localstack-samples-localstack-1-lambda-localstack-sample-echo-3f53589c8980835479c6be423570401d
eda072cca4a3   public.ecr.aws/lambda/nodejs:18   "/var/rapid/init"   3 minutes ago   Up 3 minutes   0.0.0.0:54192->9229/tcp   localstack-samples-localstack-1-lambda-localstack-sample-echo-f5c532e32d1f58622f35ae910bd71840
33549b048dbf   public.ecr.aws/lambda/nodejs:18   "/var/rapid/init"   3 minutes ago   Up 3 minutes   0.0.0.0:54190->9229/tcp   localstack-samples-localstack-1-lambda-localstack-sample-echo-f53766afaba46ca1e754656ef917ccb5
9749ba04cb41   public.ecr.aws/lambda/nodejs:18   "/var/rapid/init"   3 minutes ago   Up 3 minutes   0.0.0.0:54193->9229/tcp   localstack-samples-localstack-1-lambda-localstack-sample-echo-079bd7e9086ae42dfbe57cc5cb9e9c16
e84acb0ee246   public.ecr.aws/lambda/nodejs:18   "/var/rapid/init"   3 minutes ago   Up 3 minutes   0.0.0.0:54191->9229/tcp   localstack-samples-localstack-1-lambda-localstack-sample-echo-9a91d842517f0bc69462372c753f6e85
aab8624d4a70   public.ecr.aws/lambda/nodejs:18   "/var/rapid/init"   3 minutes ago   Up 3 minutes   0.0.0.0:54189->9229/tcp   localstack-samples-localstack-1-lambda-localstack-sample-echo-7e783395fd367f9af88ca5298b57c02c
b170ccf3b29f   public.ecr.aws/lambda/nodejs:18   "/var/rapid/init"   4 minutes ago   Up 4 minutes   0.0.0.0:54056->9229/tcp   localstack-samples-localstack-1-lambda-localstack-sample-echo-e67b9de1411f609c9477837dad44c9a3
```
