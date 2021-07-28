/**
   * Capitalise the first letter of a string
   * @param {string} s The string to capitalise
   * @returns {string} The capitalised string
   */
 function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

/**
 * Used to create pages from a user entity
 * @param {Array} array The array to page
 * @param {number} pageSize How big are each of the pages?
 * @param {number} pageNumber Which Page number do you wish to be on?
 * @returns {Array} an array
 */
function commandPaginate(array, pageSize, pageNumber) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

exports.commandPaginate = commandPaginate;
exports.capitalize = capitalize;