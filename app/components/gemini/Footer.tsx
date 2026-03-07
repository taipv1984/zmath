import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Footer = () => (
    <View className="absolute bottom-0 w-full bg-[#1a2130] border-t border-gray-800 flex-row justify-around py-3">
        <TouchableOpacity className="items-center">
            <Ionicons name="home" size={24} color="white" />
            <Text className="text-white text-xs mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
            <Ionicons name="book-outline" size={24} color="gray" />
            <Text className="text-gray-400 text-xs mt-1">Học tập</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
            <Ionicons name="ribbon-outline" size={24} color="gray" />
            <Text className="text-gray-400 text-xs mt-1">Kết quả</Text>
        </TouchableOpacity>
    </View>
);

export default Footer;
