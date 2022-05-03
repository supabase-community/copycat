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