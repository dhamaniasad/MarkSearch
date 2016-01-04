'use strict';

import "babel-polyfill"

import { initInfiniteScroll } from './infiniteScroll'
import { checkIfiOS7 } from './checkIfiOS7'
import { queryServerAndRender } from './queryServerAndRender'
import { removeResults } from './removeResults'
import { goose } from './gooseIsDeadMan'
import { addUrls } from './addUrls'
import { searchErrorHandler } from './searchErrorsHandler'
import { checkIfTouchDevice } from './checkIfTouchDevice'
import { initSearchPlaceholder } from './initSearchPlaceholder'
import { tooltips } from './tooltips'
import { dateFilter } from './dateFilter'

import _ from 'lodash'
/****
 * for some reason import * as stringUtils from 'string' isn't
 * working, so using require
 */
var stringUtils = require('string')

var csrfToken
var resultsCountDiv$
var resultsContainer$

$(document).ready(searchPageInit)

function searchPageInit(event){
  var searchInput$ = $('#searchInput')
  csrfToken = $('#csrfInput').val()
  resultsCountDiv$ = $('#resultsCount')
  resultsContainer$ = $('#resultsContainer')
  var isIOS7 = checkIfiOS7(window)
  var body$ = $('body')
  if(!checkIfTouchDevice(window)){
    searchInput$.focus()
  }
  initSearchPlaceholder(searchInput$)
  /****
   * Set the searchLoose value to the user's preference in the markSearchSettings in appDB.
   * User can temporarily enable/disable loose search by clicking on the goose
   */
  window.localStorage.searchLoose = body$.data('searchLoose')
  /****
   * Display all bookmarks stored in MarkSearch on page load
   */
  queryServerAndRender()
      .then(() =>{
        tooltips()
        /****
         * Adding touchmove too cause of this: http://bit.ly/21GgA7M
         */
        $(window).on('scroll touchmove', initInfiniteScroll)
      })
      .then(() =>{
        /****
         * For when the user has loaded the MarkSearch search page
         * via clicking on the results "more" link/button in the
         * browser extension, we want the browser to go to the next set
         * (chunk) of results by using the hash fragment identifier. The results
         * aren't there on page load so we miss the browsers opportunity
         * to scroll to the element with the fragment id, so we have to
         * force the browser to do it again after the results are loaded in
         * the DOM
         * Need to change the result number slightly becuase the browser doesnt
         * take into account the nav/header on the MarkSearch search page which
         * is posistion:fixed and obscures the results at the top of the window,
         * so scroll to the previous result
         */
        var urlHash = window.location.hash
        if(urlHash.indexOf('#result_') > -1){
          var resultNumberLookingFor = Number(urlHash.split('#result_')[1])
          if(!_.isNaN(resultNumberLookingFor) && resultNumberLookingFor > 1){
            resultNumberLookingFor--
            window.location.hash = `#result_${resultNumberLookingFor}`
          }
        }
      })
      .catch(searchErrorHandler)
  /****
   * Search
   */
  var searchForm$ = $('#searchForm')
  var inputOldValue = searchInput$.val()
  /****
   * To get rid of the keyboard on submit on mobile/tablet.
   * So we're not actually querying server for results on submit, as the
   * "propertychange change click keyup input paste" event listeners below
   * will grab the lastchange before submit/enter is pressed and get the
   * results anyway
   * For some reason searchForm$.on with lodash debounce doesn't detect
   * submit event, so doing it here on its own
   */
  searchForm$.on('submit', event =>{
    event.preventDefault()
    searchInput$.blur()
  })
  /****
   * Increase the debounce a bit if on iOS7 as it stutters a bit
   */
  var debounceTime = isIOS7 ? 800 : 300
  /****
   * Extra events cause of <IE10
   */
  searchForm$.on(
      "propertychange change click keyup input paste",
      _.debounce(
          () =>{
            var searchInputValue = searchInput$.val().trim()
            if(searchInputValue !== inputOldValue){
              inputOldValue = searchInputValue
              removeResults()
              /****
               * If they have deleted all text, we have no search terms (null), so show all pages in db again
               * Also get get rid of any excess (>1) whitespace in between words (.collapseWhitespace())
               */
              var searchTerms = null
              if(searchInputValue.length){
                searchTerms = encodeURIComponent(stringUtils(searchInputValue).collapseWhitespace().s)
              }
              queryServerAndRender(searchTerms).catch(searchErrorHandler)
            }
          },
          debounceTime,
          {
            'leading': false,
            'trailing': true
          }
      )
  )
  /****
   * Fix for iOS 7 and below (e.g iPhone 4) for input focus jump for position:fixed
   * elements: http://bit.ly/1m9hvNI
   * Doing a scrollTop(0) too as it's easier than messing around with the position & top:xpx
   * for header nav.
   * Using touchstart event as it seems to fire before input focus event and gives us a
   * little bit more time to do stuff before the input focus jump.
   */
  if(isIOS7){
    console.info("we may be on an iPhone 4")
    var navHeader$ = $('.navHeader')
    navHeader$.on('touchstart', event => {
      body$.scrollTop(0)
    })
  }
  /****
   * Nav bar buttons & subbar event listeners
   */
  /****
   * Loose goose search button (highway to the danger zone)
   */
  //goose()
  addUrls()
  dateFilter()
}
/****
 * Exports
 */
export { csrfToken, resultsCountDiv$, resultsContainer$ }