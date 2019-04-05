import Joi from 'joi';

export default Joi.string().alphanum().max(30);
