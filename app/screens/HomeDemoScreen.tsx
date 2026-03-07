import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Footer from "@/app/components/demo/Footer";
import Header from "@/app/components/demo/Header";
import Main from "@/app/components/demo/Main";

export default function HomeDemoScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                <Header />
                <Main />
                <Footer />
            </View>
        </SafeAreaView>
    );
}
