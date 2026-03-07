import Footer from "@/app/components/copilot/Footer";
import Header from "@/app/components/copilot/Header";
import HocNhanh from "@/app/components/copilot/HocNhanh";
import MainContainer from "@/app/components/copilot/MainContainer";
import MoPhong from "@/app/components/copilot/MoPhong";
import ThucHanh from "@/app/components/copilot/ThucHanh";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeCopilotScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 bg-gray-900">
                <Header />
                <MainContainer />
                <HocNhanh />
                <ThucHanh />
                <MoPhong />
                <Footer />
            </ScrollView>
        </SafeAreaView>
    );
}
