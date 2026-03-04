/**
 * Component câu hỏi dạng single - 1 textbox/select cho mỗi placeholder
 */
import { QuestionImage } from "@/app/components/questions/QuestionImage";
import { AddQuestionPrefix, CheckValue } from "@/app/helper/MathHelper";
import { RenderUiHelper } from "@/app/helper/RenderUiHelper";
import type { QuestionMo } from "@/app/models/QuestionMo";
import { Button } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export interface QuestionState {
    inputValues?: Record<number, string>;
    childInputValues?: Record<number, Record<number, string>>;
    checked?: boolean;
    isCorrect?: boolean;
    checkStatus?: Record<number, "correct" | "wrong">;
}

export interface QuestionTypeSingleProps {
    question: QuestionMo;
    questionOrder: number;
    state?: Partial<QuestionState>;
    onAnswerChange: (correct: boolean) => void;
    onStateChange?: (state: QuestionState) => void;
}

export function QuestionTypeSingle({
    question,
    questionOrder,
    state,
    onAnswerChange,
    onStateChange,
}: QuestionTypeSingleProps) {
    const [inputValues, setInputValues] = useState<Record<number, string>>(
        state?.inputValues ?? {},
    );
    const [checked, setChecked] = useState(state?.checked ?? false);
    const [isCorrect, setIsCorrect] = useState(state?.isCorrect ?? false);
    const [checkStatus, setCheckStatus] = useState<
        Record<number, "correct" | "wrong">
    >(state?.checkStatus ?? {});

    const content = AddQuestionPrefix(question.content, questionOrder);
    const answers = question.answers ?? [];

    const handleInputChange = (order: number, value: string) => {
        const next = { ...inputValues, [order]: value };
        setInputValues(next);
        onStateChange?.({
            inputValues: next,
            checked,
            isCorrect,
            checkStatus,
        });
    };

    const handleCheck = () => {
        let allCorrect = true;
        const status: Record<number, "correct" | "wrong"> = {};

        answers.forEach((ans) => {
            const userVal = inputValues[ans.order] ?? "";
            let answerVal: string | number | (string | number)[] = ans.value;
            if (typeof answerVal === "string" && answerVal.startsWith("[")) {
                try {
                    answerVal = JSON.parse(answerVal) as (string | number)[];
                } catch {}
            }

            const correct = CheckValue(userVal, answerVal);
            status[ans.order] = correct ? "correct" : "wrong";
            if (!correct) allCorrect = false;
        });

        setCheckStatus(status);
        setChecked(true);
        setIsCorrect(allCorrect);
        onStateChange?.({
            inputValues,
            checked: true,
            isCorrect: allCorrect,
            checkStatus: status,
        });
        onAnswerChange(allCorrect);
    };

    return (
        <View style={styles.container}>
            <RenderUiHelper
                content={content}
                answers={answers}
                inputValues={inputValues}
                onInputChange={handleInputChange}
                checkStatus={checked ? checkStatus : undefined}
                disabled={checked}
            />

            <QuestionImage imagePath={question.image_path} />

            {!checked ? (
                <Button style={styles.checkBtn} onPress={handleCheck}>
                    Kiểm tra
                </Button>
            ) : (
                <View
                    style={[
                        styles.resultLabel,
                        isCorrect ? styles.resultCorrect : styles.resultWrong,
                    ]}
                >
                    <Text style={styles.resultText}>
                        {isCorrect ? "✓ Chính xác" : "✗ Sai"}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10 },
    checkBtn: { alignSelf: "center", marginTop: 10, borderRadius: 5 },
    resultLabel: {
        alignSelf: "center",
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 4,
    },
    resultCorrect: { backgroundColor: "#22c55e" },
    resultWrong: { backgroundColor: "#ef4444" },
    resultText: { color: "#fff", fontSize: 14, fontWeight: "600" },
});
