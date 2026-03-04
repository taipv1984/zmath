/**
 * Helper kiểm tra và xử lý câu trả lời toán học
 */
import { GetAlias } from "./StringHelper";

/**
 * Kiểm tra giá trị người nhập có khớp với đáp án không
 * @param inputValue - Giá trị người dùng nhập
 * @param answerValue - Đáp án (number|string|boolean|array)
 * @param callback - Callback để cập nhật mảng answerValue (xóa phần tử đã match) khi answerValue là array
 * @returns true nếu đúng, false nếu sai
 */
export function CheckValue(
  inputValue: string,
  answerValue: string | number | boolean | (string | number)[],
  callback?: (updatedArray: (string | number)[]) => void
): boolean {
  const normalizedInput = GetAlias(inputValue);

  if (Array.isArray(answerValue)) {
    const normalizedArr = answerValue.map((v) =>
      typeof v === "string" ? GetAlias(v) : String(v)
    );
    const idx = normalizedArr.indexOf(normalizedInput);
    if (idx !== -1) {
      const updated = [...answerValue];
      updated.splice(idx, 1);
      callback?.(updated);
      return true;
    }
    return false;
  }

  const normalizedAnswer =
    typeof answerValue === "string" ? GetAlias(answerValue) : String(answerValue);
  return normalizedInput === normalizedAnswer;
}

/**
 * Thêm tiền tố vào nội dung câu hỏi
 * @param questionContent - Nội dung câu hỏi
 * @param questionOrder - Số thứ tự câu hỏi
 * @param preLabel - Nhãn tiền tố (mặc định "Câu")
 * @returns Chuỗi đã thêm tiền tố, ví dụ: "Câu 1: hay so sanh 2 so: ..."
 */
export function AddQuestionPrefix(
  questionContent: string,
  questionOrder: number,
  preLabel: string = "Câu"
): string {
  return `${preLabel} ${questionOrder}: ${questionContent}`;
}
