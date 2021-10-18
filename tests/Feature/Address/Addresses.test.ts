const request = require('supertest');
var app = require("../../../app");

const createData = {
    "country": "CZ",
    "city": "Brno",
    "street": "Husiva",
    "postalCode": "60200",
    "number": 6,
    "numberAddition": ""
};

describe('Address API', () => {

    test('Check wrong content type', async () => {
        const res = await request(app).get('/addresses')
        //console.log(res.statusCode);
        expect(res.statusCode).toBe(415);
        /*return request(App)
            .get('/addresses')
            .expect(415)
            .end((err,res)=>{
                expect(res.statusCode).toBe(415)
                done(res);
            })*/

    })

    /*it('Show all addresses', (done) => {
        request(App)
            .get('/addresses')
            .set('content-type', 'application/json')
            .expect(200)
            .end((err, res) => {
               // console.log(res)
                if (err) throw err;
                expect(res.body).toHaveProperty('addresses');
                done();
            })
    })

    it('Validate a new address', async () => {
        let keys = Object.keys(createData);
        for (let key of keys) {
            let unvalidatedData = keys.filter(k => k !== key)
                .reduce((obj, key) => {
                    obj[key] = createData[key];
                    return obj;
                }, {});
            request(App)
                .post('/addresses')
                .set('content-type', 'application/json')
                .send(unvalidatedData)
                .expect(422)
                .end((err, res) => {
                    if (err) throw err;
                    //console.log(res.body);
                    expect(res.body).toHaveProperty(`errors.${key}`)
                })
        }
    })
    it('Create a new address', async () => {
        request(App)
            .post('/addresses')
            .set('content-type', 'application/json')
            .send(createData)
            .expect(201)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).toHaveProperty(`address`)
                // todo: expect return address like a createData
            })
    })

    it('Show an address', async () => {
        request(App)
            .get(`/addresses`)
            .set('content-type', 'application/json')
            .end((err, res) => {
                if (err) throw err;
                let address = res.body.addresses[0]; // todo: may be ask a random address?
                request(App)
                    .get(`/addresses/${address['_id']}`)
                    .set('content-type', 'application/json')
                    .expect(200)
                    .end((err, res) => {
                        if (err) throw err;
                        expect(res.body).toHaveProperty(`address`)
                        expect(res.body.address).toEqual(address)
                    })

            })


    })


    it('Update an address', async () => {
        request(App)
            .get(`/addresses`)
            .set('content-type', 'application/json')
            .end((err, res) => {
                if (err) throw err;
                let address = res.body.addresses[0]; // todo: may be ask a random address?
                //console.log('addr',address['_id'])
                request(App)
                    .put(`/addresses/${address['_id']}`)
                    .send(createData)
                    .expect(200)
                    .end((err, res) => {
                       // console.log(res.statusCode)
                        expect(res.body).toHaveProperty("address");
                    })
            });
    })

    it('Delete an address', async () => {
        request(App)
            .get(`/addresses`)
            .set('content-type', 'application/json')
            .end((err, res) => {
                if (err) throw err;
                let address = res.body.addresses[0]; // todo: may be ask a random address?
                //console.log('addr',address['_id'])
                request(App)
                    .delete(`/addresses/${address['_id']}`)
                    .expect(200)
            });
    })*/
});