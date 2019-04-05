# pipeline-previewer

Application that allows you to view and manage multiple **S.P.A** deploys on a single static server through a graphical interface.

## Development

```
$ yarn install
$ yarn start
```

## Usage

```
$ node app.js
```

## How to deploy your apps

The pipeline-previewer server must be running on the instance of your choice.

#### Merge requests

Simply write your deploy script using the integration technology of your choice. This script should build in the application and the copy the files into the `/public/mr/${id}` directory via _ssh_ where `id` is the merge request id.

**Tip:** If you're using **GitLab CI** provider, the merge request id is exposed on the `$CI_MERGE_REQUEST_IID` enviroment variable.

#### Branchs

Almost the same thing, but you'll have to copy the build files into the `/public/branch/${branch_name}` directory.
