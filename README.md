# copycat

## Motivation

TODO

## API Reference
### Overview

<a name="input"></a>All copycat functions take in an `input` value as their first parameter:

```js
import { copycat } from '@snaplet/copycat'

copycat.email('foo')
// => 'Zakary.Block356@gmail.com'
```

The given input can be any JSON-serializable value. For any two calls to the same function, the input given in each call serializes down to the same value, the same output will be returned. Copycat work statelessly: for the same input, the same value will be returned regardless of the enviornment, process, call ordering, or any other external factors.

Note that unlike `JSON.stringify()`, object property ordering is not considered.


### `faker`

A re-export of the exports of [`@faker-js/faker`](https://github.com/faker-js/faker) as an object. We do not alter faker in any way, and do not seed it.

### `email(input)`

Takes in an [input](#input) a string value resembling an email address.

```js
copycat.email('foo')
// => 'Zakary.Block356@gmail.com'
```

### `firstName(input)`

Takes in an [input](#input) and returns a string value resembling a first name.

```js
copycat.firstName('foo')
// => 'Alejandrin'
```

### `lastName(input)`

Takes in an [input](#input) and returns a string value resembling a last name.

```js
copycat.lastName('foo')
// => 'Keeling'
```

### `fullName(input)`

Takes in an [input](#input) and returns a string value resembling a full name.

```js
copycat.fullName('foo')
// => 'Zakary Hessel'
```

### `username(input)`

Takes in an [input](#input) and returns a string value resembling a username.

```js
copycat.username('foo')
// => 'Zakary.Block356'
```

### `uuid(input)`

Takes in an [input](#input) and returns a string value resembling a [uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier).

```js
copycat.uuid('foo')
// => '540b95dd-98a2-56fe-9c95-6e7123c148ca'
```

### `int(input[, options])`

Takes in an [`input`](#input) value and returns an integer.

```js
int('foo')
// => 2196697842
```

#### `options`

- **`min=0` and `max=Infinity`:** the minimum and maximum possible values for returned numbers

### `bool(input)`

Takes in an [`input`](#input) value and returns a boolean.

```js
bool('foo')
// => false
```

### `float(input[, options])`

Takes in an [`input`](#input) value and returns a number value with both a whole and decimal segment.

```js
float('foo')
// => 2566716916.329745
```

#### `options`

- **`min=0` and `max=Infinity`:** the minimum and maximum possible values for returned numbers

### `dateString(input[, options])`

Takes in an [`input`](#input) value and returns a string representing a date in [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) format.

```js
dateString('foo')
// => '1982-07-11T18:47:39.000Z'
```

#### `options`

- **`minYear=1980` and `maxYear=2019`:** the minimum and maximum possible year values for returned dates

### `char(input)`

Takes in an [`input`](#input) value and returns a string with a single character.

```js
char('foo')
// => 'M'
```

The generated character will be an alphanumeric: lower and upper case ASCII letters and digits 0 to 9.

### `word(input)`

Takes in an [`input`](#input) value and returns a string value resembling a fictitious word.

```js
word('foo')
// => 'Kinkami'
```

### `words(input)`

Takes in an [`input`](#input) value and returns a string value resembling fictitious words.

```js
words('foo')
// => 'Niko vichinashi'
```

### `sentence(input)`

Takes in an [`input`](#input) value and returns a string value resembling a sentence of fictitious words.

```js
sentence('foo')
// => 'Kiraevavi somani kihy viyoshi nihahyke kimeraeni.'
```

### `paragraph(input)`

Takes in an [`input`](#input) value and returns a string value resembling a paragraph of fictitious words.

```js
paragraph('foo')
// => 'Vakochiko ke rako kimuvachi hayuso mi vako kaichina, mishi mukaimo hakin va racea. Raechime miko kaimo keki shi navi makin yomehyha, na hya nano kin yokimo rae ra. Ke chi kakinaki kakorae machi. Raeva ka kaiko muvani ka racea kaichiyuchi muvinota, sokaiyu komechino shiso yuha raeraceaki kin chitavi. Kokaiashi chirako rae muyo vachi mukani nakoyuta kinmochikai, muhamuva hy mayushita ke shimo takinka notavi kinvayo.'
```
### `oneOf(input, values)`

Takes in an [`input`](#input) value and an array of `values`, and returns an item in `values` that corresponds to that `input`:

```js
oneOf('foo', ['red', 'green', 'blue'])
// => 'red'
```