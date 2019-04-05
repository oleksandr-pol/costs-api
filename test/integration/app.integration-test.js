import config from '../../config';
import server from '../../src/app';
import rp from 'request-promise-native';
import mongoose from 'mongoose';
import Cost from '../../src/db/costModel';
import { expect } from 'chai';

const mockCost = {
  value: 100,
  title: 'Cost',
  type: 'Games'
};

describe('server api', () => {
  beforeEach(() => {
    Cost.deleteMany({ }).exec();
  });

  describe('GET:/api/costs', () => {
    it('should return costs array', async () => {
      try {
        await new Cost(mockCost).save();

        let res = await rp(`${config.getAppUrl()}/api/costs`);
        res = JSON.parse(res);

        expect(res.length).to.equal(1);
        expect(mockCost.value).to.equal(res[0].value);
      } catch (e) {
        console.error(e);
        expect(true).to.be.false;
      }
    });

    it('should throw 400 error if query is not valid', async () => {
      try {
        await rp(`${config.getAppUrl()}/api/costs?test=1`);
        expect(true).to.be.false;
      } catch (e) {
        expect(e.statusCode).to.equal(400);
      }
    });
  });

  describe('POST:/api/costs', () => {
    it('should save new cost to db', async () => {
      try {
        await rp({
          method: 'POST',
          uri: `${config.getAppUrl()}/api/costs`,
          body: mockCost,
          json: true
        });

        let saved = await rp(`${config.getAppUrl()}/api/costs`);
        saved = JSON.parse(saved);

        expect(saved.length).to.equal(1);
        expect(mockCost.value).to.equal(saved[0].value);
      } catch (e) {
        console.error(e);
        expect(true).to.be.false;
      }
    });

    it('should throw 400 error if title is not provided', async () => {
      try {
        await rp({
          method: 'POST',
          uri: `${config.getAppUrl()}/api/costs`,
          body: {
            value: 100,
            type: 'Games'
          },
          json: true
        });
        expect(true).to.be.false;
      } catch (e) {
        expect(e.statusCode).to.equal(400);
      }
    });

    it('should throw 400 error if value is not provided', async () => {
      try {
        await rp({
          method: 'POST',
          uri: `${config.getAppUrl()}/api/costs`,
          body: {
            type: 'Games',
            title: 'Cost',
          },
          json: true
        });
        expect(true).to.be.false;
      } catch (e) {
        expect(e.statusCode).to.equal(400);
      }
    });

    it('should throw 400 error if type is not provided', async () => {
      try {
        await rp({
          method: 'POST',
          uri: `${config.getAppUrl()}/api/costs`,
          body: {
            title: 'Cost',
            value: 100,
          },
          json: true
        });
        expect(true).to.be.false;
      } catch (e) {
        expect(e.statusCode).to.equal(400);
      }
    });

    it('should throw 400 error if type longer then 50 symbols', async () => {
      try {
        await rp({
          method: 'POST',
          uri: `${config.getAppUrl()}/api/costs`,
          body: {
            title: 'Cost',
            value: 100,
            type: new Array(51).fill('a')
          },
          json: true
        });
        expect(true).to.be.false;
      } catch (e) {
        expect(e.statusCode).to.equal(400);
      }
    });

    it('should throw 400 error if type has special symbols', async () => {
      try {
        await rp({
          method: 'POST',
          uri: `${config.getAppUrl()}/api/costs`,
          body: {
            title: 'Cost',
            value: 100,
            type: ', .'
          },
          json: true
        });
        expect(true).to.be.false;
      } catch (e) {
        expect(e.statusCode).to.equal(400);
      }
    });

    it('should throw 400 error if type length is less then 2 symbols', async () => {
      try {
        await rp({
          method: 'POST',
          uri: `${config.getAppUrl()}/api/costs`,
          body: {
            title: 'Cost',
            value: 100,
            type: 'a'
          },
          json: true
        });
        expect(true).to.be.false;
      } catch (e) {
        expect(e.statusCode).to.equal(400);
      }
    });
  });

  after(() => {
    mongoose.connection.close();
    server.close();
  });
});
