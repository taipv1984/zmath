/**
 * Nội dung chính chứa câu hỏi - chọn component theo question_type
 */
import type { QuestionMo } from "@/app/models/QuestionMo";
import React from "react";
import { ScrollView, View } from "react-native";
import {
    QuestionTypeMulti,
    QuestionTypeQuiz,
    QuestionTypeSingle,
    QuestionTypeStep,
    QuestionTypeSwap,
} from "./questions";

import type { QuestionState } from "./questions/QuestionTypeSingle";

export interface QuestionContentProps {
    question: QuestionMo;
    questionOrder: number;
    questionIndex: number;
    questionState?: Record<number, QuestionState>;
    onAnswerChange: (correct: boolean) => void;
    onStateChange?: (index: number, state: QuestionState) => void;
}

export function QuestionContent({
    question,
    questionOrder,
    questionIndex,
    questionState,
    onAnswerChange,
    onStateChange,
}: QuestionContentProps) {
    const type = question.question_type ?? "single";

    const renderQuestion = () => {
        switch (type) {
            case "single":
                return (
                    <QuestionTypeSingle
                        question={question}
                        questionOrder={questionOrder}
                        state={questionState?.[questionIndex]}
                        onAnswerChange={onAnswerChange}
                        onStateChange={(s) => onStateChange?.(questionIndex, s)}
                    />
                );
            case "multi":
                return (
                    <QuestionTypeMulti
                        question={question}
                        questionOrder={questionOrder}
                        state={questionState?.[questionIndex]}
                        onAnswerChange={onAnswerChange}
                        onStateChange={(s) => onStateChange?.(questionIndex, s)}
                    />
                );
            case "swap":
                return (
                    <QuestionTypeSwap
                        question={question}
                        questionOrder={questionOrder}
                        state={questionState?.[questionIndex]}
                        onAnswerChange={onAnswerChange}
                        onStateChange={(s) => onStateChange?.(questionIndex, s)}
                    />
                );
            case "quiz":
                return (
                    <QuestionTypeQuiz
                        question={question}
                        questionOrder={questionOrder}
                        onAnswerChange={onAnswerChange}
                    />
                );
            case "step":
                return (
                    <QuestionTypeStep
                        question={question}
                        questionOrder={questionOrder}
                        state={questionState?.[questionIndex]}
                        onAnswerChange={onAnswerChange}
                        onStateChange={(s) => onStateChange?.(questionIndex, s)}
                    />
                );
            default:
                return (
                    <QuestionTypeSingle
                        question={question}
                        questionOrder={questionOrder}
                        onAnswerChange={onAnswerChange}
                    />
                );
        }
    };

    return (
        <ScrollView style={{ flex: 1, width: "100%" }}>
            <View key={questionIndex} style={{ width: "100%" }}>
                {renderQuestion()}
            </View>
        </ScrollView>
    );
}
