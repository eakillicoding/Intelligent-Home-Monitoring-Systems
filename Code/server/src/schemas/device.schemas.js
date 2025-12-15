const { z } = require("zod");

const createDeviceSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    location: z.string().optional(),
    isActive: z.boolean().optional()
  })
});

const updateDeviceSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    name: z.string().min(1).optional(),
    location: z.string().optional(),
    isActive: z.boolean().optional()
  })
});

module.exports = { createDeviceSchema, updateDeviceSchema };
