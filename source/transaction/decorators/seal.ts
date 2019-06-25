import { IScenario } from "../interfaces";

export const seal = (arg: boolean) => {
    return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (arg) {
            descriptor.configurable = false;
            descriptor.writable = false;
            descriptor.enumerable = false;
        }
    };
};
