# ![copycat](https://user-images.githubusercontent.com/1731223/167850970-584e6953-6543-4085-af5a-f9d8b7ffe988.png)

```js
import { copycat } from '@snaplet/copycat'

copycat.email('foo')
// => 'Romaine_Gorczany54840@hoistallergist.info'

copycat.email('bar')
// => 'Chyna.McDermott621@unnaturalzipper.name'

copycat.email('foo')
// => 'Romaine_Gorczany54840@hoistallergist.info'
```

## Motivation

### The problem
Many of the use cases we aim to solve with [snaplet](https://snaplet.dev/) involves anonymizing sensitive information. In practice, this involves replacing each bit of sensitive data with something else that _resembles_ the original value, yet does not allow the original value to be inferred.

To do this, we initially turned to [faker](https://fakerjs.dev/) for replacing the sensitive data with fake data. This approach took us quite far. However, we struggled with getting the replacement data to be _deterministic_: we found we did not have enough control over how results are generated to be able to easily ensure that for each value of the original data we wanted to replace, we'd always get the same replacement value out.

Faker allows one to seed a pseudo-random number generator (PRNG), such that the same sequence of values will be generated every time. While this means the sequence is deterministic, the problem was we did not have enough control over where the next value in the sequence was going to be used. Changes to the contents or structure in the original data we're replacing and changes to how we are using faker both had an effect on the way we used this sequence, which in turn had an effect on the resulting replacement value for any particular value in the original data. In other words, we had determinism, but not in a way that is useful for our purpose.

### The solution
What we were really needing was not the same _sequence_ of generated values every time, but the same _mapping_ to generated values every time.

This is exactly what we designed `Copycat` to do. For each method provided by Copycat, a given input value will always map to the same output value.

```js
import { copycat } from '@snaplet/copycat'

copycat.email('foo')
// => 'Romaine_Gorczany54840@hoistallergist.info'

copycat.email('bar')
// => 'Chyna.McDermott621@unnaturalzipper.name'

copycat.email('foo')
// => 'Romaine_Gorczany54840@hoistallergist.info'
```

Copycat works statelessly: for the same input, the same value will be returned regardless of the environment, process, call ordering, or any other external factors.

Under the hood, Copycat hashes the input values (in part relying on [md5](https://en.wikipedia.org/wiki/MD5)), with the intention of making it computationally infeasible for the input values to be inferred from the output values.

### Alternative approaches

It is still technically possible to make use of faker or similar libraries that offer deterministic PRNG - with some modification. That said, these solutions came with practical limitations that we decided made them less viable for us:
* It is possible to simply seed the PRNG for every identifier, and then use it to generate only a single value. This seems to be a misuse of these libraries though: there is an up-front cost to seeding these PRNGs that can be expensive if done for each and every value to be generated. [Here are benchmarks](https://gist.github.com/justinvdm/eaae3a59c1a1790704db9674e1785afa) that point to this up-front cost.
* You can generate a sequence of N values, hash identifiers to some integer smaller than N, then simply use that as an index to lookup a value in the sequence. This can even be done lazily. Still, you're now limiting the uniqueness of the values to N. The larger N is, the larger the cost of keeping these sequences in memory, or the more computationally expensive it is if you do not hold onto the sequences in memory. The smaller N is, the less unique your generated values are.

Note though that for either of these approaches, hashing might also still be needed to make it infeasible for the inputs to be inferred from the outputs.

## API Reference
### Overview

<a name="input"></a>All Copycat functions take in an `input` value as their first parameter:

```js
import { copycat } from '@snaplet/copycat'

copycat.email('foo')
// => 'Romaine_Gorczany54840@hoistallergist.info'
```

The given input can be any JSON-serializable value. For any two calls to the same function, the input given in each call serializes down to the same value and the same output will be returned.

Note that unlike `JSON.stringify()`, object property ordering is not considered.

## Working with PII (Personal Identifiable Information)

TODO

### `faker`

A re-export of `faker` from [`@faker-js/faker`](https://github.com/faker-js/faker). We do not alter faker in any way, and do not seed it.

### `fictional`

A re-export of [`fictional`](https://github.com/oftherivier/fictional), a library used under the hood by copycat for mapping inputs to primitive values.

### `copycat.scramble(input[, options])`

Takes in an `input` value, and returns a value of the same type and length, but with each character/digit replaced with a different character/digit.

For string, the replacement characters will be in the same character range:
* By default, spaces are preserved (see `preserve` option below)
* Lower case ASCII characters are replaced with lower case ASCII letters
* Upper case ASCII characters are replaced with upper case ASCII letters
* Digits are replaced with digits
* Any other ASCII character in the code point range 32 to 126 (0x20 - 0x7e) is replaced with either an alphanumeric character, or `_`, `-`, or `+`
* Any other character is replaced with a Latin-1 character in the range of (0x20 - 0x7e, or 0xa0 - 0xff)

```js
copycat.scramble('Zakary Hessel')
// => 'Mgdyti Bdqcym'
```

If a number is given, each digit will be replaced, and the floating point (if relevant) will be preserved:


```js
copycat.scramble(782364.902374)
// => 696898.958526
```

If an object or array is given, the values inside the object or array will be recursively scrambled:

```js
copycat.scramble({
  a: [
    {
      b: 23,
      c: 'foo',
    },
  ],
})
// => { a: [ { b: 12, c: 'pqz' } ] }
```

If a date is given, each segment in the date will be scrambled:

```js
copycat.scramble(new Date('2022-10-25T19:08:39.374Z'))
// => {}
```

If a boolean or null value is given, the value will simply be returned.

If a value of any other type is given, an error will be thrown

#### `options`

- **preserve**: An array of characters that should remain the same if present in the given input string

```js
copycat.scramble('foo@bar.org', { preserve: ['@', '.'] })
// => 'utf@fcr.ozl'
```

### `copycat.oneOf(input, values)`

Takes in an [`input`](#input) value and an array of `values`, and returns an item in `values` that corresponds to that `input`:

```js
copycat.oneOf('foo', ['red', 'green', 'blue'])
// => 'blue'
```

### `copycat.someOf(input, range, values)`

Takes in an [`input`](#input) value and an array of `values`, repeatedly picks items from that array a number of times within the given range that corresponds to that `input`. Each item will be picked no more than once.

```js
copycat.someOf('foo', [1,2], ['paper', 'rock'])
// => [ 'paper', 'rock' ]
```

### `copycat.int(input[, options])`

Takes in an [`input`](#input) value and returns an integer.

```js
copycat.int('foo')
// => 4738872167090029
```

#### `options`

- **`min=0` and `max=Infinity`:** the minimum and maximum possible values for returned numbers

### `copycat.bool(input)`

Takes in an [`input`](#input) value and returns a boolean.

```js
copycat.bool('foo')
// => true
```

### `copycat.float(input[, options])`

Takes in an [`input`](#input) value and returns a number value with both a whole and decimal segment.

```js
copycat.float('foo')
// => 66671755093.75689
```

### `copycat.char(input)`

Takes in an [`input`](#input) value and returns a string with a single character.

```js
copycat.char('foo')
// => 'B'
```

The generated character will be an alphanumeric: lower and upper case ASCII letters and digits 0 to 9.

### `copycat.digit(input)`

Takes in an [`input`](#input) value and returns a string with a single digit value.

```js
copycat.digit('foo')
// => '9'
```

### `copycat.hex(input)`

Takes in an [`input`](#input) value and returns a string with a single hex value.

```js
copycat.hex('foo')
// => 'd'
```

#### `options`

- **`min=0` and `max=Infinity`:** the minimum and maximum possible values for returned numbers

### `copycat.dateString(input[, options])`

Takes in an [`input`](#input) value and returns a string representing a date in [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) format.

```js
copycat.dateString('foo')
// => '2009-02-18T14:05:09.000Z'
```

#### `options`

- **`minYear=1980` and `maxYear=2019`:** the minimum and maximum possible year values for returned dates

### `copycat.uuid(input)`

Takes in an [input](#input) and returns a string value resembling a [uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier).

```js
copycat.uuid('foo')
// => '1251f237-43c8-5ada-a1f5-4c47f58c5135'
```

### `copycat.email(input)`

Takes in an [input](#input) and returns a string value resembling an email address.

```js
copycat.email('foo')
// => 'Romaine_Gorczany54840@hoistallergist.info'
```

#### `options`

- **`limit`:** Constrain generated values to be less than or equal to `limit` number of chars

### `copycat.firstName(input)`

Takes in an [input](#input) and returns a string value resembling a first name.

```js
copycat.firstName('foo')
// => 'Anastasia'
```

#### `options`

- **`limit`:** Constrain generated values to be less than or equal to `limit` number of chars

### `copycat.lastName(input)`

Takes in an [input](#input) and returns a string value resembling a last name.

```js
copycat.lastName('foo')
// => 'Mante'
```

#### `options`

- **`limit`:** Constrain generated values to be less than or equal to `limit` number of chars

### `copycat.fullName(input)`

Takes in an [input](#input) and returns a string value resembling a full name.

```js
copycat.fullName('foo')
// => 'Nannie Schmitt'
```

#### `options`

- **`limit`:** Constrain generated values to be less than or equal to `limit` number of chars

### `copycat.phoneNumber(input)`

Takes in an [input](#input) and returns a string value resembling a [phone number](https://en.wikipedia.org/wiki/MSISDN).

```js
copycat.phoneNumber('foo')
// => '+6239821618262'
```

**note** The strings _resemble_ phone numbers, but will not always be valid. For example, the country dialing code may not exist, or for a particular country, the number of digits may be incorrect. Please let us know if you need valid
phone numbers, and feel free to contribute :)

### `copycat.username(input)`

Takes in an [input](#input) and returns a string value resembling a username.

```js
copycat.username('foo')
// => 'quieten.sideburns54840'
```

#### `options`
- **`limit`:** Constrain generated values to be less than or equal to `limit` number of chars

### `copycat.password(input)`

Takes in an [`input`](#input) value and returns a string value resembling a password.

```js
copycat.password('foo')
// => 'ZXQ6a%ll@RDe'
```

**Note:** not recommended for use as a personal password generator.

### `copycat.city(input)`

Takes in an [input](#input) and returns a string value representing a city.

```js
copycat.city('foo')
// => 'Bothell'
```
### `copycat.country(input)`

Takes in an [input](#input) and returns a string value representing a country.

```js
copycat.country('foo')
// => 'Svalbard & Jan Mayen Islands'
```

### `copycat.streetName(input)`

Takes in an [input](#input) and returns a string value representing a fictitious street name.

```js
copycat.streetName('foo')
// => 'Alexandra Rest'
```

### `copycat.streetAddress(input)`

Takes in an [input](#input) and returns a string value representing a fictitious street address.

```js
copycat.streetAddress('foo')
// => '197 Jacobi Brooks'
```

### `copycat.postalAddress(input)`

Takes in an [input](#input) and returns a string value representing a fictitious postal address.

```js
copycat.postalAddress('foo')
// => '366 Tromp Trace, Coon Rapids 7014, Montserrat'
```

### `copycat.countryCode(input)`

Takes in an [input](#input) and returns a string value representing a country code.

```js
copycat.countryCode('foo')
// => 'FK'
```

## `copycat.timezone(input)`

Takes in an [input](#input) and returns a string value representing a time zone.

```js
copycat.timezone('foo')
// => 'America/Tijuana'
```

### `copycat.word(input)`

Takes in an [`input`](#input) value and returns a string value resembling a fictitious word.

```js
copycat.word('foo')
// => 'Vasoraki'
```

#### `options`

- **`capitalize=true`:** whether or not the word should start with an upper case letter
- **`minSyllables=2` and `maxSyllables=4`:** the minimum and maximum possible number of syllables that returned words will contain

```js
copycat.word('id-2', {
  minSyllables: 1,
  maxSyllables: 6,
  unicode: 0.382
})
// => 'Nả'
'Memu'
```

### `copycat.words(input)`

Takes in an [`input`](#input) value and returns a string value resembling fictitious words.

```js
copycat.words('foo')
// => 'Kako chiraekin shimu'
```

#### `options`

- **`min=2` and `max=3`:** the minimum and maximum possible number of words that returned strings will contain.
- **`capitalize='first'`:** whether or not the words should start with upper
  case letters. If `true` or `'all'` is given, each string returned will start with an upper case letter in each word. If `'first'` is given, for each string returned, only the first word will start with an upper case letter. If `false` is given, each string returned will always contain only lower case letters.
- **`minSyllables=1` and `maxSyllables=4`:** the minimum and maximum possible number of syllables that returned words will contain

### `copycat.sentence(input)`

Takes in an [`input`](#input) value and returns a string value resembling a sentence of fictitious words.

```js
copycat.sentence('foo')
// => 'Korae nameso yomikami mumora koka chihayo mo mekocea, hakemu ceaso momimo vamu koshimake koke koaki.'
```

#### `options`

- **`minClauses=1` and `maxClauses=2`:** the minimum and maximum possible number of clauses that a returned sentence will contain.
- **`minWords=5` and `maxWords=8`:** the minimum and maximum possible number of words that each clause will contain.
- **`minSyllables=1` and `maxSyllables=4`:** the minimum and maximum possible number of syllables that returned words will contain

### `copycat.paragraph(input)`

Takes in an [`input`](#input) value and returns a string value resembling a paragraph of fictitious words.

```js
copycat.paragraph('foo')
// => 'Ninovi kechikami kona maceakinmu takiko ceame moyunoke mikaiko, nomuyo hamuyoa vamu raekaia ravimani kinshi. Yo mekimurae rae vi mivavi, kakinvi ha kohano meshi namukin raekinkai. Ni kike raceamia mi mimo noshi shiyuni hymiyo. Kai ki ninota vitakera raekamochi vami. Mimamechi muami mova ceamemuki viyo na. Ni kiko shi muvani ke, cea kochi shi vamu vi shikeha. Vacea mamumiso nichina yukina kota kaikoni, moshi shi no ravi yo ramoni yucea.'
```

#### `options`

- **`minSentences=3` and `minSentences=7`:** the minimum and maximum possible number of sentences that a returned paragraph will contain.
- **`minClauses=1` and `maxClauses=2`:** the minimum and maximum possible number of clauses that each sentence will contain.
- **`minWords=5` and `maxWords=8`:** the minimum and maximum possible number of words that each clause will contain.
- **`minSyllables=1` and `maxSyllables=4`:** the minimum and maximum possible number of syllables that returned words will contain

### `copycat.ipv4(input)`

Takes in an [`input`](#input) value and returns a string value resembling an [IPv4](https://en.wikipedia.org/wiki/IPv4) address.

```js
copycat.ipv4('foo')
// => '99.130.57.158'
```

### `copycat.mac(input)`

Takes in an [`input`](#input) value and returns a string value resembling a [MAC](https://en.wikipedia.org/wiki/MAC_address) address.

```js
copycat.mac('foo')
// => '80:a6:f3:f1:48:cf'
```


### `copycat.userAgent(input)`

Takes in an [`input`](#input) value and returns a string value resembling a browser [User Agent](https://en.wikipedia.org/wiki/User_agent) string.

```js
copycat.userAgent('foo')
// => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3 rv:3.0; MY) AppleWebKit/538.1.1 (KHTML, like Gecko) Version/7.0.6 Safari/538.1.1'
```

**note** For simplicity, this is currently working off of a list of 500 pre-defined user agent strings. If this is too limiting
for your needs and you need something more dynamic than this, please let us know, and feel free to contribute :)

### `copycat.times(input, range, fn)`

Takes in an [`input`](#input) value and a function `fn`, calls that function repeatedly (each time with a unique input) for a number of times within the given `range`, and returns the results as an array:

```js
copycat.times('foo', [4, 5], copycat.word)
// => [ 'Hyceano', 'Soni', 'Kinchimu', 'Nomemi', 'Niyoma' ]
```

As shown above, `range` can be a tuple array of the minimum and maximum possible number of times the maker should be called. It can also be given as a number, in which case `fn`  will be called exactly that number of times:

```js
copycat.times('foo', 2, copycat.word)
// => [ 'Hyceano', 'Soni' ]
```
