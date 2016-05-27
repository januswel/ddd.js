'use strict';

import ValueObject from '../src/value-object'
import assert from 'assert'

class Name extends ValueObject {
    constructor (params) {
        super(params);
    }

    static get properties () {
        return {
            first: String,
            last: String,
        };
    }
}

class Person extends ValueObject {
    constructor (params) {
        super(params);
    }

    static get properties () {
        return {
            name: Name,
            age: Number,
        };
    }
}

class NoPropertyValueObject extends ValueObject {
    constructor (params) {
        super(params);
    }
}

class NullPropertyValueObject extends ValueObject {
    constructor (params) {
        super(params);
    }

    static get properties () {
        return null;
    }
}

class InvalidTypePropertyValueObject extends ValueObject {
    constructor (params) {
        super(params);
    }

    static get properties () {
        return 42;
    }
}

describe('ValueObject', function () {
    it('can not create an instance of ValueObject', function () {
        assert.throws(() => {
            new ValueObject();
        }, Error);
    });

    it('can define models by using ValueObject class', function () {
        let janus = ValueObject.create(Name, {
            first: 'janus',
            last: 'wel',
        });
        assert(janus != null);
        assert('janus' === janus.first);
        assert('wel' === janus.last);
    });

    it('should be equal to a instance that has the same values', function () {
        let a01 = ValueObject.create(Name, {
            first: 'a',
            last: 'a',
        });
        let a02 = ValueObject.create(Name, {
            first: 'a',
            last: 'a',
        });
        assert(a01 === a02);
    });

    it('can not define a model that has no properties', function () {
        assert.throws(() => {
            new NoPropertyValueObject();
        }, TypeError);
    });

    it('can not define a model that has invalid properties definition: null', function () {
        assert.throws(() => {
            new NullPropertyValueObject();
        }, TypeError);
    });

    it('can not define a model that has invalid properties definition: non-object', function () {
        assert.throws(() => {
            new InvalidTypePropertyValueObject();
        }, TypeError);
    });

    it('should not be equal a instance that has different values', function () {
        let a = ValueObject.create(Name, {
            first: 'a',
            last: 'a',
        });
        let b = ValueObject.create(Name, {
            first: 'b',
            last: 'a',
        });
        assert(a !== b);
    });

    it('should be error to change child values', function () {
        let a = ValueObject.create(Name, {
            first: 'a',
            last: 'a',
        });
        assert.throws(() => a.first = 'error', TypeError);
    });

    it('should be error to create Name instances with values that have different types from properties: Object', function () {
        assert.throws(() => {
            ValueObject.create(Name, {
                first: {
                    f: 1
                },
                last: {
                    l: 2
                },
            });
        }, TypeError);
    });

    it('should be error to create Name instances with values that have different types from properties: build-in type', function () {
        assert.throws(() => {
            ValueObject.create(Name, {
                first: 1,
                last: 2,
            });
        }, TypeError);
    });

    it('can define nested value-object', function () {
        let janus = ValueObject.create(Person, {
            name: {
                first: 'janus',
                last: 'wel',
            },
            age: 1,
        });
        assert(janus != null);
        assert(janus.name.first === 'janus');
        assert(janus.name.last === 'wel');
        assert(janus.age === 1);
        assert.throws(() => {
            janus.name.first = 'foo';
        }, TypeError);

        let another = ValueObject.create(Person, {
            name: {
                first: 'janus',
                last: 'wel',
            },
            age: 1,
        });
        assert(janus === another);
    });
});
