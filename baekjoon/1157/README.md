# 단어 공부

## 문제

알파벳 대소문자로 된 단어가 주어지면, 이 단어에서 가장 많이 사용된 알파벳이 무엇인지 알아내는 프로그램을 작성하시오. 단, 대문자와 소문자를 구분하지 않는다.

### 입력

첫째 줄에 알파벳 대소문자로 이루어진 단어가 주어진다. 주어지는 단어의 길이는 1,000,000을 넘지 않는다.

### 출력

첫째 줄에 이 단어에서 가장 많이 사용된 알파벳을 대문자로 출력한다. 단, 가장 많이 사용된 알파벳이 여러 개 존재하는 경우에는 ?를 출력한다.

### 예제

예제 입력1: Mississipi
예제 출력1: ?

예제 입력2: zZa
예제 출력2: Z

예제 입력3: z
예제 출력3: Z

예제 입력4: baaa
예제 출력4: A

## 해결

속도: 1044ms

소문자와 대문자를 상관하지 않고 가장 많이 사용된 알파벳을 찾으므로, 입력값을 받을 때 대문자 배열로 받는다.

루프를 적게 돌기 위해 중복된 값을 없애준다.

```javascript
const group = [...new Set(input)];
```

같은 값을 가진 알파벳의 수와 알파벳을 저장하기 위해 key, value 형태로 저장해준다.

```javascript
map.set(group[i], filter.length);
```

여기서 알파벳이 key, filter.length가 value인 이유는, 같은 중복값의 알파벳이 있을 때 같은 key가 되어버려 덮여쓰여지기 때문에 unique한 key값이 필요하다.

최대 value를 가진 값들을 필터하여 조건에 따라 콘솔에 찍는다.

```javascript
const maxCount = Math.max(...map.values());
const biggistGroup = [...map.entries()].filter((e) => e[1] === maxCount);
```
