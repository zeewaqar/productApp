import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProductList from './ProductList'; // Update the path accordingly

// Mocking the fetch function
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    products: [
      { title: "Test Product", price: "10", thumbnail: "test-image-url" }
    ]
  })
}));

describe('<ProductList />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<ProductList navigation={{ navigate: jest.fn() }} />);
    
    // Check if the search bar is rendered
    expect(getByPlaceholderText('Search products...')).toBeTruthy();
  });

  it('displays products', async () => {
    const { findByText } = render(<ProductList navigation={{ navigate: jest.fn() }} />);
    
    // Wait for the product to be displayed
    const productTitle = await findByText('Test Product');
    expect(productTitle).toBeTruthy();
  });

  // Add more tests as needed
});
