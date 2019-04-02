import { assert } from 'chai';
import sinon from 'sinon';
import costController from './costsController';
import CostModel from '../models/costModel';

describe('Costs Controller: ', () => {
  describe('Post', () => {
    it('should not allow to create costs without title', (done) => {
      const req = {
        body: {
          value: 100
        }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.spy(),
        json: sinon.spy()
      };


      const controller = costController(CostModel);
      controller.post(req, res).then(err => {
        assert.equal(res.status.calledWith(400), true);
        assert.equal(res.json.calledWith(err), true);
        done();
      });
    });
  });
});
