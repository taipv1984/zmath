/**
 * Trang kết quả bài tập (placeholder - update sau)
 */
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function MathExerciseResultPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Đây là trang kết quả...</Text>
      <Pressable style={styles.btn} onPress={() => router.back()}>
        <Text style={styles.btnText}>Quay lại</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    text: { fontSize: 18, marginBottom: 20 },
    btn: {
        backgroundColor: "#2563eb",
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
    },
    btnText: { color: "#fff", fontSize: 14 },
});
