import "../global.css";

// Global default styles for React Native primitives.
// Moved here from app/globalDefaults.ts so project has fewer files.
import * as eva from "@eva-design/eva";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationProvider } from "@ui-kitten/components";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <ApplicationProvider {...eva} theme={eva.light}>
                <Stack screenOptions={{ headerShown: false }} />
                <Toast />
            </ApplicationProvider>
        </QueryClientProvider>
    );
}
