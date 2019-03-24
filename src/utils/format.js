/**
 * @param {Number} daysAgo presents how many days ago
 * @returns {String} Date display
 */
export function formatDaysAgo(daysAgo) {
  switch(daysAgo){
    case 0: 
      return 'Today'
    case 1:
      return 'Yesterday'
    default:
      return `${daysAgo} days ago`
  }
}