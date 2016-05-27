'use strict';

import Model from './model.js';
import sha256 from 'sha256'

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

    get id () {
        return sha256((Object.keys(this.constructor.properties)).sort().map((property) => {
            return this[property].toString();
        }).join(''));
    }

    static create (valueObject, params) {
        const instance = new valueObject(params);
        const id = instance.id;
        if (!(id in valueObject)) {
            valueObject[id] = instance;
        }
        return valueObject[id];
    }
}
