## Redux Persist Immutable
Add immutable support to [redux-persist](https://github.com/rt2zz/redux-persist).

**Note:** redux-persist-immutable works with nested immutable data at the reducer level. It does **not** if the entire state atom is one immutable map.

### Usage
```js
import { compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import reduxPersistImmutable from 'redux-persist-immutable'
const reducer = combineReducers(reducers)
const store = compose(autoRehydrate(), createStore)(reducer)
persistStore(store, {transforms: [reduxPersistImmutable]})
```

### Usage with Records
By default, immutable [`Record`s](https://facebook.github.io/immutable-js/docs/#/Record) will be persisted and restored as `Map`s, because the library has no way of knowing what your `Record` constructor looks like. To change this behavior and allow a `Record` to be persisted and restored as a `Record` instance, you'll need to do two things:

1. Add a name attribute to your record (this is the second argument to a `Record`'s constructor).
2. Pass your `Record` constructor to the transformer's `withRecords()` function to generate a transformer capable of serializing and deserializing the record.

Minimal example:
```js
import { compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import reduxPersistImmutable from 'reduxPersistImmutable'

const reducer = combineReducers(reducers)
const store = compose(autoRehydrate(), createStore)(reducer)

const MyRecord = Record({
  foo: 'null'
}, 'MyRecord') // <- Be sure to add a name field to your record 

persistStore(
  store,
  {
    transforms: [reduxPersistImmutable.withRecords([MyRecord])]
  }
)

```