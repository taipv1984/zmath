/**
 * Trang làm bài tập toán
 * Gồm: Header, Main (danh sách câu hỏi, thanh điều hướng, nội dung), Footer (ads)
 */
import { bookmarkQuestion } from "@/app/api/bookmarkApi";
import { getQuestions } from "@/app/api/questionApi";
import { QuestionContent } from "@/app/components/QuestionContent";
import type { QuestionButtonStatus } from "@/app/components/QuestionList";
import { QuestionList } from "@/app/components/QuestionList";
import type { QuestionState } from "@/app/components/questions/QuestionTypeSingle";
import { NavigationBar } from "@/app/components/ui/NavigationBar";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    Alert,
    Animated,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

const PADDING = 12;

export default function MathExercisePage() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    const { data: questions = [], isLoading } = useQuery({
        queryKey: ["questions"],
        queryFn: getQuestions,
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [questionStatus, setQuestionStatus] = useState<
        Record<number, QuestionButtonStatus>
    >({});
    const [questionState, setQuestionState] = useState<
        Record<number, QuestionState>
    >({});
    const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [totalAnswered, setTotalAnswered] = useState(0);
    const [slideAnim] = useState(new Animated.Value(0));

    const totalQuestions = questions.length;
    const currentQuestion = questions[currentIndex];
    const totalWrong = totalAnswered - totalCorrect;

    const handleQuestionPress = useCallback(
        (index: number) => {
            const dir = index > currentIndex ? 1 : -1;
            setCurrentIndex(index);
            Animated.timing(slideAnim, {
                toValue: dir,
                duration: 200,
                useNativeDriver: true,
            }).start(() => slideAnim.setValue(0));
        },
        [currentIndex, slideAnim],
    );

    const handleAnswerChange = useCallback((correct: boolean) => {
        setTotalAnswered((n) => n + 1);
        if (correct) setTotalCorrect((n) => n + 1);
    }, []);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) handleQuestionPress(currentIndex - 1);
    }, [currentIndex, handleQuestionPress]);

    const handleNext = useCallback(() => {
        if (currentIndex < totalQuestions - 1)
            handleQuestionPress(currentIndex + 1);
    }, [currentIndex, totalQuestions, handleQuestionPress]);

    const handleBookmark = useCallback(async () => {
        const id = currentQuestion?.id;
        if (!id) return;
        const next = new Set(bookmarked);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setBookmarked(next);
        await bookmarkQuestion(id);
    }, [currentQuestion?.id, bookmarked]);

    const updateQuestionStatus = useCallback(
        (idx: number, correct: boolean) => {
            setQuestionStatus((prev) => ({
                ...prev,
                [idx]: correct ? "correct" : "wrong",
            }));
        },
        [],
    );

    const handleQuestionStateChange = useCallback(
        (idx: number, state: Partial<QuestionState>) => {
            setQuestionState((prev) => ({
                ...prev,
                [idx]: { ...prev[idx], ...state },
            }));
        },
        [],
    );

    const handleSubmit = useCallback(() => {
        const msg = `Bạn đã trả lời được ${totalAnswered}/${totalQuestions} câu hỏi\nSố câu trả lời đúng: ${totalCorrect}\nSố câu trả lời sai: ${totalWrong}\nBạn có muốn xem lại đáp án của các câu hỏi không?`;
        Alert.alert("Kiểm tra", msg, [
            { text: "No", style: "cancel" },
            {
                text: "Yes",
                onPress: () => router.push("/math-exercise-result" as never),
            },
        ]);
    }, [totalAnswered, totalQuestions, totalCorrect, totalWrong, router]);

    if (isLoading) {
        return (
            <View style={styles.center}>
                <Text>Đang tải...</Text>
            </View>
        );
    }

    if (!currentQuestion) {
        return (
            <View style={styles.center}>
                <Text>Không có câu hỏi</Text>
            </View>
        );
    }

    const statusForIndex = (idx: number): QuestionButtonStatus => {
        if (idx === currentIndex) return "active";
        const s = questionStatus[idx];
        if (s) return s;
        return bookmarked.has(questions[idx]?.id ?? 0)
            ? "bookmarked"
            : "default";
    };

    const qStatus: Record<number, QuestionButtonStatus> = {};
    for (let i = 0; i < totalQuestions; i++) {
        qStatus[i] = statusForIndex(i);
    }

    return (
        <View style={styles.container}>
            {/* bỏ padding chung để nội dung sát cạnh màn hình */}
            {/* Header */}
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.back()}
                    style={styles.headerBtn}
                >
                    <Text style={styles.headerText}>←</Text>
                </Pressable>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Bài 37: phép nhân</Text>
                </View>
                <Pressable onPress={handleSubmit} style={styles.headerBtn}>
                    <Text style={styles.headerText}>NỘP BÀI</Text>
                </Pressable>
            </View>
            {/* Main */}
            <View style={styles.main}>
                <QuestionList
                    totalQuestions={totalQuestions}
                    currentIndex={currentIndex}
                    questionStatus={qStatus}
                    onQuestionPress={handleQuestionPress}
                />

                <View style={styles.contentArea}>
                    <QuestionContent
                        question={currentQuestion}
                        questionOrder={currentIndex + 1}
                        questionIndex={currentIndex}
                        questionState={questionState}
                        onAnswerChange={(correct) => {
                            updateQuestionStatus(currentIndex, correct);
                            handleAnswerChange(correct);
                        }}
                        onStateChange={handleQuestionStateChange}
                    />
                </View>

                <NavigationBar
                    canPrev={currentIndex > 0}
                    canNext={currentIndex < totalQuestions - 1}
                    isBookmarked={bookmarked.has(currentQuestion.id)}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    onBookmark={handleBookmark}
                />
            </View>
            {/* Footer - Ads */}
            <View style={styles.footer}>
                <Text style={styles.adsText}>ads...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, width: "100%" },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#2563eb",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 0, // không bo góc để full width
    },
    headerBtn: { padding: 8 },
    headerCenter: { flex: 1, alignItems: "center" },
    headerTitle: { color: "#fff", fontSize: 14, fontWeight: "600" },
    headerText: { color: "#fff", fontSize: 14 },
    main: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        marginTop: 0,
        marginHorizontal: 0,
        borderRadius: 0,
        overflow: "hidden",
        width: "100%",
    },
    contentArea: { flex: 1, minHeight: 200 },
    footer: {
        height: 60,
        backgroundColor: "#6b7280",
        marginTop: 12,
        marginHorizontal: 0,
        borderRadius: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    adsText: { color: "#fff", fontSize: 14 },
});
