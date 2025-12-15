const request = require("supertest");
const app = require("../src/app");
const { prisma } = require("../src/db");

beforeAll(async () => {
  await prisma.passwordResetToken.deleteMany();
  await prisma.energyReading.deleteMany();
  await prisma.device.deleteMany();
  await prisma.userSettings.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

test("signup creates user and returns token", async () => {
  const res = await request(app).post("/api/auth/signup").send({
    email: "test@example.com",
    password: "password123",
    name: "Test"
  });

  expect(res.statusCode).toBe(201);
  expect(res.body.token).toBeTruthy();
  expect(res.body.user.email).toBe("test@example.com");
});

test("login returns token for valid credentials", async () => {
  const res = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
    password: "password123"
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.token).toBeTruthy();
});
