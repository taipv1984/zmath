import React from "react";
import { StyleSheet, Text, View } from "react-native";

export interface _Props {
    message?: string;
}

/**
 * Component hiển thị thông báo lỗi với kiểu danger (viền đỏ, nền hồng)
 * Dùng cho các trường hợp như: không tìm thấy ảnh, dữ liệu không hợp lệ, etc.
 */
export function DangerAlert({ message = "Not found" }: _Props) {
    return (
        <View style={styles.dangerBox}>
            <Text style={styles.dangerText}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    dangerBox: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#dc2626",
        backgroundColor: "#fee2e2",
        borderRadius: 5,
    },
    dangerText: {
        color: "#000",
        fontSize: 16,
    },
});
