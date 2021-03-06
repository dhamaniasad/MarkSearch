'use strict'

var request = require('request')
var _ = require('lodash')
/****
 * Send some info in the user agent to make it easy to block/contact if needed.
 * This is the default user agent for Electron: http://bit.ly/1S5sOQ9
 * note: request doesn't send a user agent by default.
 */
var uAgent = `Mozilla/5.0 AppleWebKit (KHTML, like Gecko) Chrome/${ process.versions['chrome'] } Electron/${ process.versions['electron'] } Safari MarkSearch App https://github.com/Darkle/MarkSearch`

function generateArchiveOfPage(pageUrl) {
  return new Promise(resolve => {
    var archiveLink = null
    request.post({
          url: 'https://archive.is/submit/',
          form: {
            url: pageUrl
          },
          headers: {
            'User-Agent': uAgent
          }
        },
        (err, httpResponse) => {
          /*
          * If it's already saved to archive.is, the url will be sent back in the headers.location, otherwise
          * the new url will be available in the headers.refresh it'l be something like '0;url=https://archive.is/wYCyZ'
          */
          var archiveUrl = null
          var headerLocation = _.get(httpResponse, 'headers.location')
          var headerRefresh = _.get(httpResponse, 'headers.refresh')
          if(headerLocation){
            archiveUrl = headerLocation
          }
          else if(headerRefresh){
            if(headerRefresh.startsWith('0;url=')){
              headerRefresh = headerRefresh.slice(6)
            }
            archiveUrl = headerRefresh
          }
          if(err || (!headerLocation && !headerRefresh)){
            global.devMode && console.error("Couldn't get an archive.is backup:", err)
            /****
             * We're not doing a reject here as we want to continue on to the
             * next promise (safeBrowsing). It's not the end of the world if
             * we dont get an archive link for the page.
             */
          }
          else{
            archiveLink = {
              archiveLink: archiveUrl,
              pageUrl: pageUrl
            }
          }
          resolve(archiveLink)
        }
    )
  })
}


module.exports = generateArchiveOfPage
