/**
 * Select dropdown - hiển thị dropdown với mũi tên, placeholder rỗng
 */
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

export interface SelectDropdownProps {
    value: string;
    options: (string | number)[];
    placeholder?: string;
    onSelect: (value: string) => void;
    disabled?: boolean;
    width?: number;
    status?: "correct" | "wrong";
}

export function SelectDropdown({
    value,
    options,
    placeholder = "",
    onSelect,
    disabled = false,
    width = 120,
    status,
}: SelectDropdownProps) {
    const [visible, setVisible] = useState(false);
    const { height: screenHeight } = useWindowDimensions();

    const displayText = value ? String(value) : placeholder;

    const handleSelect = (opt: string | number) => {
        onSelect(String(opt));
        setVisible(false);
    };

    return (
        <>
            <Pressable
                onPress={() => !disabled && setVisible(true)}
                style={[
                    styles.trigger,
                    { width },
                    status === "correct" && styles.inputCorrect,
                    status === "wrong" && styles.inputWrong,
                    disabled && styles.disabled,
                ]}
            >
                <Text
                    style={[styles.triggerText, !value && styles.placeholder]}
                    numberOfLines={1}
                >
                    {displayText}
                </Text>
                {/* <Ionicons
                    name="chevron-down"
                    size={12}
                    color="#666"
                    style={styles.arrow}
                /> */}
            </Pressable>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setVisible(false)}
                >
                    <View
                        style={[
                            styles.dropdown,
                            {
                                maxHeight: Math.min(
                                    options.length * 50,
                                    screenHeight * 0.4,
                                ),
                            },
                        ]}
                        onStartShouldSetResponder={() => true}
                    >
                        <FlatList
                            data={options}
                            keyExtractor={(item) => String(item)}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={[
                                        styles.option,
                                        value === String(item) &&
                                            styles.optionSelected,
                                    ]}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.optionText}>
                                        {item}
                                    </Text>
                                </Pressable>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    trigger: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: "#fff",
        height: 40,
        borderBottomWidth: 3,
    },
    triggerText: { fontSize: 16, color: "#333", flex: 1, textAlign: "center" },
    placeholder: { color: "#999" },
    arrow: { marginLeft: 4 },
    disabled: { backgroundColor: "#f5f5f5", opacity: 0.8 },
    inputCorrect: {
        borderColor: "#22c55e",
        borderWidth: 2,
        backgroundColor: "#dcfce7",
    },
    inputWrong: {
        borderColor: "#ef4444",
        borderWidth: 2,
        backgroundColor: "#fee2e2",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    dropdown: {
        backgroundColor: "#fff",
        borderRadius: 8,
        minWidth: 200,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
        overflow: "hidden",
    },
    option: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#eee",
        height: 50,
    },
    optionSelected: { backgroundColor: "#e8f4fd" },
    optionText: { fontSize: 16, color: "#333", textAlign: "center" },
});
