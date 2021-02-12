
'use strict';

/**
 * Create an array from array / array of arrays.
 * @param {*[]} array - any array / array of arrays
 * @return {*[]} new array. [] if invalid data
 */
const plain = array => { 
  return Array.isArray(array) ?
    array.flat(Infinity) : []; 
};

