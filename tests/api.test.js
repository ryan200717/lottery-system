const request = require('supertest');
const app = require('../index');
const { errorCodeMessage } = require('../constant/errorMessage');
const { getTestTicket } = require('../data/tickets'); // Assuming your API entry point is 'index.js'

describe('get /api/v1/ticket/available', () => {
    test('Happy Flow', async () => {
        const { body: response } = await request(app).get('/api/v1/ticket/available');
        expect(typeof response.success).toBe('boolean');
        expect(response.status).toBe(200);
        expect(typeof response.data).toBe('object');
        expect(typeof response.data.available).toBe('boolean');
    });
});

describe('POST /api/v1/ticket', () => {
    test('Happy Flow', async () => {
        const userName = 'test_user';
        const { body: response } = await request(app).post('/api/v1/ticket').send({
            user_name: userName,
        });
        expect(typeof response.success).toBe('boolean');
        expect(response.status).toBe(200);
        expect(typeof response.data).toBe('object');
        expect(typeof response.data.ticket_id).toBe('string');
        expect(response.data.owner_name).toBe(userName);
        expect(typeof response.data.round).toBe('number');
        expect(typeof response.data.create_time).toBe('string');
    });

    test('Unhappy flow: Missing Username', async () => {
        const { body: response } = await request(app).post('/api/v1/ticket').send({
        });
        expect(typeof response.success).toBe('boolean');
        expect(response.status).toBe(400);
        expect(typeof response.message).toBe('string');
        expect(response.errCode).toBe('0001');
    });
});

describe('GET /api/v1/result', () => {
    test('Happy Flow', async () => {
        const result = await getTestTicket();
        const ticketId = result.id;
        const name = result.owner_name;
        const { body: response } = await request(app).get(`/api/v1/ticket/result?user_name=${name}&ticket_id=${ticketId}`);
        expect(typeof response.success).toBe('boolean');
        expect(response.status).toBe(200);
        expect(typeof response.data).toBe('object');
        expect(typeof response.data.result).toBe('string');
        expect(response.data.owner_name).toBe(name);
        expect(typeof response.data.round).toBe('number');
        expect(typeof response.data.ticket_id).toBe('string');
    });

    test('Unhappy flow: Missing Username', async () => {
        const ticketId = 'dd0d5170-1450-4a28-a172-5f70b9925887';
        const { body: response } = await request(app).get(`/api/v1/ticket/result?ticket_id=${ticketId}`);
        expect(typeof response.success).toBe('boolean');
        expect(typeof response.message).toBe('string');
        expect(response.message).toBe(errorCodeMessage['0001'].message);
        expect(response.status).toBe(errorCodeMessage['0001'].statusCode);
        expect(response.errCode).toBe('0001');
    });

    test('Unhappy flow: Missing ticketId', async () => {
        const name = '1234';
        const { body: response } = await request(app).get(`/api/v1/ticket/result?user_name=${name}`);
        expect(typeof response.success).toBe('boolean');
        expect(typeof response.message).toBe('string');
        expect(response.message).toBe(errorCodeMessage['0002'].message);
        expect(response.status).toBe(errorCodeMessage['0002'].statusCode);
        expect(response.errCode).toBe('0002');
    });

    test('Unhappy flow: No relevant ticket', async () => {
        const name = '1234';
        const ticketId = 'dd0d5170-1450-4a28-a172-5f70b9925';
        const { body: response } = await request(app).get(`/api/v1/ticket/result?user_name=${name}&ticket_id=${ticketId}`);
        expect(typeof response.success).toBe('boolean');
        expect(typeof response.message).toBe('string');
        expect(response.message).toBe(errorCodeMessage['0004'].message);
        expect(response.status).toBe(errorCodeMessage['0004'].statusCode);
        expect(response.errCode).toBe('0004');
    });
});
