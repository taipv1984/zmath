import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function MoPhong() {
    return (
        <View className="mt-6 mb-6">
            <Text className="text-gray-300 mb-3 font-semibold">
                APP MÔ PHỎNG
            </Text>

            <TouchableOpacity className="bg-blue-700 p-4 rounded-xl flex-row items-center">
                <View className="w-12 h-12 bg-green-400 rounded-lg mr-3" />

                <View>
                    <Text className="text-white font-bold">
                        120 tình huống mô phỏng
                    </Text>

                    <Text className="text-gray-200">
                        Đồng bộ 100% với máy tính
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
