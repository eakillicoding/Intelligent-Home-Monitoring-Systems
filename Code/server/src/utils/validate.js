function validate(schema) {
    return (req, res, next) => {
      const result = schema.safeParse({ body: req.body, params: req.params, query: req.query });
      if (!result.success) {
        return res.status(400).json({ message: "Validation error", issues: result.error.issues });
      }
      req.validated = result.data;
      next();
    };
  }
  
  module.exports = { validate };
  