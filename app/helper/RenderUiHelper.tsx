/**
 * Helper render giao diện tự động từ content + answers
 * Thay {#1}, {#2}... bằng TextInput/Select tương ứng
 */
import { SelectDropdown } from "@/app/components/ui/SelectDropdown";
import type { AnswerMo } from "@/app/models/AnswerMo";
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from "react-native";
import RenderHtml from "react-native-render-html";

const PLACEHOLDER_REGEX = /\{#(\d+)\}/g;

/** Đếm số placeholder trong content */
export function countPlaceholders(content: string): number {
    const matches = content.match(PLACEHOLDER_REGEX);
    return matches ? matches.length : 0;
}

/** Kiểm tra số placeholder có khớp với số answer không */
export function validatePlaceholders(
    content: string,
    answers: AnswerMo[],
): { valid: boolean; message?: string } {
    const count = countPlaceholders(content);
    const expected = answers.length;
    if (count !== expected) {
        return {
            valid: false,
            message: `Cảnh báo: Số placeholder {#n} (${count}) khác số answer (${expected})`,
        };
    }
    return { valid: true };
}

/** Parse value_option từ string "[50, 60, 70]" thành array */
function parseValueOption(valueOption: string): (string | number)[] {
    if (!valueOption || !valueOption.trim()) return [];
    try {
        const parsed = JSON.parse(valueOption);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

/** Parse value khi là array (multi/swap) */
function parseAnswerValue(
    value: string | number | (string | number)[],
): string | number | (string | number)[] {
    if (Array.isArray(value)) return value;
    if (typeof value === "number") return value;
    try {
        const parsed = JSON.parse(value as string);
        if (Array.isArray(parsed)) return parsed;
    } catch {}
    return value;
}

export interface RenderUiHelperProps {
    content: string;
    answers: AnswerMo[];
    /** Map order -> giá trị người nhập */
    inputValues: Record<number, string>;
    onInputChange: (order: number, value: string) => void;
    /** Trạng thái đã check: order -> 'correct' | 'wrong' | undefined */
    checkStatus?: Record<number, "correct" | "wrong">;
    /** Disable inputs khi đã check */
    disabled?: boolean;
}

/**
 * Component render nội dung câu hỏi với các input
 */
export function RenderUiHelper({
    content,
    answers,
    inputValues,
    onInputChange,
    checkStatus = {},
    disabled = false,
}: RenderUiHelperProps) {
    const { width } = useWindowDimensions();
    const validation = validatePlaceholders(content, answers);
    if (!validation.valid) {
        return (
            <View style={styles.warning}>
                <Text style={styles.warningText}>{validation.message}</Text>
            </View>
        );
    }

    const parts: { type: "text" | "input"; order?: number; text?: string }[] =
        [];
    let lastIndex = 0;
    let match;
    const regex = new RegExp(PLACEHOLDER_REGEX.source, "g");
    while ((match = regex.exec(content)) !== null) {
        if (match.index > lastIndex) {
            parts.push({
                type: "text",
                text: content.slice(lastIndex, match.index),
            });
        }
        parts.push({ type: "input", order: parseInt(match[1], 10) });
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < content.length) {
        parts.push({ type: "text", text: content.slice(lastIndex) });
    }

    const answerByOrder = Object.fromEntries(answers.map((a) => [a.order, a]));

    return (
        <View style={styles.container}>
            {parts.map((part, idx) => {
                if (part.type === "text" && part.text) {
                    if (!part.text.trim()) return <Text key={idx}> </Text>;
                    return (
                        <RenderHtml
                            key={idx}
                            contentWidth={width - 48}
                            source={{ html: part.text }}
                            tagsStyles={{
                                body: { fontSize: 16, color: "#333" },
                                b: { fontWeight: "bold" },
                                p: { marginVertical: 4 },
                            }}
                            baseStyle={styles.htmlBase}
                        />
                    );
                }
                if (part.type === "input" && part.order !== undefined) {
                    const answer = answerByOrder[part.order];
                    if (!answer) return null;
                    const status = checkStatus[part.order];
                    const isSelect = answer.input_type === "select";
                    const inputWidth = Math.min(
                        100,
                        Math.max(15, parseInt(answer.input_width, 10) || 15),
                    );
                    const widthPx = (width * inputWidth) / 100;

                    if (isSelect) {
                        const options = parseValueOption(answer.value_option);
                        return (
                            <View
                                key={idx}
                                style={[styles.inputWrap, { width: widthPx }]}
                            >
                                <SelectDropdown
                                    value={inputValues[part.order] ?? ""}
                                    options={options}
                                    placeholder=""
                                    onSelect={(v) =>
                                        onInputChange(part.order!, v)
                                    }
                                    disabled={disabled}
                                    width={widthPx}
                                    status={status}
                                />
                            </View>
                        );
                    }

                    return (
                        <TextInput
                            key={idx}
                            value={inputValues[part.order] ?? ""}
                            onChangeText={(v) => onInputChange(part.order!, v)}
                            placeholder="?"
                            editable={!disabled}
                            keyboardType={
                                answer.value_format === "number"
                                    ? "numeric"
                                    : "default"
                            }
                            style={[
                                styles.textInput,
                                { width: widthPx },
                                status === "correct" && styles.inputCorrect,
                                status === "wrong" && styles.inputWrong,
                            ]}
                        />
                    );
                }
                return null;
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 4,
    },
    htmlBase: { fontSize: 16, color: "#f0f" },
    warning: { fontSize: 12, backgroundColor: "#fff3cd", borderRadius: 8 },
    warningText: { color: "#856404" },
    textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
        minWidth: 40,
        backgroundColor: "#fff",
        textAlign: "center",
    },
    inputWrap: { marginHorizontal: 2 },
    inputCorrect: {
        borderColor: "#22c55e",
        borderWidth: 2,
        backgroundColor: "#dcfce7",
    },
    inputWrong: {
        borderColor: "#ef4444",
        borderWidth: 2,
        backgroundColor: "#fee2e2",
    },
});
