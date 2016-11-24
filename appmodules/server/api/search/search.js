'use strict'

var pagesdb = require('../../../db/pagesdb')
var processSearchTerms = require('./processSearchTerms')
var appLogger = require('../../../utils/appLogger')
var printSearchSQL = require('./printSearchSQL')

function search(req, res) {

  var processedSearchTerms = processSearchTerms(req.params.searchTerms)
  var domainToSearchFor = processedSearchTerms.domainToSearchFor
  var searchTerms = processedSearchTerms.processedSearchTerms
  var dateFilter = {
      dateFilterStartDate: req.body.dateFilterStartDate,
      dateFilterEndDate: req.body.dateFilterEndDate
  }
  var usingDateFilter = !!(dateFilter.dateFilterStartDate && dateFilter.dateFilterEndDate)
  var knexSQL = null

  /****
   * note: knex will automatically convert additional WHERE's to AND
   */
  if(!searchTerms.length){
    /****
     * If user just wants to list all saved pages by a domain (with no text search)
     *
     */
    if(domainToSearchFor){
      /****
       * Omiting the pageText as that will be fairly large and we don't need that.
       * Also don't need checkedForExpiry.
       */
      knexSQL = pagesdb.db.select(
                  'pageUrl',
                  'pageDomain',
                  'pageTitle',
                  'pageDescription',
                  'dateCreated',
                  'archiveLink',
                  'safeBrowsing'
                )
                .from('pages')
                .where({pageDomain: domainToSearchFor})
      if(usingDateFilter){
        knexSQL = knexSQL
          .where('dateCreated', '>=', dateFilter.dateFilterStartDate)
          .where('dateCreated', '<=', dateFilter.dateFilterEndDate)
      }
      knexSQL = knexSQL.orderBy('dateCreated', 'desc')
    }
    else{
      /****
       * If there are no search terms and they are not searching for domain
       * results, then send back zero results as an empty array and also return so
       * we dont continue with the rest of the function under the 'else{}'.
       * Could also do a nothing sql statment like knexSQL = pagesdb.db('pages').where({1: 0})
       * i guess.
       */
      res.json([])
      return
    }
  }
  else{
    /****
     * Omiting the pageText as that will be fairly large and we don't need that, the
     * fts match ? order by bm25... below seems to still work and search pageText even
     * if it is not selected and returned.
     * Also don't need checkedForExpiry.
     */
    knexSQL = pagesdb
      .db
      .select(
        `rank`,
        `pageUrl`,
        `dateCreated`,
        `pageDomain`,
        `pageTitle`,
        `pageDescription`,
        `archiveLink`,
        `safeBrowsing`,
        pagesdb.db.raw(
          `snippet(fts, -1, '<span class="searchHighlight">',
          '</span>', '...', 64) as snippet`
        )
      )
      .from('fts')

    if(domainToSearchFor){
      knexSQL = knexSQL.where({pageDomain: domainToSearchFor})
    }
    if(usingDateFilter){
      knexSQL = knexSQL
        .where('dateCreated', '>=', dateFilter.dateFilterStartDate)
        .where('dateCreated', '<=', dateFilter.dateFilterEndDate)
    }
    /****
     * https://sqlite.org/fts5.html#section_5_1_1
     * bm25(fts, 4.0, 1.0, 2.0) - Give pageTitle a boost of 4,
     * and pageDescription a boost of 2.
     * Note: the SQL operators in the 'searchTerm OR NEAR()` are case-sensitive
     * and must be in uppercase!
     */
    knexSQL = knexSQL
      //.whereRaw(`fts match ? order by bm25(fts, 4.0, 1.0, 2.0)`, `"${ searchTerms }" OR NEAR(${ searchTerms })`)
      .whereRaw(`fts match ? order by bm25(fts, 4.0, 1.0, 2.0)`, searchTerms)
  }

  if(global.devMode){
    printSearchSQL(knexSQL)
  }

  knexSQL
    .then( rows => {
      res.json(rows)
    })
    .catch( err => {
      global.devMode && console.error(err)
      appLogger.log.error({err, req, res})
      res
        .status(500)
        .json({
          searchError: `There was an issue with the search, check your search text is correct.`
        })
    })

}

module.exports = search
