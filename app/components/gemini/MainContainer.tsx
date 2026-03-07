import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const items = [
    { id: 1, title: "Học tập", icon: "book-open-variant", color: "#4fc3f7" },
    { id: 2, title: "Biển báo", icon: "alert-octagon", color: "#f44336" },
    { id: 3, title: "Thi thử", icon: "calendar-check", color: "#ffb74d" },
    { id: 4, title: "Hay sai", icon: "trending-down", color: "#81c784" },
    { id: 5, title: "Đang sai", icon: "close-circle", color: "#e57373" },
    { id: 6, title: "Đánh dấu", icon: "bookmark", color: "#64b5f6" },
];

export const MainContainer = () => (
    <View className="flex-row flex-wrap justify-between mt-4">
        {items.map((item) => (
            <TouchableOpacity
                key={item.id}
                className="w-[31%] bg-[#252c3d] aspect-square rounded-2xl items-center justify-center mb-4 shadow-sm"
            >
                <MaterialCommunityIcons
                    name={item.icon as any}
                    size={34}
                    color={item.color}
                />
                <Text className="text-white mt-2 font-medium text-[13px]">
                    {item.title}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
);
