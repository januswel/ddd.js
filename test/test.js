'use strict';

import ValueObject from '../src/value-object'
import assert from 'power-assert'

class Name extends ValueObject {
    constructor (params) {
        super(params);
    }

    get properties () {
        return {
            first: String,
            last: String,
        };
    }
}

let createName = (params) => {
    return new Name(params);
};

describe('ValueObject', function () {
    it('can create an instance', function () {
        let valueObject = createName();
        assert(valueObject != null);
    });

    it('can define models by using ValueObject class', function () {
        let janus = createName({
            first: 'janus',
            last: 'wel',
        });
        assert(janus != null);
        assert('janus' === janus.first);
        assert('wel' === janus.last);
    });

    it('should be equal to a instance that has the same values', function () {
        let a01 = createName({
            first: 'a',
            last: 'a',
        });
        let a02 = createName({
            first: 'a',
            last: 'a',
        });
        assert(a01.equals(a02));
    });

    it('should not be equal a instance that has different values', function () {
        let a = createName({
            first: 'a',
            last: 'a',
        });
        let b = createName({
            first: 'b',
            last: 'a',
        });
        assert(a !== b);
    });

    it('should be error to change child values', function () {
        let a = createName({
            first: 'a',
            last: 'a',
        });
        assert.throws(() => a.first = 'error', TypeError);
    });

    it('should be error to createName instances with values that have different types from properties: Object', function () {
        assert.throws(() => {
            createName({
                first: {
                    f: 1
                },
                last: {
                    l: 2
                },
            });
        }, TypeError);
    });

    it('should be error to createName instances with values that have different types from properties: build-in type', function () {
        assert.throws(() => {
            createName({
                first: 1,
                last: 2,
            });
        }, TypeError);
    });
});
