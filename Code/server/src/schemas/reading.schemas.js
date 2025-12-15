const { z } = require("zod");

const addReadingSchema = z.object({
  body: z.object({
    deviceId: z.number().int(),
    watts: z.number().nonnegative()
  })
});

module.exports = { addReadingSchema };
