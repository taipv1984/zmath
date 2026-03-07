import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function HocNhanh() {
    return (
        <View className="mt-6">
            {/* title */}
            <Text className="text-gray-300 mb-3 font-semibold">HỌC NHANH</Text>

            {/* button */}
            <TouchableOpacity className="bg-gray-600 p-5 rounded-xl flex-row items-center">
                <View className="w-10 h-10 bg-yellow-400 rounded-lg mr-3" />

                <Text className="text-white text-lg font-semibold">Gợi ý</Text>
            </TouchableOpacity>
        </View>
    );
}
