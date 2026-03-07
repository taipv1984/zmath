import React from "react";
import { View, Text } from "react-native";

export default function Header() {
    return (
        <View className="bg-blue-800 px-4 py-4 rounded-b-3xl">
            {/* tieu de */}
            <Text className="text-yellow-400 text-lg font-bold">
                600 câu hỏi
            </Text>

            <Text className="text-white text-xl font-bold">
                Ôn thi lý thuyết GPLX
            </Text>

            {/* hang bang */}
            <View className="mt-2 self-start bg-blue-600 px-3 py-1 rounded-full">
                <Text className="text-white font-semibold">HẠNG B</Text>
            </View>
        </View>
    );
}
