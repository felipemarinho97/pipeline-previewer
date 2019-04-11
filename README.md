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

## Configuration

To have the **PR**/**MR** status, author and names displayed and the application integrated with your git provider (GitHub or Gitlab), you'll have to write a file called `config.json` with your project info like the following example:

```json
{
  "projects": [
    {
      "name": "frontend-react",
      "owner": "felipemarinho97",
      "provider": "gitlab",
      "token": "xxxxxxxxxxxxxxxxxx",
      "projectId": "xxxxxx"
    },
    {
      "name": "glossario-ufcg",
      "owner": "OpenDevUFCG",
      "provider": "github",
      "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
  ],
  "default": "glossario-ufcg"
}
```

You have to generate a _token_, see here [for GitHub](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) and here [for Gitlab](https://docs.gitlab.com/ce/user/profile/personal_access_tokens.html).
