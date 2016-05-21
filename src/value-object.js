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

        const properties = this.constructor.properties;
        if (properties == null || typeof properties !== 'object') {
            throw TypeError('define properties by returning object for ' + this.constructor.name);
        }

        for (let name in properties) {
            const type = properties[name];
            const rawValue = params != null
                ? params[name]
                : undefined;
            const value = rawValue != null
                ? constructValue(rawValue, type)
                : undefined;

            this[name] = value;
        }

        Object.freeze(this);
    }

    equals (another) {
        return Object.keys(this.constructor.properties).map((property) => {
            const a = this[property];
            const b = another[property];

            return a.equals
                ? a.equals(b)
                : a === b;
        }).reduce((previous, current) => {
            return previous && current;
        }, true);
    }
}
