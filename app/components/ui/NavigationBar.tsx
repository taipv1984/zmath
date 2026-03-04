/**
 * Thanh điều hướng: preview, đánh dấu, next
 */
import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

export interface NavigationBarProps {
  canPrev: boolean;
  canNext: boolean;
  isBookmarked: boolean;
  onPrev: () => void;
  onNext: () => void;
  onBookmark: () => void;
}

export function NavigationBar({
  canPrev,
  canNext,
  isBookmarked,
  onPrev,
  onNext,
  onBookmark,
}: NavigationBarProps) {
  return (
    <View style={styles.container}>
      {canPrev ? (
        <Pressable style={styles.btn} onPress={onPrev}>
          <Text style={styles.iconText}>‹</Text>
        </Pressable>
      ) : (
        <View style={styles.btn} />
      )}

      <View style={styles.divider} />

      <Pressable style={styles.btn} onPress={onBookmark}>
        <Text style={styles.iconText}>{isBookmarked ? "★" : "☆"}</Text>
      </Pressable>

      <View style={styles.divider} />

      {canNext ? (
        <Pressable style={styles.btn} onPress={onNext}>
          <Text style={styles.iconText}>›</Text>
        </Pressable>
      ) : (
        <View style={styles.btn} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#2563eb",
    alignItems: "center",
    width: "100%",
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: 1,
    height: "70%",
    backgroundColor: "#1d4ed8",
  },
  iconText: { color: "#fff", fontSize: 28, fontWeight: "300" },
});
