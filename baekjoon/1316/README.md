# 그룹 단어 체커

## 문제

그룹 단어란 단어에 존재하는 모든 문자에 대해서, 각 문자가 연속해서 나타나는 경우만을 말한다. 예를 들면, ccazzzzbb는 c, a, z, b가 모두 연속해서 나타나고, kin도 k, i, n이 연속해서 나타나기 때문에 그룹 단어이지만, aabbbccb는 b가 떨어져서 나타나기 때문에 그룹 단어가 아니다.

단어 N개를 입력으로 받아 그룹 단어의 개수를 출력하는 프로그램을 작성하시오.

### 입력

첫째 줄에 단어의 개수 N이 들어온다. N은 100보다 작거나 같은 자연수이다. 둘째 줄부터 N개의 줄에 단어가 들어온다. 단어는 알파벳 소문자로만 되어있고 중복되지 않으며, 길이는 최대 100이다.

### 출력

첫째 줄에 그룹 단어의 개수를 출력한다.

### 예제

예제 입력 1:

```
3
happy
new
year
```

예제 출력1:

```
3
```

예제 입력2:

```
4
aba
abab
abcabc
a
```

예제 출력2:

```
1
```

예제 입력 3:

```
5
ab
aa
aca
ba
bb
```

예제 출력3:

```
4
```

예제 입력4:

```
2
yzyzy
zyzyz
```

예제 출력4:

```
0
```

예제 입력5:

```
1
z
```

예제 출력5:

```
1
```

예제 입력6:

```
9
aaa
aaazbz
babb
aazz
azbz
aabbaa
abacc
aba
zzaz
```

예제 출력6:

```
2
```

## 해결

시간: 116ms

알파벳이 연이어서 사용된다면 한 알파벳으로 취급하고, 떨어져서 사용된 것을 알게 되면 카운트를 올리지 않는다.

해서, 연이어서 사용되는 알파벳에 한하여 문자열이나 배열로 길게 알고 있을 필요가 없다.

```javascript
const alpabet = new Set();
```

alpabet이 빈 값일 때는 그대로 추가해준다.

```javascript
if (alpabet.size === 0) alpabet.add(input[i]);
```

만약 `abcdaabbe`를 split 하여 Set에 넣어주면 어떻게 될까?

```
Set(5) { 'a', 'b', 'c', 'd', 'e'}
```

처럼 넣은대로 순서 보장이 된다.

그러므로, 연이어 있는 알파벳이 아니라면

1. 이미 Set에 들어가 있고,
2. 마지막으로 들어간 알파벳과 다를 것이다.

```javascript
const lastAlpabet = [...alpabet][alpabet.size - 1];
if (alpabet.has(input[i]) && lastAlpabet !== input[i]) {
	break;
}
```
