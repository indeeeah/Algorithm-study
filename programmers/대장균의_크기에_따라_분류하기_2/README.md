# 대장균의 크기에 따라 분류하기 2

## 문제

대장균들은 일정 주기로 분화하며, 분화를 시작한 개체를 부모 개체, 분화가 되어 나온 개체를 자식 개체라고 합니다.
다음은 실험실에서 배양한 대장균들의 정보를 담은 `ECOLI_DATA` 테이블입니다. `ECOLI_DATA` 테이블의 구조는 다음과 같으며, `ID`, `PARENT_ID`, `SIZE_OF_COLONY`, `DIFFERENTIATION_DATE`, `GENOTYPE` 은 각각 대장균 개체의 ID, 부모 개체의 ID, 개체의 크기, 분화되어 나온 날짜, 개체의 형질을 나타냅니다.

|Column name	|Type	|Nullable|
|--|--|--|
|ID	|INTEGER	|FALSE|
|PARENT_ID	|INTEGER	|TRUE|
|SIZE_OF_COLONY	|INTEGER	|FALSE|
|DIFFERENTIATION_DATE	|DATE	|FALSE|
|GENOTYPE	|INTEGER	|FALSE|

최초의 대장균 개체의 `PARENT_ID` 는 NULL 값입니다.

대장균 개체의 크기를 내름차순으로 정렬했을 때 상위 0% ~ 25% 를 'CRITICAL', 26% ~ 50% 를 'HIGH', 51% ~ 75% 를 'MEDIUM', 76% ~ 100% 를 'LOW' 라고 분류합니다. 대장균 개체의 ID(`ID`) 와 분류된 이름(`COLONY_NAME`)을 출력하는 SQL 문을 작성해주세요. 이때 결과는 개체의 ID 에 대해 오름차순 정렬해주세요 . 단, 총 데이터의 수는 4의 배수이며 같은 사이즈의 대장균 개체가 서로 다른 이름으로 분류되는 경우는 없습니다.

## 출력

예를 들어 `ECOLI_DATA` 테이블이 다음과 같다면

|ID	|PARENT_ID	|SIZE_OF_COLONY	|DIFFERENTIATION_DATE	|GENOTYPE|
|--|--|--|--|--|
|1	|NULL	|10	|2019/01/01	|5|
|2	|NULL	|2	|2019/01/01	|3|
|3	|1	|100	|2020/01/01	|4|
|4	|2	|16	|2020/01/01	|4|
|5	|2	|17	|2020/01/01	|6|
|6	|4	|101	|2021/01/01	|22|
|7	|6	|101	|2022/01/01	|23|
|8	|6	|1	|2022/01/01	|27|

기준에 의해 분류된 대장균들의 ID는 다음과 같습니다.

* CRITICAL (상위 0% ~ 25%) : ID 6, ID 7
* HIGH (상위 26% ~ 50%) : ID 3, ID 5
* MEDIUM (상위 51% ~ 75%) : ID 1, ID 4
* LOW (상위 76% ~ 100%) : ID 2, ID 8

따라서 결과를 ID 에 대해 오름차순 정렬하면 다음과 같아야 합니다.

|ID	|COLONY_NAME|
|--|--|
|1	|MEDIUM|
|2	|LOW|
|3	|HIGH|
|4	|MEDIUM|
|5	|HIGH|
|6	|CRITICAL|
|7	|CRITICAL|
|8	|LOW|

## 해결

처음에는 `SIZE_OF_COLONY`을 내림차순으로 정렬한 후 숫자를 매기고, 총 카운트를 나눠서 계산하는 것으로 풀려고 다음과 같이 작성했다.

```sql
WITH SORTED_DATA AS (
    SELECT *,
    ROW_NUMBER() OVER (ORDER BY SIZE_OF_COLONY DESC) AS RN,
    COUNT(*) OVER () AS TOTAL_COUNT
    FROM ECOLI_DATA
)
SELECT ID,
CASE
    WHEN RN / TOTAL_COUNT * 100 BETWEEN 0 AND 25 THEN 'CRITICAL'
    WHEN RN / TOTAL_COUNT * 100 BETWEEN 26 AND 50 THEN 'HIGH'
    WHEN RN / TOTAL_COUNT * 100 BETWEEN 51 AND 75 THEN 'MEDIUM'
    ELSE 'LOW'
END AS COLONY_NAME
FROM SORTED_DATA
ORDER BY ID ASC;
```

나눗셈이 정확하지 않았는지 뭔지는 모르겠지만, 모든 케이스에서 통과되지 않았다.

그래서 찾아본 다른 방법

### 문법

1. PERCENT_RANK

알아서 랭크를 정해준다.

```sql
SELECT
PERCENT_RANK() OVER (ORDER BY SIZE_OF_COLONY DESC)
FROM ECOLI_DATA
```

0부터 1 사이의 소수들로 랭킹을 매긴다.

2. NTILE

N개로 나눠준다.

```sql
SELECT
NTILE(4) OVER (ORDER BY SIZE_OF_COLONY DESC)
FROM ECOLI_DATA
```