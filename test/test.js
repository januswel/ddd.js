'use strict';

import ValueObject from '../src/value-object'
import assert from 'power-assert'

class Name extends ValueObject {
    constructor (params) {
        super(params);
    }

    get properties () {
        return [ 'first', 'last' ]
    }
}

let create = (params) => {
    return new Name(params);
};

describe('Name', function () {
    it('can create an instance', function () {
        let janus = create({
            first: 'janus',
            last: 'wel',
        });
        assert(janus != null);
        assert('janus' === janus.first);
        assert('wel' === janus.last);
    });

    it('should be equal to a instance that has the same values', function () {
        let a01 = create({
            first: 'a',
            last: 'a',
        });
        let a02 = create({
            first: 'a',
            last: 'a',
        });
        assert(a01.equals(a02));
    });

    it('should not be equal a instance that has different values', function () {
        let a = create({
            first: 'a',
            last: 'a',
        });
        let b = create({
            first: 'b',
            last: 'a',
        });
        assert(a !== b);
    });
});
