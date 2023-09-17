import React from 'react';
import { Text, Image, StyleSheet, ScrollView } from 'react-native';

const ProductDetails = ({ route }) => {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productRating}>Rating: {product.rating}/5</Text>
      <Text style={styles.productStock}>In Stock: {product.stock ? 'Yes' : 'No'}</Text>
      <Text style={styles.productBrand}>Brand: {product.brand}</Text>
      <Text style={styles.productCategory}>Category: {product.category}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 15,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#333',
    marginBottom: 15,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  productRating: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  productStock: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  productBrand: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  productCategory: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
});

export default ProductDetails;
