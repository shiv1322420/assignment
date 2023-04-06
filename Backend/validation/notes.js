const Joi = require('joi');

const createNotesValidation = async (req, res, next) => {
    try {
       
        const schema = Joi.object({
            title:Joi.string().required().description('Title is required'),
            description:Joi.string().required().description('Title is required')

        });
        const value = await schema.validateAsync(req.body);
        req.body = value;
        next();
      } catch (error) {
        console.log("err",error)
        return res.status(400).json({ error: error.details[0].message })
      }
}

const updateNotesValidation = async (req, res, next) => {
    try {
        const schema = Joi.object({
            title:Joi.string().optional().description('Title is required'),
            description:Joi.string().optional().description('Title is required'),

        }).pattern(
            /^id$/,
            Joi.string().length(24).required().description('id of notes is required')
        );
        const value = await schema.validateAsync({...req.body,...req.params});
        req.body = value;
        next();
      } catch (error) {
        console.log("err",error)
        return res.status(400).json({ error: error.details[0].message })
      }
}

const deleteNotesValidation = async (req, res, next) => {
    try {
        
        const schema = Joi.object({
            id:Joi.string().length(24).required().description('id of notes is required')

        });
        const value = await schema.validateAsync(req.params);
        next();
      } catch (error) {
        console.log("err",error)
        return res.status(400).json({ error: error.details[0].message })
      }
}

const getNotesValidation = async (req, res, next) => {
    try {
        
        const schema = Joi.object({
            id:Joi.string().length(24).required().description('id of user is required')

        });
        const value = await schema.validateAsync(req.params);
        next();
      } catch (error) {
        console.log("err",error)
        return res.status(400).json({ error: error.details[0].message })
      }
}

const getAllNotesValidation = async (req, res, next) => {
 
    try {
        
        const schema = Joi.object({
            page:Joi.number().optional(),
            limit:Joi.number().optional()
            

        });
        const value = await schema.validateAsync(req.query);
        req.query=value
        next();
      } catch (error) {
        console.log("err",error)
        return res.status(400).json({ error: error.details[0].message })
      }
}
module.exports = {
    createNotesValidation,
    updateNotesValidation,
    deleteNotesValidation ,
    getNotesValidation,
    getAllNotesValidation 
  };