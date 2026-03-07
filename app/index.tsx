import HomeChatgptScreen from "@/app/screens/HomeChatgptScreen";
import HomeGeminiScreen from "@/app/screens/HomeGeminiScreen";
import { useRouter } from "expo-router";

import { StyleSheet } from "react-native";

export default function Index() {
    const router = useRouter();

    return (
        // <View style={styles.container}>
        //     <Text style={styles.title}>Math Exercise</Text>
        //     <Pressable
        //         style={styles.btn}
        //         onPress={() => router.push("/math-exercise")}
        //     >
        //         <Text style={styles.btnText}>Bắt đầu làm bài</Text>
        //     </Pressable>
        // </View>

        <>
            {/* <HomeCopilotScreen /> */}
            <HomeGeminiScreen />
            {/* <HomeChatgptScreen /> */}
            {/* <HomeDemoScreen /> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    btn: {
        backgroundColor: "#2563eb",
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 5,
    },
    btnText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
