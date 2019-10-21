export function getArrayOf(objects) {
  	let returnArray = [];

	for (let object in objects) {
	    returnArray.push(objects[object]);
	}
    
    return returnArray;
}