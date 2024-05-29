import React from "react";
import { gql, useQuery } from "@apollo/client";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View, StyleSheet, StatusBar } from "react-native";

const LOCATION = gql`
  query Location($id: ID!) {
    location(id: $id) {
      name
      type
      dimension
      residents {
        id
        name
        image
        status
      }
    }
  }
`;

export default function Location({ route, navigation }) {
    const { id } = route.params;
    const { loading, data, error } = useQuery(LOCATION, {
        variables: { id },
    });

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
                <Text style={{ color: "red" }}>Error: {error.message}</Text>
            </View>
        );
    }

    // console.log(data);
    const { name, type, dimension, residents } = data.location;

    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <Text style={styles.locationName}>{name}</Text>
                <Text style={styles.locationDetail}>Type: {type}</Text>
                <Text style={styles.locationDetail}>Dimension: {dimension}</Text>
            </View>
            <FlatList
                data={residents}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Detail", { id: item.id })}>
                        <View style={styles.residentContainer}>
                            <Image source={{ uri: item.image }} style={styles.residentImage} />
                            <View style={styles.residentInfo}>
                                <Text style={styles.residentName}>{item.name}</Text>
                                <Text style={styles.residentStatus}>{item.status}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        padding: 20,
    },
    locationContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    locationName: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    locationDetail: {
        color: 'white',
        fontSize: 18,
        marginBottom: 5,
    },
    residentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    residentImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    residentInfo: {
        flex: 1,
    },
    residentName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    residentStatus: {
        color: 'white',
        fontSize: 16,
    },
});

