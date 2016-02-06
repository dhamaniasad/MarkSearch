'use strict';

var path = require('path')
var Crypto = require('crypto')

var electron = require('electron')
var Promise = require("bluebird")
var fsExtra = Promise.promisifyAll(require('fs-extra'))
var debug = require('debug')('MarkSearch:initializeDBs')
var NedbStore = require('nedb')
Promise.promisifyAll(NedbStore.prototype)
var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-quick-search'))

var buildIndex = require(path.join(__dirname, 'buildIndex'))

function initializeDBs(expressApp){
  if(!expressApp){
    throw new Error('expressApp not passed to initializeDBs')
  }
  /*****
   * Initialize Databases:
   * appDB stores the Marksearch settings as well as the location of the
   * pages.db database file, so that a user may change the location
   * e.g. to their Drobox folder so its always backed up
   *
   * pagesDB stores the bookmarks
   */
  var appDB
  var appSettingsDoc
  var pagesDB
  var firstRun = false

  var appDataPath = path.join(electron.app.getPath('appData'), 'MarkSearch')
  var appDataDir = path.join(appDataPath, 'marksearchdb', 'app')
  /****
   * Make sure the <appData>/MarkSearch/marksearchdb/app folder is there.
   * http://bit.ly/1QoQm5w
   */
  return fsExtra.ensureDirAsync(appDataDir)
      .then(() => {
        appDB = new NedbStore({filename: path.join(appDataDir, 'app.db')})
        return appDB.loadDatabaseAsync()
      })
      .then(() => appDB.findOneAsync({_id: 'appSettingsDoc'}))
      .then(returnedDoc => {
        if(!returnedDoc){
          console.log('first run')
          firstRun = true
          /***
           * On first run, save the location where the pages db will be stored.
           * Also generate a random secret to be used with the Jason Web Tokens for the
           * browser extensions & bookmarklets.
           * http://stackoverflow.com/questions/8855687/ - make it url safe just in case
           */
          var doc = {
            _id: 'appSettingsDoc',
            JWTsecret: Crypto.randomBytes(128).toString('hex'),
            markSearchSettings: {
              pagesDBFilePath: path.join(appDataPath, 'marksearchdb', 'pages', 'pages'),
              defaultToSearchLoose: true,
              prebrowsing: true
            }
          }
          return appDB.insertAsync(doc)
        }
        else{
          debug('not first run')
          return returnedDoc
        }
      })
      .then( appDoc => {
        appSettingsDoc = appDoc
        /****
         * Make sure the <appData>/MarkSearch/marksearchdb/pages/pages folder (or
         * whichever folder the user has moved it to) is there.
         * http://bit.ly/1QoQm5w
         */
        return fsExtra.ensureDirAsync(appSettingsDoc.markSearchSettings.pagesDBFilePath)
      })
      .then(() =>{
        pagesDB = new PouchDB(appSettingsDoc.markSearchSettings.pagesDBFilePath)
        /****
         * In development, replicate to couchDB so can use couchDB interface
         * to check/alter database data
         */
        if(expressApp.get('env') === 'development'){
          PouchDB.sync(
              appSettingsDoc.markSearchSettings.pagesDBFilePath,
              'http://localhost:5984/marksearch_pages',
              {
                live: true,
                retry: true
              }
          )
        }
      })
      /****
       * (Re)build quick-search index
       * https://github.com/nolanlawson/pouchdb-quick-search#building-the-index
       */
      .then(() => buildIndex(pagesDB, 'startup'))
      .then(() => {
        /****
         * Make the databases available to wherever app is available:
         * http://expressjs.com/api.html#app.set
         * http://expressjs.com/api.html#req.app
         */
        /****
         * expressApp.set('pagesDB' is a reference to the leveldb pagesDB database
         */
        expressApp.set('pagesDB', pagesDB)
        /****
         * expressApp.set('appDB' is a reference to the nedb appDB database
         */
        expressApp.set('appDB', appDB)
        /****
         * expressApp.set('appSettings' is a reference to the app settings document in the appDB database
         */
        expressApp.set('appSettings', appSettingsDoc)
      })
      .then(() => firstRun)

}

module.exports = initializeDBs