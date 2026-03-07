import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Item = ({ title }: { title: string }) => {
    return (
        <TouchableOpacity className="bg-gray-700 flex-1 m-2 p-6 rounded-2xl items-center">
            {/* icon sau co the thay bang react-native-vector-icons */}
            <View className="w-10 h-10 bg-gray-500 rounded-full mb-2" />
            <Text className="text-white font-semibold">{title}</Text>
        </TouchableOpacity>
    );
};

export default function MainContainer() {
    return (
        <View className="mt-4">
            {/* hang 1 */}
            <View className="flex-row">
                <Item title="Code" />
                <Item title="Debug" />
                <Item title="Test" />
            </View>

            {/* hang 2 */}
            <View className="flex-row">
                <Item title="Review" />
                <Item title="Optimize" />
                <Item title="Deploy" />
            </View>
        </View>
    );
}
