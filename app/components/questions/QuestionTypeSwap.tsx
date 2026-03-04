/**
 * Component câu hỏi dạng swap - các answer trong swap_group có thể đổi chỗ
 */
import { QuestionImage } from "@/app/components/questions/QuestionImage";
import { AddQuestionPrefix } from "@/app/helper/MathHelper";
import { RenderUiHelper } from "@/app/helper/RenderUiHelper";
import type { QuestionMo } from "@/app/models/QuestionMo";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { QuestionState } from "./QuestionTypeSingle";

export interface QuestionTypeSwapProps {
    question: QuestionMo;
    questionOrder: number;
    state?: Partial<QuestionState>;
    onAnswerChange: (correct: boolean) => void;
    onStateChange?: (state: QuestionState) => void;
}

export function QuestionTypeSwap({
    question,
    questionOrder,
    state,
    onStateChange,
}: QuestionTypeSwapProps) {
    const [inputValues, setInputValues] = useState<Record<number, string>>(
        state?.inputValues ?? {},
    );
    const content = AddQuestionPrefix(question.content, questionOrder);
    const answers = question.answers ?? [];

    const handleInputChange = (order: number, value: string) => {
        const next = { ...inputValues, [order]: value };
        setInputValues(next);
        onStateChange?.({ inputValues: next });
    };

    return (
        <View style={styles.container}>
            <RenderUiHelper
                content={content}
                answers={answers}
                inputValues={inputValues}
                onInputChange={handleInputChange}
            />
            <QuestionImage imagePath={question.image_path} />
            <Text style={styles.todo}>todo...Swap</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { fontSize: 10 },
    todo: { marginTop: 12, color: "#888", fontStyle: "italic" },
});
