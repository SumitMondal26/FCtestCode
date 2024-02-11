const request = require('supertest');
const { app } = require('../../index');

describe('Integration Tests', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return a 200 OK status code for GET request to /health', async () => {
    const response = await request(server).get('/health');
    expect(response.status).toBe(200);
  });

  it('should return a 200 OK status code for POST request to /news/create with match id', async () => {

    const response = await request(server).post('/news/create')
      .send(
        { title: "news title", description: "news description", matchId: "1" }
      );

    expect(response.text).toBe(JSON.stringify({ "status": "successfull" }));

    expect(response.status).toBe(200);
  });

  it('should return a 200 OK status code for POST request to /news/create with tour id', async () => {

    const response = await request(server).post('/news/create')
      .send(
        { title: "news title", description: "news description", tourId: "2" }
      );

    expect(response.text).toBe(JSON.stringify({ "status": "successfull" }));

    expect(response.status).toBe(200);
  });

  it('should return a 200 OK status code for POST request to /news/create with tour id & match id', async () => {

    const response = await request(server).post('/news/create')
      .send(
        { title: "news title", description: "news description", tourId: "3", matchId: "8" }
      );

    expect(response.text).toBe(JSON.stringify({ "status": "successfull" }));

    expect(response.status).toBe(200);
  });

  it('should return a 200 OK status code for POST request to /news/create with invalid tour id', async () => {

    const response = await request(server).post('/news/create')
      .send(
        { title: "news title", description: "news description", tourId: "30" }
      );

    expect(response.text).toBe(JSON.stringify({ "status": "invalid id given for tour" }));

    expect(response.status).toBe(200);
  });

  it('should return a 200 OK status code for POST request to /news/create with invalid match id', async () => {

    const response = await request(server).post('/news/create')
      .send(
        { title: "news title", description: "news description", matchId: "30" }
      );

    expect(response.text).toBe(JSON.stringify({ "status": "invalid id given for match" }));

    expect(response.status).toBe(200);
  });

  it('should return a 200 OK status code for POST request to /news/create with missing parameter', async () => {

    const response = await request(server).post('/news/create')
      .send(
        { title: "news title", description: "news description" }
      );

    expect(response.text).toBe(JSON.stringify({ "status": "Missing required parameter: tourId / matchId" }));

    expect(response.status).toBe(500);
  });

  it('should return a 200 OK status code for GET request to /news/sport with sportId', async () => {

    const response = await request(server).get('/news/sport')
      .query({ sportId: '1' });

    expect(
      JSON.parse(response.text).map(({ title, description, sportId, tourId, matchId }) => ({
        title,
        description,
        sportId,
        tourId,
        matchId,
      }))

    ).toEqual([
      { description: 'news description', matchId: 1, sportId: 1, title: 'news title', tourId: 1 },
      { description: 'news description', matchId: 8, sportId: 1, title: 'news title', tourId: 3 },
    ]);
    expect(response.status).toBe(200);
  });

  it('should return a 200 OK status code for GET request to /news/tour with tourId', async () => {

    const response = await request(server).get('/news/tour')
      .query({ tourId: '1' });

    expect(
      JSON.parse(response.text).map(({ title, description, sportId, tourId, matchId }) => ({
        title,
        description,
        sportId,
        tourId,
        matchId,
      }))

    ).toEqual([
      { description: 'news description', matchId: 1, sportId: 1, title: 'news title', tourId: 1 },
    ]);
    expect(response.status).toBe(200);
  });

  it('should return a 200 OK status code for GET request to /news/match with matchId', async () => {

    const response = await request(server).get('/news/match')
      .query({ matchId: '1' });

    expect(
      JSON.parse(response.text).map(({ title, description, sportId, tourId, matchId }) => ({
        title,
        description,
        sportId,
        tourId,
        matchId,
      }))

    ).toEqual([
      { description: 'news description', matchId: 1, sportId: 1, title: 'news title', tourId: 1 },
    ]);
    expect(response.status).toBe(200);
  });

  it('should return a 500 error status code for GET request to /news/match with missing matchId', async () => {

    const response = await request(server).get('/news/match')
      .query({});

    expect(JSON.parse(response.text)).toEqual({ "status": "Missing required parameter: matchId" });
    expect(response.status).toBe(500);
  });

  it('should return a 500 error status code for GET request to /news/match with missing sportId', async () => {

    const response = await request(server).get('/news/sport')
      .query({});

    expect(JSON.parse(response.text)).toEqual({ "status": "Missing required parameter: sportId" });
    expect(response.status).toBe(500);
  });

  it('should return a 500 error status code for GET request to /news/match with missing tourId', async () => {

    const response = await request(server).get('/news/tour')
      .query({});

    expect(JSON.parse(response.text)).toEqual({ "status": "Missing required parameter: tourId" });
    expect(response.status).toBe(500);
  });

  it('should return a 200 OK status code for GET request to /news', async () => {
    const response = await request(server).get('/news');

    await request(server).post('/news/purge');

    expect(
      JSON.parse(response.text).map(({ title, description, sportId, tourId, matchId }) => ({
        title,
        description,
        sportId,
        tourId,
        matchId,
      }))
    ).toEqual([
      { description: 'news description', matchId: 1, sportId: 1, title: 'news title', tourId: 1 },
      { description: 'news description', matchId: null, sportId: 2, title: 'news title', tourId: 2 },
      { description: 'news description', matchId: 8, sportId: 1, title: 'news title', tourId: 3 },
    ]);

    expect(response.status).toBe(200);
  });

});