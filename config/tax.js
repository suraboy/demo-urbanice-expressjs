import dotenv from 'dotenv';

dotenv.config();

export let taxConfig = {
    tax_rate: [
        {'net_val':150000,'tax': 0.05, 'diff_val': 0},
        {'net_val':300000,'tax': 0.1, 'diff_val': 7500},
        {'net_val':500000,'tax': 0.15, 'diff_val': 27500},
        {'net_val':750000,'tax': 0.2, 'diff_val': 65000},
        {'net_val':1000000,'tax': 0.25, 'diff_val': 115000},
        {'net_val':2000000,'tax': 0.3, 'diff_val': 365000},
        {'net_val':5000000,'tax': 0.35, 'diff_val': 1265000}
    ]
}