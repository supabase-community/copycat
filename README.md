# ![copycat](https://user-images.githubusercontent.com/1731223/167850970-584e6953-6543-4085-af5a-f9d8b7ffe988.png)

```js
import { copycat } from '@snaplet/copycat'

copycat.email('foo')
// => 'Shyann.Keebler84362@prang-auditorium.com'

copycat.email('bar')
// => 'Remington_Ernser34080@auditbracket.biz'

copycat.email('foo')
// => 'Shyann.Keebler84362@prang-auditorium.com'
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
// => 'Shyann.Keebler84362@prang-auditorium.com'

copycat.email('bar')
// => 'Remington_Ernser34080@auditbracket.biz'

copycat.email('foo')
// => 'Shyann.Keebler84362@prang-auditorium.com'
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
// => 'Shyann.Keebler84362@prang-auditorium.com'
```

The given input can be any JSON-serializable value. For any two calls to the same function, the input given in each call serializes down to the same value and the same output will be returned.

Note that unlike `JSON.stringify()`, object property ordering is not considered.

## Working with PII (Personal Identifiable Information)

If you're using sensitive information as input to Copycat, the fact that Copycat makes use of [md5](https://en.wikipedia.org/wiki/MD5) means it is difficult for the original input value to be inferred from the output value - it is computationally infeasible.

```js
// It is difficult to reverse engineer 'Some sensitive input'
// from 'Rhianna Ebert'
copycat.fullName('Some sensitive input')
// => "Marcelino O'Reilly"
```

That said, there is still something we need to watch out for: with enough guessing, the input values can still be figured out from the output values.

Lets say we replaced all the first names in some table of data. Included in this data was the name `'Susan'`, which was replaced with `'Therese'`:

```js
copycat.firstName('Susan') // -> 'Therese'
```

While the attacker is able to see the name `Therese`, it is difficult for them to look at Copycat's code, and figure out `'Susan'` from `'Therese'`. But the attacker knows they're dealing with first names, and they have access to the Copycat library. What they can do, is input a list of first names into Copycat, until they find a matching name.

Let's say they input the name `'John'`. The result is `'April'`, which does not match `'Therese'`, so they move on. They next try `'Sarah'`, which maps to `'Florencio'` - again no match, they move on. They next try `Susan`, which maps to the name they see - `Therese`. This means they have a match, and now know that the original name was `Susan`:

```js
copycat.firstName('John') // -> 'April', no match
copycat.firstName('Sarah') // -> 'Florencio', no match
copycat.firstName('Susan') // -> 'Therese', match!
```

