// import request from 'supertest';
// import app from '../app'; // Assuming your Express app is exported from app.js or similar
// import Destination from '../models/Destination';
// import User from '../models/User';
// import mongoose from 'mongoose';

// jest.mock('../models/Destination');
// jest.mock('../models/User');

// describe('validateAnswer', () => {
//   it('should return 404 if destination is not found', async () => {
//     Destination.findById.mockResolvedValue(null);

//     const response = await request(app)
//       .post('/api/v1/game/validate-answer')
//       .send({ destinationId: 'nonexistentId', selectedOption: 'Paris' });

//     expect(response.status).toBe(404);
//     expect(response.body.error).toBe('Destination not found');
//   });

//   it('should return 200 if the answer is correct', async () => {
//     Destination.findById.mockResolvedValue({ name: 'Paris' });

//     const response = await request(app)
//       .post('/api/v1/game/validate-answer')
//       .send({ destinationId: 'someId', selectedOption: 'Paris' });

//     expect(response.status).toBe(200);
//     expect(response.body.isCorrect).toBe(true);
//   });

//   it('should return 400 if the answer is incorrect', async () => {
//     Destination.findById.mockResolvedValue({ name: 'Paris' });

//     const response = await request(app)
//       .post('/api/v1/game/validate-answer')
//       .send({ destinationId: 'someId', selectedOption: 'Tokyo' });

//     expect(response.status).toBe(400);
//     expect(response.body.isCorrect).toBe(false);
//   });

//   it('should return 500 if there is a server error', async () => {
//     Destination.findById.mockRejectedValue(new Error('Server error'));

//     const response = await request(app)
//       .post('/api/v1/game/validate-answer')
//       .send({ destinationId: 'someId', selectedOption: 'Paris' });

//     expect(response.status).toBe(500);
//     expect(response.body.error).toBe('Error verifying answer');
//   });
// });

// not confident in that