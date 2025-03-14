# 멸종위기의 대장균 찾기

## 문제

대장균들은 일정 주기로 분화하며, 분화를 시작한 개체를 부모 개체, 분화가 되어 나온 개체를 자식 개체라고 합니다.
다음은 실험실에서 배양한 대장균들의 정보를 담은 `ECOLI_DATA` 테이블입니다. `ECOLI_DATA` 테이블의 구조는 다음과 같으며, `ID`, `PARENT_ID`, `SIZE_OF_COLONY`, `DIFFERENTIATION_DATE`, `GENOTYPE` 은 각각 대장균 개체의 ID, 부모 개체의 ID, 개체의 크기, 분화되어 나온 날짜, 개체의 형질을 나타냅니다.

|Column |name	|Type	|Nullable|
|--|--|--|--|
|ID	|INTEGER	|FALSE|
|PARENT_ID	|INTEGER	|TRUE|
|SIZE_OF_COLONY	|INTEGER	|FALSE|
|DIFFERENTIATION_DATE	|DATE	|FALSE|
|GENOTYPE	|INTEGER	|FALSE|

최초의 대장균 개체의 `PARENT_ID` 는 NULL 값입니다.

각 세대별 자식이 없는 개체의 수(`COUNT`)와 세대(`GENERATION`)를 출력하는 SQL문을 작성해주세요. 이때 결과는 세대에 대해 오름차순 정렬해주세요. 단, 모든 세대에는 자식이 없는 개체가 적어도 1개체는 존재합니다.

## 출력

예를 들어 `ECOLI_DATA` 테이블이 다음과 같다면

|ID	|PARENT_ID	|SIZE_OF_COLONY	|DIFFERENTIATION_DATE	|GENOTYPE|
|--|--|--|--|--|
|1	|NULL	|10	|2019/01/01	|5|
|2	|NULL	|2	|2019/01/01	|3|
|3	|2	|100	|2020/01/01	|4|
|4	|2	|16	|2020/01/01	|4|
|5	|2	|17	|2020/01/01	|6|
|6	|4	|101	|2021/01/01	|22|
|7	|4	|101	|2022/01/01	|23|
|8	|6	|1	|2022/01/01	|27|

각 세대별 대장균의 ID는 다음과 같습니다.

- 1 세대 : ID 1, ID 2
- 2 세대 : ID 3, ID 4, ID 5
- 3 세대 : ID 6, ID 7
- 4 세대 : ID 8

이 때 각 세대별 자식이 없는 대장균의 ID는 다음과 같습니다.

- 1 세대 : ID 1
- 2 세대 : ID 3, ID 5
- 3 세대 : ID 7
- 4 세대 : ID 8

따라서 결과를 세대에 대해 오름차순 정렬하면 다음과 같아야 합니다.

|COUNT	|GENERATION|
|--|--|
|1	|1|
|2	|2|
|1	|3|
|1	|4|

## 해결

SQL 문제 푸는 거 진짜 재밌다.

그냥 프로그램 알고리즘보다 훠얼씬 재밌달까. 뭐 이것도 돼?! 이런 느낌

### 문법

두 가지를 생각해야 한다.

1. 각 대장균이 몇 세대인지
2. 자식이 있는지

### 우리 대장균은요..

1. 세대 알기

전에 풀어봤던 관리자 레벨 출력하는 문제가 떠올라 바로 재귀 호출을 해야겠다 생각이 들었다.

```sql
WITH RECURSIVE GENERATION_LOOP AS (
    SELECT -- 시작점

    UNION

    SELECT -- 재귀 호출

    WHERE -- 종료 조건
)
```

위와 같은 문법으로 진행된다.

여기서 조금 바뀔 수도 있고, 똑같을 수도 있고.

여기서는 전체 테이블을 돌아야 하므로 종료 조건은 추가하지 않았다.

```sql
WITH RECURSIVE GENERATION_LOOP AS (
    SELECT E.ID, E.PARENT_ID, E.SIZE_OF_COLONY, E.DIFFERENTIATION_DATE, 1 AS GENERATION
    FROM ECOLI_DATA E
    WHERE PARENT_ID IS NULL
    
    UNION
    
    SELECT E.ID, E.PARENT_ID, E.SIZE_OF_COLONY, E.DIFFERENTIATION_DATE, G.GENERATION + 1
    JOIN GENERATION_LOOP G ON E.PARENT_ID = G.ID
)
SELECT * FROM GENERATION_LOOP;
```

* 시작 조건: `PARENT_ID`가 `NULL`인 항목은 1세대이다.
* 반복 조건: `PARENT_ID`의 `GENERATION`에 + 1 하여 세대를 표시해준다.

재귀 호출에 대해서 마음으로는 이해하지만 100% 데이터 루프가 차곡 차곡 돌아가는 것에 대해서는 아직도 잘 이해가 안간다.

이거는 SQL 문제 뿐만이 아니라 알고리즘 문제를 풀 때도 마찬가지라 기도를 드리며 코드를 짜는...

2. 자식 유무 알기

여기서 CTE를 추가해서 쓸지 SELECT문에서 뭔가를 해볼지 고민했다.

```sql
WITH RECURSIVE GENERATION_LOOP AS (
    SELECT E.ID, E.PARENT_ID, E.SIZE_OF_COLONY, E.DIFFERENTIATION_DATE, 1 AS GENERATION
    FROM ECOLI_DATA E
    WHERE PARENT_ID IS NULL
    
    UNION
    
    SELECT E.ID, E.PARENT_ID, E.SIZE_OF_COLONY, E.DIFFERENTIATION_DATE, G.GENERATION + 1
    JOIN GENERATION_LOOP G ON E.PARENT_ID = G.ID
),
CHILDREN AS (
    SELECT * FROM GENERATION_LOOP G
    JOIN (SELECT COUNT(*), PARENT_ID FROM GENERATION_LOOP GROUP BY PARENT_ID) A ON G.PARENT_ID = A.PARENT_ID
)
SELECT * FROM CHILDREN;
```

벌써 복잡해진다.

여기서 중요한 점은 자식이 몇개인지는 알 필요 없다는 점이다.

그래서 간단하게 `TRUE`, `FALSE` 로만 알기로 했다.

```sql
CASE WHEN (SELECT COUNT(*) FROM ECOLI_DATA E2 WHERE E2.PARENT_ID = E.ID) > 0 THEN TRUE ELSE FALSE END AS CHILDREN
```

출력해보면 `TRUE`는 `1`, `FALSE`는 `0`으로 나오지만 당황하지 말자. 그게 맞다.

