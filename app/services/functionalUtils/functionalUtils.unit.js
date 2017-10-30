import test from 'tape'

import * as functionalUtils from './functionalUtils'

/**
 * trimIfString()
 */

const { trimIfString } = functionalUtils

test('functionalUtils.trimIfString() | if the arg is string, it should trim and return it', t => {
  const actual = trimIfString('   Spaceous String   ')
  const expected = 'Spaceous String'

  t.is(actual, expected)
  t.end()
})

test('functionalUtils.trimIfString() | if the arg is NOT string, it should just return it', t => {
  t.plan(3)

  const testWithVar = (arg) => {
    const actual = trimIfString(arg)
    const expected = arg

    t.is(actual, expected)
  }

  testWithVar(123)
  testWithVar({ foo: 'bar' })
  testWithVar(['a', 'b', 'c'])
})

/**
 * makePropNegator()
 */

const { makePropNegator } = functionalUtils
const makePropNegatorSharedTest1 = t => {
  const testVariation1 = () => {
    const propNegator = makePropNegator('alpha', 'beta', 'delta')
    const obj = {
      alpha: true,
      beta: false,
      gamma: 'gamma',
      delta: 0,
    }

    const actual = propNegator(obj)
    const expected = {
      alpha: false,
      beta: true,
      gamma: 'gamma',
      delta: true,
    }

    t.deepEqual(actual, expected)
  }

  const testVariation2 = () => {
    const propNegator = makePropNegator('beta')
    const obj = {
      alpha: 'alpha',
      beta: 'beta',
      gamma: 'gamma',
    }

    const actual = propNegator(obj)
    const expected = {
      alpha: 'alpha',
      beta: false,
      gamma: 'gamma',
    }

    t.deepEqual(actual, expected)
  }

  const testVariation3 = () => {
    const propNegator = makePropNegator('delta')
    const obj = {
      alpha: 'alpha',
      beta: 'beta',
      gamma: 'gamma',
    }

    const actual = propNegator(obj)
    const expected = obj

    t.deepEqual(actual, expected)
  }

  t.plan(3)
  testVariation1()
  testVariation2()
  testVariation3()
}

test('functionalUtils.makePropNegator() | it should return a function', makePropNegatorSharedTest1)
test('functionalUtils.makePropNegator()() | it should, for each first gen args, negate the prop of the same key of the second gen arg', makePropNegatorSharedTest1)

/**
 * isObjSubset
 */

const { isObjSubset } = functionalUtils

test('functionalUtils.isObjSubset() | When secondArg is subset of firstArg, it should return true', t => {
  const testVariation1 = () => {
    const superset = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    }

    const subset = {
      b: 2,
      c: 3,
    }

    const actual = isObjSubset(superset, subset)
    const expected = true

    t.is(actual, expected)
  }

  const testVariation2 = () => {
    const superset = {
      a: 1,
      b: 2,
    }

    const subset = {
      a: 1,
      b: 2,
    }

    const actual = isObjSubset(superset, subset)
    const expected = true

    t.is(actual, expected)
  }

  t.plan(2)
  testVariation1()
  testVariation2()
})

test('functionalUtils.isObjSubset() | When secondArg is NOT subset of firstArg, it should return false', t => {
  const testVariation1 = () => {
    const superset = {
      a: 1,
      d: 4,
    }

    const subset = {
      b: 2,
      c: 3,
    }

    const actual = isObjSubset(superset, subset)
    const expected = false

    t.is(actual, expected)
  }

  const testVariation2 = () => {
    const superset = {
      a: 1,
      c: 3,
    }

    const subset = {
      a: 1,
      b: 2,
    }

    const actual = isObjSubset(superset, subset)
    const expected = false

    t.is(actual, expected)
  }

  t.plan(2)
  testVariation1()
  testVariation2()
})


// /**
//  * switchVals()
//  */

// const { switchVals } = functionalUtils
// const switchValsSharedTest1 = t => {
//   const myCases = {
//     foo: 'fooVal',
//     bar: 'barVal',
//   }
//   const switchMyCases = switchVals(myCases)
//   const res = switchMyCases('baz')

//   t.is(res, null)
// }

// test('functionalUtils.switchVals() | when called with an object, it should return a function', switchValsSharedTest1)
// test('functionalUtils.switchVals()::switchVals()() | when second arg is NOT one of the first arg\'s keys, it should return null', switchValsSharedTest1)

// test('functionalUtils.switchVals()::switchVals()() | when second arg is one of the first arg\'s keys, it should return the first arg\'s value with that key', t => {
//   const myCases = {
//     foo: 'fooVal',
//     bar: 'barVal',
//   }
//   const switchMyCases = switchVals(myCases)
//   const res = switchMyCases('foo')

//   t.is(res, 'fooVal')
// })

// /**
//  * switchFuncs()
//  */

// const { switchFuncs } = functionalUtils
// const switchFuncsSharedTest1 = t => {
//   const myFuncs = {
//     foo: (arg) => (arg === 'fooArg') && 'fooRes',
//     bar: () => {},
//   }
//   const switchMyFuncs = switchFuncs(myFuncs)
//   const myFunc = switchMyFuncs('foo')
//   const res = myFunc('fooArg')

//   t.is(res, 'fooRes')
// }

// test('functionalUtils.switchFuncs() | when called with an object, it should return a function', switchFuncsSharedTest1)
// test('functionalUtils.switchFuncs()() | when called with a string, it should return a function', switchFuncsSharedTest1)
// test('functionalUtils.switchFuncs()()() | when second arg is one of the first arg\'s keys, it should call the first arg\'s value, whose key matches the second arg, with the third arg', switchFuncsSharedTest1)
// test('functionalUtils.switchFuncs()()() | when second arg is one of the first arg\'s keys, it return the result of the first arg\'s value, whose key matches the second arg, called with the third arg', switchFuncsSharedTest1)

// test('functionalUtils.switchFuncs()::switchFuncs()()::switchFuncs()()() | when second arg is NOT one of the first arg\'s keys, it should return null', t => {
//   const myFuncs = {
//     foo: (arg) => (arg === 'fooArg') && 'fooRes',
//     bar: () => {},
//   }
//   const switchMyFuncs = switchFuncs(myFuncs)
//   const myFunc = switchMyFuncs('baz')
//   const res = myFunc('fooArg')

//   t.is(res, null)
// })
