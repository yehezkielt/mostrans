import React from "react";
import { gql, useQuery } from "@apollo/client";
import { ActivityIndicator, Image, Text, TouchableOpacity, View, StyleSheet, StatusBar } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const CHARACTER_DETAILS = gql`
  query Character($id: ID!) {
    character(id: $id) {
      name
      species
      gender
      image
      status
      origin {
        id
        name
      }
      location {
        id
        name
        type
      }
    }
  }
`;

export default function Detail({ route, navigation }) {
    const { id } = route.params;
    const { loading, data, error } = useQuery(CHARACTER_DETAILS, {
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

    const { name, species, gender, image, status, origin, location } = data.character;


    return (
        <>
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: image }} style={styles.profileImage} />

                    </View>
                    <Text style={styles.profileName}>{name}</Text>
                    <Text style={styles.profileLabel}>Species</Text>
                    <Text style={styles.profileDetail}>{species}</Text>
                    <Text style={styles.profileLabel}>Gender</Text>
                    <Text style={styles.profileDetail}>{gender}</Text>
                    <Text style={styles.profileLabel}>Status</Text>
                    <Text style={styles.profileDetail}>{status}</Text>
                    <Text style={styles.profileLabel}>Origin</Text>
                    <Text style={styles.profileDetail}>{origin.name}</Text>
                    <Text style={styles.profileLabel}>Location</Text>
                    <Text style={styles.profileDetail}>{location.name}</Text>
                    <Text style={styles.profileLabel}>Location Type</Text>
                    <Text style={styles.profileDetail}>{location.type}</Text>
                </View>
                <View style={styles.cartContainer}>
                    <TouchableOpacity style={styles.cartButton} onPress={() =>
                        navigation.navigate("Location", { id: location.id })
                    }>
                        <FontAwesome name="sign-out" size={24} color="white" />
                        <Text style={styles.cartButtonText}>Assign Location</Text>
                    </TouchableOpacity>
                </View>
                <StatusBar style="auto" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#000",
    },
    profileContainer: {
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
        width: 300,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
    },
    imageWrapper: {
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    cameraIconWrapper: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 15,
        padding: 5,
    },
    profileName: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profileLabel: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
        fontWeight: "bold"
    },
    profileDetail: {
        color: 'white',
        fontSize: 20,
        fontWeight: '300',
    },
    cartContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'white',
    },
    cartButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
});
