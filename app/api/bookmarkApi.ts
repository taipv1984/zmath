/**
 * API đánh dấu câu hỏi (fake)
 * Sau này thay bằng API thật
 */
export async function bookmarkQuestion(questionId: number): Promise<void> {
  // Fake: giả lập gửi lên backend
  await new Promise((r) => setTimeout(r, 300));
  console.log("[bookmarkApi] Bookmarked question:", questionId);
}
