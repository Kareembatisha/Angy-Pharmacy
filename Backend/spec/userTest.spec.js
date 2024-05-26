import supertest from 'supertest';
import server from '../index.js';
const request = supertest(server)

describe("test cart routes",()=>{

    it("test post routes", async ()=>{
        const res = await request.post('/test').send({
            "name":"mohamed",
            "password":"123456"
        })
        expect(res.status).toEqual(200)
        expect(res.body).toEqual(jasmine.objectContaining({name: "mohamed"}))

    })
    it("test get routes", async ()=>{
        const res = await request.get('/test')
        expect(res.status).toEqual(200)
        expect(res.body).toEqual(jasmine.any(Object))
    })

})