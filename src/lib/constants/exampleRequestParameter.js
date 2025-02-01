const exampleRequestParameter = {
  KEY: import.meta.env.VITE_API_KEY,
  Type: "json", // 기본값 xml
  pIndex: 1, // 기본값 1
  pSize: 100, // 기본값 100

  // ========== 이 아래는 선택사항 ========== //
  SIGUN_NM: "의정부시", // 시군명
  SIGUN_CD: "41150", // 시군코드
};
