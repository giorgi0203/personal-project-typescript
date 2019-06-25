import { Log } from "./decorators";
import { IErrorLog, ILog, IScenario, IStore } from "./interfaces";

@Log
export default class Transaction {
  public store: IStore = {};

  public logs: Array<ILog | IErrorLog> = undefined;
  /**
   * this function is protected by seal and it cannot be changed
   * @param Array<IScenario>
   */
  // @seal(false)
  public async dispatch(scenarios: IScenario[]) {

    scenarios.sort((curr, next) => {
      return curr.index > next.index ? 1 : -1;
    });

    if (scenarios[0].index < 0) {
      throw new Error("index must not be negative");
    }

    for (let i = 0; i < scenarios.length; i++) {
      // save current state
      const storeBefore = { ...this.store };
      try {
        // get new state
        await scenarios[i].call(this.store);
        const storeAfter = { ...this.store };
        // build up log object
        const { meta, index } = scenarios[i];
        if (this.logs !== undefined) {
          this.logs.push({
            error: null,
            index,
            meta,
            storeAfter,
            storeBefore,
          });
        }
      } catch (err) {
        const { meta, index, silent } = scenarios[i];
        if (silent === false || silent === undefined) {
          if (this.logs !== undefined) {
            this.logs.push({
              error: err,
              index,
              meta,
            });
          }
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
        } else if (silent === true) {
          const storeAfter = this.store;
          // const { meta, index } = scenarios[i];
          if (this.logs !== undefined) {
            this.logs.push({
              error: err,
              index,
              meta,
              storeAfter,
              storeBefore,
            });
          }
        }
      }
    }
  }
}
