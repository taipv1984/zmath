import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export const Header = () => (
    <View className="bg-blue-600 flex-row items-center justify-between px-5 py-4 pb-2">
        <View className="flex-row items-center">
            <View className="bg-white p-1 rounded-lg mr-3 shadow-lg">
                <Ionicons name="warning" size={32} color="#f44336" />
            </View>
            <View>
                <Text className="text-[#ffb74d] font-bold text-xl leading-6">
                    600 câu hỏi
                </Text>
                <Text className="text-[#ffb74d] font-bold text-xl leading-6">
                    Ôn thi lý thuyết GPLX
                </Text>
            </View>
        </View>
        <View className="items-end">
            <Ionicons name="settings-sharp" size={28} color="white" />
            <View className="bg-[#2c3345] border border-white/30 px-3 py-1 rounded-md mt-2">
                <Text className="text-white font-bold text-xs">HẠNG B</Text>
            </View>
        </View>
    </View>
);
