import { gql, useQuery } from "@apollo/client";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CHARACTER_LIST = gql`
  query Characters {
    characters {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
      }
    }
  }
`;

export default function CharacterList({ navigation }) {
    const { loading, data } = useQuery(CHARACTER_LIST);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
            <FlatList
                data={data.characters.results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Detail", { id: item.id })
                        }
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                margin: 20,
                            }}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    marginRight: 10,
                                }}
                            />

                            <Text style={{ color: "white" }}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
