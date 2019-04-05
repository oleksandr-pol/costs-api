import Joi from 'joi';

export default Joi.object().keys({
  type: Joi.string().alphanum().max(50)
});
