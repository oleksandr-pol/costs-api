import Joi from 'joi';

export default Joi.object().keys({
  type: Joi.string()
});
