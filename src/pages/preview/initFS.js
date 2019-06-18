var BrowserFS = require('browserfs')

// Installs globals onto window:
// * Buffer
// * require (monkey-patches if already defined)
// * process
// You can pass in an arbitrary object if you do not wish to pollute
// the global namespace.
BrowserFS.install(window);

const getOptions = (paths) => {

  const options = {
    '/': { fs: "LocalStorage" }
  }

  for(const v of paths) {
    //const last = v.lastIndexOf('/')
    //const path = `/${v.slice(0,last)}`
    //options[path] = { fs: "LocalStorage" }
    options[`/${v}`] = { fs: "LocalStorage" }
  }

  //console.log('options',options)

  return options

}

const main = (paths) => {

  const options = getOptions(paths)

  // Configures BrowserFS to use the LocalStorage file system.
  BrowserFS.configure({
    fs: "MountableFileSystem",
    options,
  }, function(e) {
    if (e) {
      // An error happened!
      throw e;
    }
    // Otherwise, BrowserFS is ready-to-use!
  });
}

export default main