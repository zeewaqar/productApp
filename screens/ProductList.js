import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Animated, ActivityIndicator } from 'react-native';
import { debounce } from 'lodash';

const ProductItem = memo(({ item, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.productItem}
            onPress={onPress}
        >
            <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
            </View>
        </TouchableOpacity>
    );
});

const ProductList = ({ navigation }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [allLoaded, setAllLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const animatedValue = useRef(new Animated.Value(0)).current;

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
        extrapolate: 'clamp',
    });

    useEffect(() => {
        fetchProducts();
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
         return () => {
        animatedValue.stopAnimation();
    };
    }, [page]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);
            const data = await response.json();
            if (data && data.products) {
                setAllProducts(prevProducts => [...prevProducts, ...data.products]);
                setProducts(prevProducts => [...prevProducts, ...data.products]);
                if (data.products.length < 10) {
                    setAllLoaded(true);
                }
            }
            setLoading(false);
        } catch (error) {
            setError('Error fetching products: ' + error.message);
            setLoading(false);
        }
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text.trim() === '') {
            setProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(text.toLowerCase()));
            setProducts(filteredProducts);
        }
    };
    const handleEndReached = debounce(() => {
        if (!allLoaded && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    }, 500);
    const renderItem = useCallback(({ item }) => {
        const handlePress = () => {
            navigation.navigate('ProductDetails', { product: item });
        };

        return <ProductItem item={item} onPress={handlePress} />;
    }, [navigation]);

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search products..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholderTextColor="#888"
                    returnKeyType="search"
                />
            </View>
            <Animated.FlatList
                style={{ opacity, transform: [{ translateY }] }}
                data={products}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                refreshing={refreshing}
                onRefresh={() => {
                    setPage(1);
                    setProducts([]);
                    fetchProducts();
                }}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
                initialNumToRender={10}
                ListFooterComponent={renderFooter}
            />
            {error && <Text style={styles.errorText}>Error: {error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    searchIcon: {
        paddingRight: 15,
        paddingLeft: 15,
    },
    productItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    productInfo: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    searchBar: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    footer: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#e5e5e5"
    },
});

export default ProductList;
