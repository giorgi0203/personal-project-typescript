import { log, errorLog, scenario } from './interfaces';
export default class Transaction {
    store: any = {};
    logs: Array<log | errorLog> = new Array();
    constructor() {

    }

    async dispatch(scenarios: Array<scenario>) {
        scenarios.sort((curr, next) => {
            return curr.index > next.index ? 1 : -1;
        });

        for (let i = 0; i < scenarios.length; i++) {
            //save current state
            let storeBefore = { ...this.store };
            try {
                //get new state
                await scenarios[i].call(this.store);
                let storeAfter = { ...this.store };
                //build up log object
                let { meta, index } = scenarios[i];
                this.logs.push({
                    meta,
                    index,
                    storeBefore,
                    storeAfter,
                    error: null
                });
            } catch (err) {
                let { meta, index, silent } = scenarios[i];
                if (silent == false || silent == undefined) {
                    this.logs.push({
                        meta,
                        index,
                        error: err
                    });
                    for (let j = i - 1; j >= 0; j--) {
                        if (scenarios[j].restore) {
                            try {
                                await scenarios[j].restore();
                            } catch (err) {
                                throw err;
                            }

                        }
                    }
                    this.store = null;
                    break;
                } else if (silent == true) {
                    let storeAfter = this.store;
                    let { meta, index } = scenarios[i];
                    this.logs.push({
                        meta,
                        index,
                        storeBefore,
                        storeAfter,
                        error: err
                    });
                }
            }
        }
    }
}

