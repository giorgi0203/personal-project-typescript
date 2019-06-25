import Transaction from "./transaction";
import { IScenario, IStore } from "./transaction/interfaces";

const scenario: IScenario[] = [
  {
    call: async (store: IStore) => {
      store.name = "giorgi";
      store.email = "giorgi1997arabuli@gmail.com";
    },
    index: 3,
    meta: {
      description:
        "This action is responsible for reading the most popular customers",
      title: "Read popular customers",
    },
  },
  {
    call: async (store: IStore) => {
      store.surname = "arabuli";
      throw new Error("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
    },
    index: 1,
    meta: {
      description: "This action is responsible for Adding new customer",
      title: "Add customer",
    },

    restore: async () => {
      console.log("step 2 restore called");
    },
    silent: true,
  },
  {
    call: async (store: IStore) => {
      //   console.log(store);
    },
    index: 2,
    meta: {
      description: "This action is responsible for Adding new customer",
      title: "Add customer",
    },
    silent: true,
  },
];

const transaction = new Transaction();

(async () => {
  try {
    await transaction.dispatch(scenario);
    const store = transaction.store; // {} | null
    const logs = transaction.logs; // []

    for (const log of logs) {
      console.log("******************************");
      console.log(log);
    }
  } catch (err) {
    console.log("******************************");
    console.log(err);
    // Send email about broken transaction
  }
})();
