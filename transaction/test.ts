import Transaction from '.';
import { scenario } from './interfaces';

const scenario: Array<scenario> = [
    {
        index: -1,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers',
        },
        call: async (store: any) => {
            console.log(store);
            
            store.name = 'giorgi';
            store.email = 'giorgi1997arabuli@gmail.com';
        },
    },
    {
        index: 1,
        silent: true,
        meta: {
            title: 'Add customer',
            description: 'This action is responsible for Adding new customer'
        },
        call: async (store: any) => {
            store.surname = 'arabuli';
            throw new Error('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
        },
        restore: async () => {
            console.log('step 2 restore called');
        }
    },
    {
        index: 2,
        meta: {
            title: 'Add customer',
            description: 'This action is responsible for Adding new customer'
        },
        call: async () => {
        },
        silent: true,
    }
];

const transaction = new Transaction();

(async () => {
    try {
        await transaction.dispatch(scenario);
        const store = transaction.store; // {} | null
        const logs = transaction.logs; // []

        for (const log of logs) {
            console.log('******************************');
            console.log(log);
        }
    } catch (err) {
        console.log('******************************');
        console.log(err);
        // Send email about broken transaction
    }
})();