/**
 * Model đại diện cho một câu trả lời trong bài toán
 * Tương ứng với bảng answer trong cấu trúc dữ liệu
 */
export interface AnswerMo {
  id?: number;
  question_id?: number;
  /** Giá trị đáp án: number|string với single, array với multi|swap */
  value: string | number | (string | number)[];
  /** JSON array các option cho select: "[50, 60, 70]" */
  value_option: string;
  /** Định dạng: number (bàn phím số), text, latex */
  value_format: "number" | "text" | "latex";
  /** Loại input: text, select, checkbox, box */
  input_type: "text" | "select" | "checkbox" | "box";
  /** Độ rộng input theo %: 20, 30, 40, 50, 100 */
  input_width: string;
  explain?: string;
  explain_image_path?: string;
  order: number;
}
