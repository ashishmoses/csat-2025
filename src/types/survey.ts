export interface SurveyData {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
  q11: string;
  q12: string;
  q13: string;
  q14: string;
  q15: string;
  q16: string;
  q17: string[];
  q17_other: string;
  q18: string;
  q19: string;
  q20: string;
  [key: string]: string | string[];
}

export interface LowRatingExample {
  questionName: string;
  rating: string;
  example: string;
}
