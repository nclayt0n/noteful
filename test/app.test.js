require('dotenv').config()
const { API_TOKEN } = require('../config')
console.log(API_TOKEN)
const app = require('../App')
describe('App', () => {
    it('GET / responds with 200 containing "Hello, world!"', () => {
        return supertest(app)
            .get('/')
            .set('Authorization', `Bearer ${process.env.REACT_APP_API_KEY}`)
            .expect(200, 'Hello, world!')
    })
})