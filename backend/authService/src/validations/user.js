import { Joi } from 'celebrate';


export const addUserSchema = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  progress: Joi.array().items(Joi.object({
    courseid: Joi.string(),
    completedContent: Joi.number().default(1),
    totalContent: Joi.number().default(1),
    percentComplete: Joi.number().default(1)
  })),
  enrolledCourses: Joi.array().items(Joi.string())

};

export const userIdSchema = {
  id: Joi.string().hex().length(24).required()
};

export const updateSchema = {
  name: Joi.string().optional(),
 

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
