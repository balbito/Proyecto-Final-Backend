import { expect } from 'chai';
import supertest from "supertest";



const requester = supertest('http://localhost:8080');

describe("Cart test", async () => {
    let cookie;
    let userCookie;
    before(async()=>{
    // Definir un usario como administrador
      const userPremium = {
        email: "test1@gmail.com",
        password: "123qe"
      }
      const adminloginResult = await requester.post("/api/jwt/login").send(userPremium)
      cookie = adminloginResult.headers["set-cookie"][0]
    //  usuario comun
      const usuario = {
        first_name: "Agustin",
        last_name: "Perez",
        email: "agusperez@gmail.com",
        age: 25,
        password: "123qe"
    }
    
    const loginResult = await requester.post("/api/jwt/login").send(usuario)
    userCookie = loginResult.headers["set-cookie"][0]
    })


    it("Trayendo carritos", async () => {
        const carritos = await requester.get("/api/carts").set("Cookie", cookie)
        expect(carritos.statusCode).to.be.eql(200)
        expect(Array.isArray(carritos._body)).to.eql(true)
    })

    it("Deberia comprar los productos del carito exitosamente", async () => {
      
      const agregarProducto = await requester.post("/api/carts/product/65aea32b178d4978d3ba8f4e").set("Cookie", userCookie)
      expect(agregarProducto.statusCode).to.be.eql(200)
      const comprarProducto = await requester.post("/api/carts/ticket/purchase").set("Cookie", userCookie)
      expect(comprarProducto.statusCode).to.be.eql(200)
      expect(comprarProducto._body.message).to.be.eql("Compra realizada exitosamente")
    })
})