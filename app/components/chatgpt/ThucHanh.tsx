import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Item = ({ title }: { title: string }) => {
    return (
        <TouchableOpacity className="bg-gray-600 flex-1 p-5 rounded-xl m-1 flex-row items-center">
            <View className="w-10 h-10 bg-blue-400 rounded-lg mr-3" />
            <Text className="text-white font-semibold">{title}</Text>
        </TouchableOpacity>
    );
};

export default function ThucHanh() {
    return (
        <View className="mt-6">
            <Text className="text-gray-300 mb-3 font-semibold">THỰC HÀNH</Text>

            <View className="flex-row">
                <Item title="Sa hình" />
                <Item title="Đường trường" />
            </View>
        </View>
    );
}
