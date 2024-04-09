import { Joi } from 'celebrate';
import { genders, mealPreferences } from '@/models/user';

export const addUserSchema = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role :Joi.string().required(),
  enrolledCourses :Joi.string().required()
};

export const userIdSchema = {
  id: Joi.string().hex().length(24).required()
};

export const updateSchema = {
  name: Joi.string().optional(),
  photo_url: Joi.string().optional(),

};

export const changePasswordSchema = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&^()._*?]{8,30}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Password should have at least one lowercase letter, one uppercase letter, one number and one special character and should be at least 8 characters long'
    })
});

export const eliminateQuerySchema = {
  vanguard: Joi.number().optional().default(10)
};
