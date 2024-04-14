import { expect } from 'chai';
import supertest from "supertest";



const requester = supertest('http://localhost:8080');

describe("Login Test", () => {
    const usuario = {
        first_name: "Agustin",
        last_name: "Perez",
        email: "agusperez@gmail.com",
        age: 25,
        password: "123qe"
    }
    it("Deberia registrar al usuario", async () => {
        const registerResult = await requester.post("/api/jwt/register").send(usuario)
        expect(registerResult.statusCode).to.be.eql(201)
    })


    it("Deberia loguear al usuario", async () => {
        const loginResult = await requester.post("/api/jwt/login").send(usuario)
        expect(loginResult.statusCode).to.be.eql(302)
    })
})