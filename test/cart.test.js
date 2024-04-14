import { expect } from 'chai';
import supertest from "supertest";



const requester = supertest('http://localhost:8080');

describe("Cart test", async () => {
    let cookie;
    before(async()=>{
    // Definir un usario como administrador
      const userPremium = {
        email: "aleajjuka5858@gmail.com",
        password: "123qe"
      }
      const loginResult = await requester.post("/api/jwt/login").send(userPremium)
      console.log(loginResult.headers["set-cookie"])
      cookie = loginResult.headers["set-cookie"][0]
    })

    it("Trayendo carritos", async () => {
        const carritos = await requester.get("/api/carts").set("Cookie", cookie)
        expect(carritos.statusCode).to.be.eql(200)
        expect(Array.isArray(carritos._body)).to.eql(true)
    })
})