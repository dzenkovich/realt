import { THIS_YEAR } from '../constants'

export default {
  filter: {
    rooms: [1, 2, 3],
    year: { gt: 2000, lt: THIS_YEAR },
    price: { gt: 50000, lt: 150000 },
    priceMeter: { gt: 500, lt: 2000 },
    area: { gt: 30, lt: 80 },
  },
}
