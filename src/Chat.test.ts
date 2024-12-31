import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

 import Chat from './Chat';

jest.mock('@microsoft/signalr', () => ({
  HubConnectionBuilder: jest.fn().mockReturnValue({
    withUrl: jest.fn().mockReturnThis(),
    build: jest.fn().mockReturnThis(),
    start: jest.fn().mockResolvedValueOnce(undefined),
  }),
}));

test('should establish a connection successfully', async () => {
  render(<Chat/>
  );
  await waitFor(() => expect(screen.getByText('Send')).toBeEnabled());
});





// import { render, screen } from '@testing-library/react';
// import Todo from './todo'; 

// test('testingmodule',()=>
// { 

//     render(<Todo/>)
//     const x= screen.getByTestId('todo-1');
//     expect(x).toBeInTheDocument();
    
// })