To mitigate this, Copycat supports [salt](https://en.wikipedia.org/wiki/Salt_(cryptography)) with [`setSalt`](#set-salt) - additional data concatenated onto the input value before hashing:

```js
copycat.fullName('foo')
// => 'Deion Grimes'

copycat.setSalt('something-else')

copycat.fullName('foo')
// => 'Deion Grimes'
```

The idea is that while Copycat's code is publicly known, the salt isn't publically known. This means that even though attackers have access to Copycat's
code, they are not able to figure out which inputs map to which outputs, since they do not have access to the salt.

Ideally, one salt should be used per-value, rather than re-used for several values. If salt is re-used, an attacker can [pre-compute a table of results](https://en.wikipedia.org/wiki/Rainbow_table). In our example, a salt value can be chosen and used along with a list of names to pre-compute the corresponding output values.

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
// => 'Dkhqjf Ijnvzn'
```

If a number is given, each digit will be replaced, and the floating point (if relevant) will be preserved:


```js
copycat.scramble(782364.902374)
// => 455249.416851
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
// => { a: [ { b: 89, c: 'dol' } ] }
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
// => 'saa@eev.ihr'
```

### `copycat.oneOf(input, values)`

Takes in an [`input`](#input) value and an array of `values`, and returns an item in `values` that corresponds to that `input`:

```js
copycat.oneOf('foo', ['red', 'green', 'blue'])
// => 'green'
```

### `copycat.someOf(input, range, values)`

Takes in an [`input`](#input) value and an array of `values`, repeatedly picks items from that array a number of times within the given range that corresponds to that `input`. Each item will be picked no more than once.

```js
copycat.someOf('foo', [1,2], ['paper', 'rock'])
// => [ 'paper' ]
```

### `copycat.int(input[, options])`

Takes in an [`input`](#input) value and returns an integer.

```js
copycat.int('foo')
// => 1130286486246320
```

#### `options`

- **`min=0` and `max=Infinity`:** the minimum and maximum possible values for returned numbers

### `copycat.bool(input)`

Takes in an [`input`](#input) value and returns a boolean.

```js
copycat.bool('foo')
// => false
```

### `copycat.float(input[, options])`

Takes in an [`input`](#input) value and returns a number value with both a whole and decimal segment.

```js
copycat.float('foo')
// => 44976081715.21791
```

### `copycat.char(input)`

Takes in an [`input`](#input) value and returns a string with a single character.

```js
copycat.char('foo')
// => 'I'
```

The generated character will be an alphanumeric: lower and upper case ASCII letters and digits 0 to 9.

### `copycat.digit(input)`

Takes in an [`input`](#input) value and returns a string with a single digit value.

```js
copycat.digit('foo')
// => '0'
```

### `copycat.hex(input)`

Takes in an [`input`](#input) value and returns a string with a single hex value.

```js
copycat.hex('foo')
// => '0'
```

#### `options`

- **`min=0` and `max=Infinity`:** the minimum and maximum possible values for returned numbers

### `copycat.dateString(input[, options])`

Takes in an [`input`](#input) value and returns a string representing a date in [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) format.

```js
copycat.dateString('foo')
// => '1980-09-05T08:26:43.000Z'
```

#### `options`

- **`minYear=1980` and `maxYear=2019`:** the minimum and maximum possible year values for returned dates

### `copycat.uuid(input)`

Takes in an [input](#input) and returns a string value resembling a [uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier).

```js
copycat.uuid('foo')
// => 'dcbf0746-8d7b-568d-b743-d847466156d4'
```

### `copycat.email(input)`

Takes in an [input](#input) and returns a string value resembling an email address.

```js
copycat.email('foo')
// => 'Shyann.Keebler84362@prang-auditorium.com'
```

#### `options`

- **`limit`:** Constrain generated values to be less than or equal to `limit` number of chars

### `copycat.firstName(input)`

Takes in an [input](#input) and returns a string value resembling a first name.

```js
copycat.firstName('foo')
// => 'Reina'
```

#### `options`

- **`limit`:** Constrain generated values to be less than or equal to `limit` number of chars

### `copycat.lastName(input)`

Takes in an [input](#input) and returns a string value resembling a last name.

```js
copycat.lastName('foo')
// => 'Gusikowski'
```

#### `options`

- **`limit`:** Constrain generated values to be less than or equal to `limit` number of chars

### `copycat.fullName(input)`

Takes in an [input](#input) and returns a string value resembling a full name.

```js
copycat.fullName('foo')
// => 'Deion Grimes'
```

#### `options`

- **`limit`:** Constrain generated values to be less than or equal to `limit` number of chars

### `copycat.phoneNumber(input)`

Takes in an [input](#input) and returns a string value resembling a [phone number](https://en.wikipedia.org/wiki/MSISDN).

```js
copycat.phoneNumber('foo')
// => '+4876933740157'
```

**note** The strings _resemble_ phone numbers, but will not always be valid. For example, the country dialing code may not exist, or for a particular country, the number of digits may be incorrect. Please let us know if you need valid
phone numbers, and feel free to contribute :)

### `copycat.username(input)`

Takes in an [input](#input) and returns a string value resembling a username.

```js
copycat.username('foo')
// => 'noxious_pressroom84362'
```

#### `options`
- **`limit`:** Constrain generated values to be less than or equal to `limit` number of chars

### `copycat.password(input)`

Takes in an [`input`](#input) value and returns a string value resembling a password.

```js
copycat.password('foo')
// => '}$m9kkmw&S*A'
```

**Note:** not recommended for use as a personal password generator.

### `copycat.city(input)`

Takes in an [input](#input) and returns a string value representing a city.

```js
copycat.city('foo')
// => 'Norwalk'
```
### `copycat.country(input)`

Takes in an [input](#input) and returns a string value representing a country.

```js
copycat.country('foo')
// => 'Mali'
```

### `copycat.streetName(input)`

Takes in an [input](#input) and returns a string value representing a fictitious street name.

```js
copycat.streetName('foo')
// => 'Klein Station'
```

### `copycat.streetAddress(input)`

Takes in an [input](#input) and returns a string value representing a fictitious street address.

```js
copycat.streetAddress('foo')
// => '279 Cleora Oval'
```

### `copycat.postalAddress(input)`

Takes in an [input](#input) and returns a string value representing a fictitious postal address.

```js
copycat.postalAddress('foo')
// => '534 Linnie Lock, Gaithersburg 5636, Liechtenstein'
```

### `copycat.countryCode(input)`

Takes in an [input](#input) and returns a string value representing a country code.

```js
copycat.countryCode('foo')
// => 'ID'
```

## `copycat.timezone(input)`

Takes in an [input](#input) and returns a string value representing a time zone.

```js
copycat.timezone('foo')
// => 'Asia/Hong_Kong'
```

### `copycat.word(input)`

Takes in an [`input`](#input) value and returns a string value resembling a fictitious word.

```js
copycat.word('foo')
// => 'Vamemo'
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
// => 'Ceaƙinchi'
'Memu'
```

### `copycat.words(input)`

Takes in an [`input`](#input) value and returns a string value resembling fictitious words.

```js
copycat.words('foo')
// => 'Nishi nani'
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
// => 'Kami ra vanota vihyshi kakeha yu mimoni hahymami, nimesoni via niramo rakinmoki shi kaihanova ma.'
```

#### `options`

- **`minClauses=1` and `maxClauses=2`:** the minimum and maximum possible number of clauses that a returned sentence will contain.
- **`minWords=5` and `maxWords=8`:** the minimum and maximum possible number of words that each clause will contain.
- **`minSyllables=1` and `maxSyllables=4`:** the minimum and maximum possible number of syllables that returned words will contain

### `copycat.paragraph(input)`

Takes in an [`input`](#input) value and returns a string value resembling a paragraph of fictitious words.

```js
copycat.paragraph('foo')
// => 'Ceakokaki yumi komuchi metanichi soshiha nikenoni yuha. Muraceayu mi nomekaiyo yu kemanihy ceahy ko. Ravinome kokai chiyochi no kin kaimeshima tayo, nohykinmi na hanoke na ceakeni ke. Vamika yu raeshivamu ketakocea kaiso mahyrano kinmea, mivamu chike raevamume ceachi memurae nani shikahy. Vihysochi haso koshi mokashirae yokinmo, sohayoke musorae name ni chiraechi.'
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
// => '59.192.35.64'
```

### `copycat.mac(input)`

Takes in an [`input`](#input) value and returns a string value resembling a [MAC](https://en.wikipedia.org/wiki/MAC_address) address.

```js
copycat.mac('foo')
// => '4f:1c:16:0e:ca:5a'
```


### `copycat.userAgent(input)`

Takes in an [`input`](#input) value and returns a string value resembling a browser [User Agent](https://en.wikipedia.org/wiki/User_agent) string.

```js
copycat.userAgent('foo')
// => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_9)  AppleWebKit/535.1.1 (KHTML, like Gecko) Chrome/13.0.880.0 Safari/535.1.1'
```

**note** For simplicity, this is currently working off of a list of 500 pre-defined user agent strings. If this is too limiting
for your needs and you need something more dynamic than this, please let us know, and feel free to contribute :)

### `copycat.times(input, range, fn)`

Takes in an [`input`](#input) value and a function `fn`, calls that function repeatedly (each time with a unique input) for a number of times within the given `range`, and returns the results as an array:

```js
copycat.times('foo', [4, 5], copycat.word)
// => [ 'Kinyoahy', 'Momeki', 'Memichi', 'Nihychino', 'Hanokinmo' ]
```

As shown above, `range` can be a tuple array of the minimum and maximum possible number of times the maker should be called. It can also be given as a number, in which case `fn`  will be called exactly that number of times:

```js
copycat.times('foo', 2, copycat.word)
// => [ 'Kinyoahy', 'Momeki' ]
```

### `copycat.setSalt(string)`

<a name="set-salt"></a>Uses the given `string` value as salt when Copycat hashes input values. Helpful for changing the generated results.

```js
copycat.fullName('foo')
// => 'Deion Grimes'

copycat.setSalt('something-else')

copycat.fullName('foo')
// => 'Deion Grimes'
```
