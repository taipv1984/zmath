/**
 * Model đại diện cho một câu hỏi trong bài toán
 * Tương ứng với bảng question trong cấu trúc dữ liệu
 */
import type { AnswerMo } from "./AnswerMo";

export interface QuestionChild {
  id: number;
  parent_id: number;
  content: string;
  question_type?: string;
  answers?: AnswerMo[];
  order: number;
}

export interface QuestionMo {
  id: number;
  parent_id: number;
  content: string;
  image_path?: string;
  suggest?: string;
  result?: string;
  result_image_path?: string;
  /** single | multi | swap | quiz | step */
  question_type: "single" | "multi" | "swap" | "quiz" | "step";
  score?: number;
  summary?: string;
  /** JSON: {swap_group, quiz_value, step_view} */
  extra?: string;
  order: number;
  childs?: QuestionChild[];
  answers?: AnswerMo[];
}
