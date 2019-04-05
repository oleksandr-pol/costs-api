import Cost from './costModel';

import moment from 'moment';

export default {
  get: async query => Cost.find(query),
  save: async body => new Cost(body).save(),
  getById: async id => Cost.findById(id),

  getTodayCosts: async () => Cost
    .find({ createdAt: { $gte: moment.utc().startOf('day') }})
    .sort({ createdAt: 1 }),

  updateById: async (id, body) => Cost.findOneAndUpdate(
    { _id: id },
    { $set: body },
    { useFindAndModify: false }
  )
};
