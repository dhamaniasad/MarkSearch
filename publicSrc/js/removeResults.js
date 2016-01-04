'use strict';

import { resultsContainer$, resultsCountDiv$ } from './searchPage'
import { showSafeBrowsingDetails, deletePageFromMarksearch } from './resultsEventHandlers'

import _ from 'lodash'

var removeResults = () => {
  /****
   * Remove the event listeners from the results elements before we remove
   * the elements themselves so we dont have any memory leaks.
   */
  var safeBrowsingToggleLinks = document.querySelectorAll('.safeBrowsingToggleLink')
  _.each(safeBrowsingToggleLinks, elem => {
    elem.removeEventListener('click', showSafeBrowsingDetails)
  })
  var trashDeleteLinks = document.querySelectorAll('.trashDelete')
  _.each(trashDeleteLinks, elem => {
    elem.removeEventListener('click', deletePageFromMarksearch)
  })
  let addRemoveDiv = document.getElementById('addRemoveDiv')
  if(addRemoveDiv){
    resultsContainer$[0].removeChild(addRemoveDiv)
  }
  /****
   * Hide results count in case the response from the server takes a while
   * - if there were 0 results last time, the user may think there are 0 results
   * this time too because the 0 from last time is still showing, so hide it.
   */
  resultsCountDiv$.addClass('hide')
  $(window).scrollTop(0)
}
/****
 * Exports
 */
export { removeResults }