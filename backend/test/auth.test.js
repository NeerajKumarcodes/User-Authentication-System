import app from "../server.js"; // Import your Express app

import { expect, use } from "chai";
import { default as chaiHttp, request } from 'chai-http';

use(chaiHttp);

describe("Authentication Tests", () => {
  let token = ""; // To store JWT for protected route testing

  // Test User Signup
  it("should register a new user", (done) => {
    request.execute(app)
      .post("/api/auth/signup")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("user");
        expect(res.body.user).to.have.property("email", "test@example.com");
        done();
      });
  });

  // Test User Login
  it("should log in the user and return a token", (done) => {
    request.execute(app) // Use request(app) instead of request.execute(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "password123",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("token");
        token = res.body.token; // Store token for protected route testing
        done();
      });
  });

  // Test Accessing Profile Without Token (Should Fail)
  it("should not allow access to profile without authentication", (done) => {
    request.execute(app) // Use request(app)
      .get("/api/user/profile")
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message", "Unauthorized, no token provided");
        done();
      });
  });

  // Test Accessing Profile With Token (Should Succeed)
  it("should allow access to profile with valid token", (done) => {
    request.execute(app) // Use request(app)
      .get("/api/user/profile")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("email", "test@example.com");
        done();
      });
  });
});
