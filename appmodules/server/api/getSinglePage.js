'use strict';

var pagesdb = require('../../db/pagesdb')
var appLogger = require('../../utils/appLogger')

function getSinglePage(req, res, next) {
  pagesdb.db('pages')
      .where('pageUrl', req.params.pageUrl)
      .first()
      .then( row => {
        if(!row){
          res.status(404).end()
        }
        else{
          res.json(row)
        }
      })
      .catch( err => {
        console.error(err)
        appLogger.log.error({err, req, res})
        res.status(500).end()
      })

}

module.exports = getSinglePage