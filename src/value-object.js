'use strict';

import Model from './model.js';

export default class ValueObject extends Model {
    constructor (params) {
        super(params);

        this.properties.forEach((property) => {
            Object.defineProperty(this, property, {
                enumerable: true,
                get: () => params[property],
            });
        });
    }

    equals (another) {
        return this.properties.map((property) => {
            return this[property] === another[property];
        }).reduce((previous, current) => {
            return previous && current;
        }, true);
    }
}
