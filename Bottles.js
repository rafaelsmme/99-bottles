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
    const bottleNumber = BottleNumber.for(number);

    return (
      capitalize(`${bottleNumber} of beer on the wall, `) +
      `${bottleNumber} of beer.\n` +
      `${bottleNumber.action()}, ` +
      `${bottleNumber.successor()} of beer on the wall.\n`
    );
  }
}

class BottleNumber {
  constructor(number) {
    this.number = number;
  }

  static for(number) {
    let bottleNumberClass = BottleNumber.registry.find((candidate) =>
      candidate.canHandle(number)
    );

    return new bottleNumberClass(number);
  }

  static register(bottleNumberClass) {
    BottleNumber.registry.unshift(bottleNumberClass);
  }

  static canHandle(number) {
    return true;
  }

  toString() {
    return `${this.quantity()} ${this.container()}`;
  }

  container() {
    return "bottles";
  }

  pronoun() {
    return "one";
  }

  quantity() {
    return this.number.toString();
  }

  action() {
    return `Take ${this.pronoun()} down and pass it around`;
  }

  successor() {
    return BottleNumber.for(this.number - 1);
  }
}
BottleNumber.registry = [BottleNumber];

class BottleNumber0 extends BottleNumber {
  quantity() {
    return "no more";
  }

  action() {
    return "Go to the store and buy some more";
  }

  successor() {
    return BottleNumber.for(99);
  }

  static canHandle(number) {
    return number === 0;
  }
}
BottleNumber.register(BottleNumber0);

class BottleNumber1 extends BottleNumber {
  container() {
    return "bottle";
  }

  pronoun() {
    return "it";
  }

  static canHandle(number) {
    return number === 1;
  }
}
BottleNumber.register(BottleNumber1);

class BottleNumber6 extends BottleNumber {
  container() {
    return "six-pack";
  }

  quantity() {
    return "1";
  }

  static canHandle(number) {
    return number === 6;
  }
}
BottleNumber.register(BottleNumber6);

module.exports = Bottles;
