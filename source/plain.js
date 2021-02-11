  
'use strict';

/**
 * Create one array from array of arrays.
 * @param {*[]} array - any array / array of arrays
 * @return {*[]} new array
 */


// Thanks to ES2019!
const plain = array => { return Array.isArray(array) ? array.flat(Infinity) : []; };

