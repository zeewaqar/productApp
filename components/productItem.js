
const ProductItem = memo(({ item, onPress }) => {
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

    Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
    }).start();

    return (
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
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
        </Animated.View>
    );
});

export default ProductItem;
