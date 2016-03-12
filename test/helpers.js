import fse from 'fs-extra';

export function prepareDummyApp({appPath, modules = ['core'], except = []}) {
  fse.mkdirsSync(appPath);
  fse.mkdirsSync(appPath + '/client/configs');
  fse.mkdirsSync(appPath + '/client/main.js');

  modules.forEach(function (module) {
    fse.mkdirsSync(appPath + `/client/modules/${module}/index.js`);
    fse.mkdirsSync(appPath + `/client/modules/${module}/routes.jsx`);
    fse.mkdirsSync(appPath + `/client/modules/${module}/actions/tests`);
    fse.mkdirsSync(appPath + `/client/modules/${module}/actions/index.js`);
    fse.mkdirsSync(appPath + `/client/modules/${module}/components/tests`);
    fse.mkdirsSync(appPath + `/client/modules/${module}/configs`);
    fse.mkdirsSync(appPath + `/client/modules/${module}/containers/tests`);
  });

  except.forEach(function (path) {
    fse.removeSync(appPath + path);
  });
}

export function clearDummyApp(appPath) {
  fse.removeSync(appPath);
}
