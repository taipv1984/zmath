import Footer from "@/app/components/chatgpt/Footer";
import Header from "@/app/components/chatgpt/Header";
import HocNhanh from "@/app/components/chatgpt/HocNhanh";
import MainContainer from "@/app/components/chatgpt/MainContainer";
import MoPhong from "@/app/components/chatgpt/MoPhong";
import ThucHanh from "@/app/components/chatgpt/ThucHanh";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeChatgptScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#0f172a]">
            {/* header */}
            <Header />

            <ScrollView className="flex-1 px-4">
                {/* cac chuc nang chinh */}
                <MainContainer />

                {/* hoc nhanh */}
                <HocNhanh />

                {/* thuc hanh */}
                <ThucHanh />

                {/* mo phong */}
                <MoPhong />
            </ScrollView>

            {/* footer */}
            <Footer />
        </SafeAreaView>
    );
}
