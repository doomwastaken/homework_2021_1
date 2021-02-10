  
"use strict";

/**
 * Create one array from array of arrays.
 * @param {*[]} array - any array / array of arrays
 * @return {*[]} new array
 */


// Did also check for options with .push, but apparently it doesn't support above 150k elements (@stackoverflow)
function plain (array){
    if (!Array.isArray(array)) {
        return null;
    }
	return array.reduce((result, element) => {
		if(Array.isArray(element)){
			const reccArray = plain(element);
			return [...result, ...reccArray];
		}
		return [...result, element];
	}, []);
}