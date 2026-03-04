/**
 * Danh sách các nút chọn câu hỏi (1, 2, 3...)
 */
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

export type QuestionButtonStatus =
    | "default"
    | "active"
    | "correct"
    | "wrong"
    | "bookmarked";

export interface QuestionListProps {
  totalQuestions: number;
  currentIndex: number;
  /** Map index -> status */
  questionStatus: Record<number, QuestionButtonStatus>;
  onQuestionPress: (index: number) => void;
}

export function QuestionList({
    totalQuestions,
    currentIndex,
    questionStatus,
    onQuestionPress,
}: QuestionListProps) {
    const { width } = useWindowDimensions();
    const padding = 10;
    const gap = 4;
    const cols = 12;
    const buttonWidth = (width - 2 * padding - (cols - 1) * gap) / cols;

    const rows: number[][] = [];
    for (let i = 0; i < totalQuestions; i += cols) {
        rows.push(
            Array.from({ length: cols }, (_, j) => i + j).filter(
                (n) => n < totalQuestions,
            ),
        );
    }

    return (
        <View
            style={[
                styles.container,
                { paddingVertical: padding, paddingHorizontal: padding },
            ]}
        >
            {rows.map((row, rowIdx) => (
                <View key={rowIdx} style={[styles.row, { gap }]}>
                    {row.map((num) => {
                        const status = questionStatus[num] ?? "default";
                        const isActive = currentIndex === num;
                        const isBookmarked = status === "bookmarked";
                        const displayStatus = isBookmarked ? "default" : status;

                        return (
                            <Pressable
                                key={num}
                                onPress={() => onQuestionPress(num)}
                                style={[
                                    styles.btn,
                                    {
                                        width: buttonWidth,
                                        height: buttonWidth,
                                        borderRadius: 3,
                                    },
                                    displayStatus === "default" &&
                                        styles.btnDefault,
                                    (isActive || displayStatus === "active") &&
                                        styles.btnActive,
                                    displayStatus === "correct" &&
                                        styles.btnCorrect,
                                    displayStatus === "wrong" &&
                                        styles.btnWrong,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.btnText,
                                        (isActive ||
                                            displayStatus === "active") &&
                                            styles.btnTextActive,
                                        displayStatus === "correct" &&
                                            styles.btnTextCorrect,
                                    ]}
                                >
                                    {num + 1}
                                </Text>
                                {isBookmarked && (
                                    <Text style={styles.bookmark}>★</Text>
                                )}
                            </Pressable>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    row: { flexDirection: "row" },
    btn: {
        justifyContent: "center",
        alignItems: "center",
    },
    btnDefault: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#d1d5db",
    },
    btnActive: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#2563eb",
    },
    btnCorrect: {
        backgroundColor: "#22c55e",
        borderWidth: 1,
        borderColor: "#15803d",
    },
    btnWrong: {
        backgroundColor: "#ef4444",
        borderColor: "#b91c1c",
        borderWidth: 1,
    },
    btnText: { color: "#000", fontSize: 14 },
    btnTextActive: { color: "#000" },
    btnTextCorrect: { color: "#fff" },
    bookmark: {
        position: "absolute",
        top: -4,
        right: 0,
        fontSize: 10,
        color: "#ef4444",
    },
});
