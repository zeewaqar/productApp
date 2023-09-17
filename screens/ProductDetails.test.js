import React from 'react';
import { render } from '@testing-library/react-native';
import ProductDetails from './ProductDetails'; // Update the path accordingly

describe('ProductDetails', () => {
  const mockProduct = {
    thumbnail: 'https://example.com/image.jpg',
    title: 'Test Product',
    price: '99.99',
    description: 'This is a test product.',
    rating: '4',
    stock: true,
    brand: 'Test Brand',
    category: 'Test Category',
  };

  it('renders without crashing', () => {
    render(<ProductDetails route={{ params: { product: mockProduct } }} />);
  });

  it('displays product details correctly', () => {
    const { getByText } = render(<ProductDetails route={{ params: { product: mockProduct } }} />);

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$99.99')).toBeTruthy();
    expect(getByText('This is a test product.')).toBeTruthy();
    expect(getByText('Rating: 4/5')).toBeTruthy();
    expect(getByText('In Stock: Yes')).toBeTruthy();
    expect(getByText('Brand: Test Brand')).toBeTruthy();
    expect(getByText('Category: Test Category')).toBeTruthy();
  });
});
