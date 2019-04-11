const config = require('./../config');

let defaultProject;

if (!config.multiProjects) {
  defaultProject = config.projects.find(proj => proj.name === config.default);
}

module.exports = function(app) {
  if (!config.multiProjects) {
    if (defaultProject.provider === 'gitlab') {
      require('./gitlab')(app);
    } else if (defaultProject.provider === 'github') {
      require('./github')(app);
    }
  }
};
