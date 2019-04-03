import config from '../../config';
import server from '../../src/app';
import request from 'request';
import mongoose from 'mongoose';
import Cost from '../../src/models/costModel';
import { expect } from 'chai';

describe('server api', () => {
  beforeEach(() => {
    Cost.deleteMany({ }).exec();
  });

  it('should return costs array', done => {
    const mockCost = {
      value: 100,
      title: 'Cost',
      type: 'Games'
    };

    new Cost(mockCost).save().then(() => {
      request(`${config.getAppUrl()}/api/costs`, (err, res, body) => {
        if (err) {
          return done(err);
        }
        const response = JSON.parse(body);

        expect(response.length).to.equal(1);
        expect(mockCost.value).to.equal(response[0].value);
        done();
      })
    }).catch(err => done(err));
  });

  after(() => {
    mongoose.connection.close();
    server.close();
  });
});
