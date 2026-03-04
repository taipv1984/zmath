/**
 * Component câu hỏi dạng step - các câu con hiện lần lượt
 */
import { QuestionImage } from "@/app/components/questions/QuestionImage";
import { AddQuestionPrefix } from "@/app/helper/MathHelper";
import { RenderUiHelper } from "@/app/helper/RenderUiHelper";
import type { QuestionMo } from "@/app/models/QuestionMo";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { QuestionState } from "./QuestionTypeSingle";

export interface QuestionTypeStepProps {
    question: QuestionMo;
    questionOrder: number;
    state?: Partial<QuestionState>;
    onAnswerChange: (correct: boolean) => void;
    onStateChange?: (state: QuestionState) => void;
}

export function QuestionTypeStep({
    question,
    questionOrder,
    state,
    onStateChange,
}: QuestionTypeStepProps) {
    const parentContent = AddQuestionPrefix(question.content, questionOrder);
    const childs = question.childs ?? [];
    const [childInputValues, setChildInputValues] = useState<
        Record<number, Record<number, string>>
    >(state?.childInputValues ?? {});

    const handleChildInputChange =
        (childIdx: number) => (order: number, value: string) => {
            const next = {
                ...childInputValues,
                [childIdx]: {
                    ...(childInputValues[childIdx] ?? {}),
                    [order]: value,
                },
            };
            setChildInputValues(next);
            onStateChange?.({ childInputValues: next });
        };

    return (
        <View style={styles.container}>
            <Text>{parentContent}</Text>
            <QuestionImage imagePath={question.image_path} />
            {childs.map((child, idx) => (
                <View key={child.id} style={styles.childBlock}>
                    <RenderUiHelper
                        content={`Câu ${questionOrder}.${idx + 1}: ${child.content}`}
                        answers={child.answers ?? []}
                        inputValues={childInputValues[idx] ?? {}}
                        onInputChange={handleChildInputChange(idx)}
                    />
                </View>
            ))}
            <Text style={styles.todo}>todo...Step</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { fontSize: 10 },
    childBlock: { marginTop: 16 },
    todo: { marginTop: 12, color: "#888", fontStyle: "italic" },
});
