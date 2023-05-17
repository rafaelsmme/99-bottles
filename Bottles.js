const { capitalize, downTo } = require("./helpers");

class Bottles {
  song() {
    return this.verses(99, 0);
  }

  verses(upper, lower) {
    return downTo(upper, lower)
      .map((i) => this.verse(i))
      .join("\n");
  }

  verse(number) {
    const bottleNumber = this.bottleNumberFor(number);
    const nextBottleNumber = this.bottleNumberFor(bottleNumber.successor());

    return (
      capitalize(`${bottleNumber} of beer on the wall, `) +
      `${bottleNumber} of beer.\n` +
      `${bottleNumber.action()}, ` +
      `${nextBottleNumber} of beer on the wall.\n`
    );
  }

  bottleNumberFor(number) {
    if (number === 0) return new BottleNumber0(number);
    else return new BottleNumber(number);
  }
}

class BottleNumber {
  constructor(number) {
    this.number = number;
  }

  toString() {
    return `${this.quantity()} ${this.container()}`;
  }

  container() {
    if (this.number === 1) return "bottle";
    else return "bottles";
  }

  pronoun() {
    if (this.number === 1) return "it";
    else return "one";
  }

  quantity() {
    if (this.number === 0) return "no more";
    else return this.number.toString();
  }

  action() {
    if (this.number === 0) return "Go to the store and buy some more";
    return `Take ${this.pronoun()} down and pass it around`;
  }

  successor() {
    if (this.number === 0) return 99;
    return this.number - 1;
  }
}

class BottleNumber0 extends BottleNumber {
  quantity() {
    return "no more";
  }
}

module.exports = Bottles;
