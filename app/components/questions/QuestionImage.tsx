import { DangerAlert } from "@/app/components/ui/DangerAlert";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    ImageURISource,
    StyleSheet,
    View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface _Props {
    imagePath?: string;
}

// cache Results from previous loads so that switching back to a previous
// question shows the previous result immediately instead of waiting for
// Image.getSize to resolve/reject again.
const imageCache: Record<
    string,
    { source?: any; aspectRatio?: number; error?: boolean }
> = {};

/**
 * Component load ảnh theo yêu cầu:
 * - Nếu `imagePath` rỗng -> không hiển thị
 * - Nếu `imagePath` bắt đầu bằng `https:` -> thử load remote (Image.getSize để kiểm tra)
 *    + Nếu reachable -> hiển thị
 *    + Nếu không có fallback -> hiển thị `DangerAlert`
 * - Ảnh được căn giữa; responsive width 100%, giữ tỉ lệ nếu biết kích thước
 */
export function QuestionImage({ imagePath }: _Props) {
    if (!imagePath || !imagePath.trim()) return null;

    const normalized = imagePath.trim();
    const [source, setSource] = useState<ImageURISource | any | null>(null);
    const [aspectRatio, setAspectRatio] = useState<number | undefined>(
        undefined,
    );
    const [showError, setShowError] = useState(false);

    async function loadImage() {
        setShowError(false);
        setSource(null);
        setAspectRatio(undefined);

        // trước khi làm gì, xem cache
        const cached = imageCache[normalized];
        if (cached) {
            if (cached.error) {
                setShowError(true);
            } else {
                setAspectRatio(cached.aspectRatio);
                setSource(cached.source ?? null);
            }
            return;
        }

        // Chỉ chấp nhận URL bắt đầu bằng https:
        if (/^https:\/\//i.test(normalized)) {
            try {
                const size = await new Promise<{ w: number; h: number }>(
                    (resolve, reject) => {
                        Image.getSize(
                            normalized,
                            (w, h) => resolve({ w, h }),
                            (err) => reject(err),
                        );
                    },
                );
                const newSource = { uri: normalized };
                setAspectRatio(size.w / size.h);
                setSource(newSource);
                imageCache[normalized] = {
                    source: newSource,
                    aspectRatio: size.w / size.h,
                };
                return;
            } catch (e) {
                imageCache[normalized] = { error: true };
                setShowError(true);
                return;
            }
        }

        // Nếu không phải URL https -> không show
        setSource(null);
    }

    useEffect(() => {
        let mounted = true;
        loadImage();
        return () => {
            mounted = false;
        };
    }, [normalized]);

    if (showError) return <DangerAlert message="Không tìm thấy ảnh" />;
    if (!source) return null;

    return (
        <View style={styles.imageWrap}>
            <Image
                source={source}
                style={[
                    styles.image,
                    aspectRatio ? { aspectRatio } : undefined,
                ]}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imageWrap: { width: "100%", alignItems: "center", marginVertical: 10 },
    image: { width: "100%", maxWidth: SCREEN_WIDTH },
});
