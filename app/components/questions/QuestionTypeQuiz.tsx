/**
 * Component câu hỏi dạng quiz - radiobox ABC theo order
 */
import { QuestionImage } from "@/app/components/questions/QuestionImage";
import { AddQuestionPrefix } from "@/app/helper/MathHelper";
import type { QuestionMo } from "@/app/models/QuestionMo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export interface QuestionTypeQuizProps {
    question: QuestionMo;
    questionOrder: number;
    onAnswerChange: (correct: boolean) => void;
}

export function QuestionTypeQuiz({
    question,
    questionOrder,
}: QuestionTypeQuizProps) {
    const content = AddQuestionPrefix(question.content, questionOrder);

    return (
        <View style={styles.container}>
            <Text>{content}</Text>
            <QuestionImage imagePath={question.image_path} />
            <Text style={styles.todo}>todo...Quiz</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10 },
    todo: { marginTop: 10, color: "#888", fontStyle: "italic" },
});
