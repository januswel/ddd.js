'use strict';

export default class Model {
    constructor () {
        if (this.constructor.name === 'Model') {
            throw TypeError('do not create an instance of Model.');
        }
    }
}
