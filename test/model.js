'use strict';

import assert from 'assert'
import Model from '../src/model.js'

describe('Model', () => {
    it ('can not create an instance of Model', () => {
        assert.throws(() => {
            new Model();
        }, Error);
    });
});
