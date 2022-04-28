# copycat

## Motivation

TODO

## API Reference
### Overview

<a name="input"></a>All copycat functions take in an `input` value as their first parameter:

```js
import { copycat } from '@snaplet/copycat'

copycat.email('foo')
// => 'Liana_Hansen892@hotmail.com'
```

The given input can be any JSON-serializable value. For any two calls to the same function, the input given in each call serializes down to the same value, the same output will be returned. Copycat work statelessly: for the same input, the same value will be returned regardless of the enviornment, process, call ordering, or any other external factors.

Note that unlike `JSON.stringify()`, object property ordering is not considered.


### `faker`

A re-export of the exports of [`@faker-js/fakers](https://github.com/faker-js/faker) as an object. We do not alter faker in any way, and do not seed it.

### `email(input)`

Takes in an [input](#input) a string value resembling an email address.

```js
copycat.email('foo')
// => 'Liana_Hansen892@hotmail.com'
```

### `firstName(input)`

Takes in an [input](#input) and returns a string value resembling a first name.

```js
copycat.firstName('foo')
// => 'Nasir'
```

### `lastName(input)`

Takes in an [input](#input) and returns a string value resembling a last name.

```js
copycat.lastName('foo')
// => 'Langosh'
```

### `fullName(input)`

Takes in an [input](#input) and returns a string value resembling a full name.

```js
copycat.fullName('foo')
// => 'Liana Howell'
```

### `username(input)`

Takes in an [input](#input) and returns a string value resembling a username.

```js
copycat.username('foo')
// => 'Liana_Hansen892'
```

### `uuid(input)`

Takes in an [input](#input) and returns a string value resembling a [v4 uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)).

```js
copycat.uuid('foo')
// => '7f943302-0cd6-4d22-8922-92f792ca8726'
```