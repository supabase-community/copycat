# copycat

```js
import { copycat } from '@snaplet/copycat'

copycat.email('foo')
// => 'Zakary.Block356@gmail.com'

copycat.email('bar')
// => 'Thurman.Schowalter668@hotmail.com'

copycat.email('foo')
// => 'Zakary.Block356@gmail.com'
```

## Motivation

### The problem
Many of the use cases we aim on solving with [snaplet](https://snaplet.dev/) involve anonymizing sensitive information. In practice, this involves replacing each bit of sensitive data with something else that _resembles_ the original value, yet does not allow the original value to be inferred.

To do this, we initially turned to [faker](https://fakerjs.dev/) for replacing the sensitive data with fake data. This approach took us quite far. However, we struggled with getting the replacement data to be _deterministic_: we found we did not have enough control over how results are generated to be able to easily ensure that for each value of the original data we wanted to replace, we'd always get the same replacement value out.

Faker allows one to seed a psuedo-random number generator (PRNG), such that the same sequence of values will be generated every time. While this means the sequence is deterministic, the problem was we did not have enough control over where the next value in the sequence was going to be used. Changes to the contents or structure in the original data we're replacing and changes to how we are using faker both had an effect on the way we used this sequence, which in turn had an effect on the resulting replacement value for any particular value in the original data. In other words, we had determinism, but not in a way that is useful for our purposes.

### The solution
What we were really needing was not the same _sequence_ of generated values every time, but the same _mapping_ to generated values every time.

This is exactly what we designed `copycat` to do. For each method provided by copycat, a given input value will always map to the same output value.

```js
import { copycat } from '@snaplet/copycat'

copycat.email('foo')
// => 'Zakary.Block356@gmail.com'

copycat.email('bar')
// => 'Thurman.Schowalter668@hotmail.com'

copycat.email('foo')
// => 'Zakary.Block356@gmail.com'
```

Copycat work statelessly: for the same input, the same value will be returned regardless of the environment, process, call ordering, or any other external factors.

Under the hood, copycat hashes the input values (in part relying on [md5](https://en.wikipedia.org/wiki/MD5)), with the intention of making it computationally infeasible for the input values to be inferred from the output values.

### Alternative approaches

It is still technically possible to make use of faker or similar libraries that offer deterministic PRNG - with some modification. That said, these solutions came with practical limitations that we decided made them less viable for us:
* It is possible to simply seed the PRNG for every identifier, and then use it to generate only a single value. This seems to be a misuse of these libraries though: there is an up-front cost to seeding these PRNGs that can be expensive if done for each and every value to be generated. [Here are benchmarks](https://gist.github.com/justinvdm/eaae3a59c1a1790704db9674e1785afa) that point to this up-front cost.
* You can generate a sequence of N values, hash identifiers to some integer smaller than N, then simply use that as an index to lookup a value in the sequence. This can even be done lazily. Still, you're now limiting the uniqueness of the values to N. The larger N is, the larger the cost of keeping these sequences in memory, or the more computationally expensive it is if you do not hold onto the sequences in memory. The smaller N is, the less unique your generated values are.

Note though that for either of these approaches, hashing might also still be needed to make it infeasible for the inputs to be inferred from the outputs.

## API Reference
### Overview

<a name="input"></a>All copycat functions take in an `input` value as their first parameter:

```js
import { copycat } from '@snaplet/copycat'

copycat.email('foo')
// => 'Zakary.Block356@gmail.com'
```

The given input can be any JSON-serializable value. For any two calls to the same function, the input given in each call serializes down to the same value, the same output will be returned.

Note that unlike `JSON.stringify()`, object property ordering is not considered.


### `faker`

A re-export of the exports of [`@faker-js/faker`](https://github.com/faker-js/faker) as an object. We do not alter faker in any way, and do not seed it.

### `oneOf(input, values)`

Takes in an [`input`](#input) value and an array of `values`, and returns an item in `values` that corresponds to that `input`:

```js
oneOf('foo', ['red', 'green', 'blue'])
// => 'red'
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

### `char(input)`

Takes in an [`input`](#input) value and returns a string with a single character.

```js
char('foo')
// => 'M'
```

The generated character will be an alphanumeric: lower and upper case ASCII letters and digits 0 to 9.

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

### `uuid(input)`

Takes in an [input](#input) and returns a string value resembling a [uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier).

```js
copycat.uuid('foo')
// => '540b95dd-98a2-56fe-9c95-6e7123c148ca'
```

### `email(input)`

Takes in an [input](#input) and returns a string value resembling an email address.

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

### `password(input)`

Takes in an [`input`](#input) value and returns a string value resembling a password.

```js
password('foo')
// => 'uRkXX&u7^uvjX'
```

**Note:** not recommended for use as a personal password generator.

### `city(input)`

Takes in an [input](#input) and returns a string value representing a city.

```js
copycat.city('foo')
// => 'Garland'
```
### `country(input)`

Takes in an [input](#input) and returns a string value representing a country.

```js
copycat.country('foo')
// => 'Bosnia and Herzegovina'
```

### `streetName`

Takes in an [input](#input) and returns a string value representing a fictitious street name.

```js
copycat.streetName('foo')
// => 'Courtney Orchard'
```

### `streetAddress`

Takes in an [input](#input) and returns a string value representing a fictitious street address.

```js
copycat.streetAddress('foo')
// => '757 Evie Vista'
```

### `postalAddress`

Takes in an [input](#input) and returns a string value representing a fictitious postal address.

```js
copycat.postalAddress('foo')
// => '178 Adaline Forge, Moreno Valley 8538, Haiti'
```

### `countryCode(input)`

Takes in an [input](#input) and returns a string value representing a country code.

```js
copycat.countryCode('foo')
// => 'BV'
```

## `timezone(input)`

Takes in an [input](#input) and returns a string value representing a time zone.

```js
copycat.countryCode('foo')
// => 'Asia/Tbilisi'
```

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
