const uuidv1 = require('uuid/v1');

export function generateUuid() {
	return uuidv1();
}