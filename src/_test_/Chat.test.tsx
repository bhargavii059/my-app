// import { HubConnectionBuilder } from "@microsoft/signalr";

// test('Test simple mock functionality', () => {
//     const connection = new HubConnectionBuilder();
//     connection.withUrl('http://localhost:5112/chatHub').build();
//     expect(connection.withUrl).toHaveBeenCalled(); // Test if withUrl is called
//   });
  

  import { HubConnectionBuilder } from '@microsoft/signalr'; // Assuming this is how you import HubConnectionBuilder
import { jest } from '@jest/globals';

describe('HubConnection', () => {
  it('should call withUrl once', () => {
    const connection = new HubConnectionBuilder();
    const withUrlMock = jest.fn(connection.withUrl);
    connection.withUrl = withUrlMock; // Mock the withUrl method

    connection.withUrl('http://localhost:5112/chatHub').build();

    // Verify if withUrl was called exactly once
    expect(withUrlMock).toHaveBeenCalledTimes(1);
  });
});
