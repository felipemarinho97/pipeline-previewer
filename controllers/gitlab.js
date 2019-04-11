const fs = require('fs');
const config = require('./../config');
const Gitlab = require('gitlab/dist/es5').default;

if (!config.multiProjects) {
  defaultProject = config.projects.find(proj => proj.name === config.default);
}

const api = new Gitlab({
  url: defaultProject.url ? defaultProject.url : 'http://gitlab.com', // Defaults to https://gitlab.com
  token: defaultProject.token,
});

module.exports = function(app) {
  app.get('/api/mr/list', (req, res) => {
    let merge_requests = [];
    let dir = fs
      .readdirSync(__dirname + '/../public/mr')
      .filter(dirname => !Number.isNaN(parseInt(dirname)));

    console.log(dir);

    dir.forEach(each => {
      let stat = fs.statSync(__dirname + '/../public/mr/' + each);

      console.log(each, stat.birthtimeMs);

      api.MergeRequests.show(defaultProject.projectId, each)
        .then(gl_resp => {
          merge_requests.push({
            name: each,
            gitlab: gl_resp,
            created: stat.birthtimeMs,
            updated: gl_resp.updated_at,
            endpoint: '/mr/' + each,
          });

          if (dir.length === merge_requests.length) {
            res.send({
              merge_requests,
            });
          }
        })
        .catch(err => {
          merge_requests.push({
            name: each,
            created: stat.birthtimeMs,
            endpoint: '/mr/' + each,
          });
        });
    });
  });

  app.get('/api/branch/list', (req, res) => {
    let branchs = [];
    let dir = fs.readdirSync(__dirname + '/../public/branch');

    dir.forEach(each => {
      let stat = fs.statSync(__dirname + '/../public/branch/' + each);

      console.log(each, stat.birthtimeMs);

      branchs.push({
        name: each,
        created: stat.birthtimeMs,
        endpoint: '/branch/' + each,
      });
    });

    res.send({
      branchs,
    });
  });

  app.get('/api/merge-requests/:id', (req, res) => {
    api.MergeRequests.show(defaultProject.projectId, req.params.id)
      .then(resp => res.json(resp))
      .catch(resp => res.json(resp));
  });
};
