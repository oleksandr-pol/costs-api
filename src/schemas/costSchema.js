import Joi from 'joi';

export default Joi.object().keys({
  value: Joi.number().min(0).max(1000000).required(),
  title: Joi.string().alphanum().min(2).max(70).required(),
  type: Joi.string().alphanum().min(2).max(50).required()
});
