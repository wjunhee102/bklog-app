

export interface errorType {
  error: string;  // error code: "AUTH-001"; 
  message: string; // error 내용
  detail: string; // 자세한 error 내용
  help: string; // http:test.com;
}

/**
 * 현재 sign-up 로직이 실패한 구간을 객체로 보내주는 데 그렇게 하지 말고
 * 전송 전에 각 항목이 true일 때만 전송 가능하도록 할 것.
 * 
 */