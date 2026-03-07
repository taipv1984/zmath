import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Sections = () => (
    <View className="space-y-6">
        {/* HỌC NHANH */}
        <View>
            <Text className="text-gray-500 font-bold mb-3 tracking-widest text-xs">
                HỌC NHANH
            </Text>
            <TouchableOpacity className="bg-[#252c3d] flex-row items-center p-4 rounded-xl">
                <View className="bg-yellow-500 p-2 rounded-lg mr-4">
                    <MaterialCommunityIcons
                        name="note-text"
                        size={24}
                        color="white"
                    />
                </View>
                <Text className="text-white font-bold text-lg">Gợi ý</Text>
            </TouchableOpacity>
        </View>

        {/* THỰC HÀNH */}
        <View className="mt-6">
            <Text className="text-gray-500 font-bold mb-3 tracking-widest text-xs">
                THỰC HÀNH
            </Text>
            <View className="flex-row justify-between">
                <TouchableOpacity className="bg-[#252c3d] w-[48%] p-4 rounded-xl flex-row items-center">
                    <MaterialCommunityIcons
                        name="car-connected"
                        size={24}
                        color="#4fc3f7"
                        className="mr-3"
                    />
                    <Text className="text-white font-bold">Sa hình</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#252c3d] w-[48%] p-4 rounded-xl flex-row items-center">
                    <MaterialCommunityIcons
                        name="truck-delivery"
                        size={24}
                        color="#4fc3f7"
                        className="mr-3"
                    />
                    <Text className="text-white font-bold">Đường trường</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* MÔ PHỎNG */}
        <View className="mt-6 mb-10">
            <Text className="text-gray-500 font-bold mb-3 tracking-widest text-xs">
                APP MÔ PHỎNG
            </Text>
            <TouchableOpacity className="bg-[#1e40af] p-4 rounded-xl flex-row items-center relative overflow-hidden">
                <View className="bg-[#4ade80] p-2 rounded-full mr-4 border-2 border-white/20">
                    <MaterialCommunityIcons
                        name="steering"
                        size={28}
                        color="white"
                    />
                </View>
                <View className="flex-1">
                    <Text className="text-white font-bold text-[15px]">
                        120 tình huống mô phỏng
                    </Text>
                    <Text className="text-blue-200 text-xs italic">
                        Đồng bộ 100% với máy tính
                    </Text>
                </View>
                <MaterialCommunityIcons
                    name="shimmer"
                    size={20}
                    color="#fde047"
                />
            </TouchableOpacity>
        </View>
    </View>
);
