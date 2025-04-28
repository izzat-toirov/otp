import Joi from "joi";

const user = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    color: Joi.string(),
    price: Joi.number(),
    role: Joi.string().valid('superadmin', 'admin').default('admin')
});

export const userValid = (req, res, next) => {
    const { error, value } = user.validate(req.body);
    if (error) {
        return res.status(400).json({
            statusCode: 400,
            message: error.details[0].message
        });
    }
    req.validatedData = value;
    next();
};
