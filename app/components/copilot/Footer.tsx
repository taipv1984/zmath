import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Item = ({ title }: { title: string }) => {
    return (
        <TouchableOpacity className="flex-1 items-center py-3">
            <View className="w-6 h-6 bg-gray-500 rounded mb-1" />
            <Text className="text-gray-300 text-xs">{title}</Text>
        </TouchableOpacity>
    );
};

export default function Footer() {
    return (
        <View className="flex-row bg-black border-t border-gray-700">
            <Item title="Home" />
            <Item title="Learn" />
            <Item title="Results" />
        </View>
    );
}
