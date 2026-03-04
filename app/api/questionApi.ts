/**
 * API lấy dữ liệu câu hỏi
 * Hiện tại load từ file JSON local (fake), sau thay bằng API thật
 */
import type { QuestionMo } from "@/app/models/QuestionMo";

// Fake: import JSON (cần require hoặc dynamic import tùy môi trường)
let questionsData: QuestionMo[] = [];

async function loadQuestionsFromJson(): Promise<QuestionMo[]> {
  if (questionsData.length > 0) return questionsData;
  try {
    const data = require("../data/questions.json");
    questionsData = Array.isArray(data) ? data : [];
    return questionsData;
  } catch {
    return [];
  }
}

export async function getQuestions(): Promise<QuestionMo[]> {
  return loadQuestionsFromJson();
}

export async function getQuestionById(id: number): Promise<QuestionMo | null> {
  const list = await loadQuestionsFromJson();
  return list.find((q) => q.id === id) ?? null;
}
