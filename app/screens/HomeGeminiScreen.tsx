import Footer from "@/app/components/gemini/Footer";
import { Header } from "@/app/components/gemini/Header";
import { MainContainer } from "@/app/components/gemini/MainContainer";
import { Sections } from "@/app/components/gemini/Sections";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeGeminiScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#121826]">
            <Header />
            <ScrollView
                className="flex-1 px-4"
                showsVerticalScrollIndicator={false}
            >
                <MainContainer />
                <Sections />
                <View className="h-20" />
            </ScrollView>
            <Footer />
        </SafeAreaView>
    );
}
