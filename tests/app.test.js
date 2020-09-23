const build = require('../src/app');
const app = build()

describe('App', () => {
  afterAll(() => {
    app.close();
  })

  test('responds with success on request GET /healtcheck', async (done) => {
    const response = await app.inject({
      method: 'GET',
      url: '/healthcheck'
    })

    expect(response.statusCode).toBe(200)
    done()
  })
})