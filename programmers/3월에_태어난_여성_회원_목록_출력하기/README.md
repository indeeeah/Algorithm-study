# 3월에 태어난 여성 회원 목록 출력하기

## 문제

다음은 식당 리뷰 사이트의 회원 정보를 담은 `MEMBER_PROFILE` 테이블입니다. `MEMBER_PROFILE` 테이블은 다음과 같으며 `MEMBER_ID`, `MEMBER_NAME`, `TLNO`, `GENDER`, `DATE_OF_BIRTH`는 회원 ID, 회원 이름, 회원 연락처, 성별, 생년월일을 의미합니다.


|Column name|Type|Nullable
|---|---|---|
|MEMBER_ID|VARCHAR(100)|FALSE|
|MEMBER_NAME|VARCHAR(50)|FALSE|
|TLNO|VARCHAR(50)|TRUE|
|GENDER|VARCHAR(1)|TRUE|
|DATE_OF_BIRTH|DATE|TRUE|

`MEMBER_PROFILE` 테이블에서 생일이 3월인 여성 회원의 ID, 이름, 성별, 생년월일을 조회하는 SQL문을 작성해주세요. 이때 전화번호가 NULL인 경우는 출력대상에서 제외시켜 주시고, 결과는 회원ID를 기준으로 오름차순 정렬해주세요.

### 출력

`MEMBER_PROFILE` 테이블이 다음과 같을 때

|MEMBER_ID|MEMBER_NAME|TLNO|GENDER|DATE_OF_BIRTH|
|--|--|--|--|--|
|jiho92@naver.com|이지호|01076432111|W|1992-02-12|
|jiyoon22@hotmail.com|김지윤|01032324117|W|1992-02-22|
|jihoon93@hanmail.net|김지훈|01023258688|M|1993-02-23|
|seoyeons@naver.com|박서연|01076482209|W|1993-03-16|
|yoonsy94@gmail.com|윤서연|NULL|W|1994-03-19|

SQL을 실행하면 다음과 같이 출력되어야 합니다.

|MEMBER_ID|MEMBER_NAME|GENDER|DATE_OF_BIRTH|
|--|--|--|--|
|seoyeons@naver.com|박서연|W|1993-03-16|

`DATE_OF_BIRTH`의 데이트 포맷이 예시와 동일해야 정답처리 됩니다.

## 해결

3월인 **여성** 회원의 정보 출력인데, 3월만 보고 쿼리하고 왜 안되지? 어리둥절 했다.

문제를 똑바로 읽자!

### 문법

3월인
```sql
WHERE MONTH(DATE_OF_BIRTH) = 3

-- 아래처럼 써도 된다
WHERE EXTRACT(MONTH FROM DATE_OF BIRTH) = 3

-- 만약 문자열이라면
WHERE MONTH(TO_DATE(DATE_OF_BIRTH)) = 3

-- 문자열 그대로 비교
WHERE SUBSTRING(DATE_OF_BIRTH, 6, 2) = '03'
```

DATE 포맷 변경
```sql
-- MySQL
DATE_FORMAT(DATE_OF_BIRTH, '%Y-%m-%d')

-- PostgreSQL은 아래처럼 된다는데 실행은 안해봄
TO_CHAR(DATE_OF_BIRTH, 'YYYY-MM-DD')
```