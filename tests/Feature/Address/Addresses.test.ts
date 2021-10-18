const App = require('../../../app')
const request = require('supertest')(App)

const correctData = {};

describe('Address API', () => {

    it('Show all addresses', async () => {
        const res = await request.get('/addresses')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('addresses')
    })

    it('Create a new address', async () => {
        const res = await request
            .post('/addresses')
            .send(correctData)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('address');
    })

    it('Show an address', async () => {
        const address = {};

        const res = await request.get(`/addresses/${address['_id']}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('address')
    })


    it('Update an address', async () => {
        const address = {};
        const res = await request
            .put(`/addresses/${address['id']}`)
            .send(correctData)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('address')
    })

    it('Delete an address', async () => {
        const address = {};
        const res = await request
            .del(`/products/${address['_id']}`)
        expect(res.statusCode).toEqual(204)
    })
});