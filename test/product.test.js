import { expect } from 'chai';
import supertest from "supertest";



const requester = supertest('http://localhost:8080');

describe("Test Product", () => {
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


    it("Crear Producto: El API POST /api/products debe crear producto correctamente", async () => {

        // Given
        const productMock = {
            title: "Hamburguesa 2",
            description: "Hamburguesa con bacon",
            price: 5000,
            thumbnail: "🍔",
            code: "582500",
            stock: 0,
            status: true,
            category: "alimentos",
        }


        // Then
        const result = await requester.post('/api/products').set("Cookie", cookie).send(productMock)
        expect(result.statusCode).to.be.eql(200)


        // Assert that:
    })

})