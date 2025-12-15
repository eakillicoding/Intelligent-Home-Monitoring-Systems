const { z } = require("zod");

const signupSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1).optional()
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1)
  })
});

const resetRequestSchema = z.object({
  body: z.object({
    email: z.string().email()
  })
});

const resetConfirmSchema = z.object({
  body: z.object({
    resetToken: z.string().min(10),
    newPassword: z.string().min(8)
  })
});

module.exports = { signupSchema, loginSchema, resetRequestSchema, resetConfirmSchema };
