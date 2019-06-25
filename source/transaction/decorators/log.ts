import Transaction from "../";
import { IScenario } from "../interfaces";

// tslint:disable-next-line: ban-types
export const Log = (target: Function) => {
};
function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

const Greeter = classDecorator(class {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
});
type Greeter = InstanceType<typeof Greeter> // have the instance type just as if we were to declare a class

console.log(new Greeter("world").newProperty);