import mongoose from 'mongoose';
import { updatePost } from '../controllers/posts.js';
import PostMessage from '../models/postMessage.js';

jest.mock('../models/postMessage.js');

describe('updatePost', () => {
  it('should update a post and return the updated post', async () => {
    const mockId = 'some_id';
    const mockRequest = {
      params: { id: mockId },
      body: {
        title: 'Updated Title',
        message: 'Updated Message',
        creator: 'updated_user_id',
        selectedFile: 'updated_file_url',
        tags: ['tag1', 'tag2'],
      },
    };

    // Create a mock response object
    const mockStatus = jest.fn();
    const mockSend = jest.fn();
    const mockResponse = {
      status: mockStatus,
      send: mockSend,
    };

    const mockUpdatedPost = {
      _id: mockId,
      title: 'Updated Title',
      message: 'Updated Message',
      creator: 'updated_user_id',
      selectedFile: 'updated_file_url',
      tags: ['tag1', 'tag2'],
    };

    // Mock the findByIdAndUpdate method of the PostMessage model
    PostMessage.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedPost);

    // Call the updatePost function with mock request and response
    await updatePost(mockRequest, mockResponse);

    // Assertions
    expect(PostMessage.findByIdAndUpdate).toHaveBeenCalledWith(
      mockId,
      {
        title: mockRequest.body.title,
        message: mockRequest.body.message,
        creator: mockRequest.body.creator,
        selectedFile: mockRequest.body.selectedFile,
        tags: mockRequest.body.tags,
      },
      { new: true }
    );
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockSend).not.toHaveBeenCalled(); // Ensure no error occurred
    expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedPost);
  });
});
