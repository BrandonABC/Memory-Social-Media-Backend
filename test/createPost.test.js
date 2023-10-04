import { createPost } from '../controllers/posts.js';
import PostMessage from '../models/postMessage.js';

// Mock the PostMessage model
jest.mock('../models/postMessage.js');

describe('createPost', () => {
  it('should create a new post and return the saved post', async () => {
    // Define a mock request object
    const mockRequest = {
      body: {
        title: 'Test Title',
        message: 'Test Message',
      },
      userId: 'user_id',
    };

    // Define a mock response object
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockSavedPost = {
      _id: 'some_id',
      title: 'Test Title',
      message: 'Test Message',
      creator: 'user_id',
      createdAt: new Date().toISOString(),
    };

    // Mock the save method of the PostMessage prototype
    PostMessage.prototype.save = jest.fn().mockResolvedValueOnce(mockSavedPost);

    // Call the createPost function with mock request and response
    await createPost(mockRequest, mockResponse);

    // Assertions
    expect(PostMessage.prototype.save).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalled();
  });
});
