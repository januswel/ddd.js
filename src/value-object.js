'use strict';

import Model from './model.js';

function isBuiltInType (type) {
    switch (type) {
        case String:
        case Number:
        case Boolean:
        case Date:
        case RegExp:
        case Array:
            return true;
    }
}
function constructValue (src, type) {
    if (typeof src === 'object' && !isBuiltInType(type)) {
        if (!(src instanceof type) && src.constructor.name !== 'Object') {
            throw new TypeError('specified value is not instance of ' + type.constructor.name + ': ' + src);
        }

        return new type(src);
    }

    if (src.constructor !== type) {
        throw new TypeError('specified value is not constructed by ' + type.toString() + ': ' + src);
    }

    return src;
}

export default class ValueObject extends Model {
    constructor (params) {
        super(params);

        for (let name in this.properties) {
            const type = this.properties[name];
            const rawValue = params != null
                ? params[name]
                : undefined;
            const value = rawValue != null
                ? constructValue(rawValue, type)
                : undefined;


            Object.defineProperty(this, name, {
                enumerable: true,
                get: () => value,
            });
        }
    }

    equals (another) {
        return Object.keys(this.properties).map((property) => {
            return this[property] === another[property];
        }).reduce((previous, current) => {
            return previous && current;
        }, true);
    }
}
