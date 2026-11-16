# OSS Week 12 — React Hooks Playground (Student Starter)

## 실행 방법

Node.js 20.19+ 또는 22.12+ 권장. 프로젝트 폴더에서 실행:

```bash
npm install
npm run dev
```

브라우저에 터미널의 Local URL을 열고 LAB 탭을 이동하세요. 제출 전 `npm run build`도 실행하세요.

# Project Structure: App.jsx와 주요 Lab 컴포넌트의 역할

이 react 프로젝트의 메인 컴포넌트를 담당한다. State를 활용하여 선택된 Lab을 관리한다. 버튼을 누르면 Lab 컴포넌트가 화면에 프린트 되도록 한다. 그 Lab 을 배열(1,2,3,4) 로 관리한다.

# useEffect: Effect, Dependency Array 및 Cleanup의 동작 원리

이펙트는 화면이 모두 렌더링 된 후 동작하는 부분이고, 타이머를 실행하고나 데이터를 가져오는 데에 쓰인다. Dependency는 3가지 형태로 동작한다. 첫번째는 렌더링될 때마다 실행하고, 두번째는 처음 콜링...마운트 될때 실행하고, 세번째는 running 값이 변경될 때 실행되는 것이다. (useEffect(() => {}) / useEffect(() => {}, []) / useEffect(() => {}, [running])) cleanup은 설명했던 이펙트 안에서 실행됐던 프로세스를 정리한다. clearInterval()로 타이머를 종료한다. 언마운트될 때도 Cleanup이 실행된다. 즉, 불필요한 타이머 실행을 막는 동작 원리이다.

# useRef: .current 속성과 useState의 차이

current 속성은 useRef로 객체가 생성되면 그 값을 저장한다. 이 속성을 사용해서 그 값을 변경할 수 있다. 단, 값이 바뀌어도 컴포넌트가 리렌더링 되지 않는다. useState도 값 저장이 가능하지만, 화면이 리렌더링이 된다는 점에서 차이가 있다. 그리고 useState는 비동기이고, current는 동기(즉시)이다.

# Code Analysis: useEffect와 useRef 관련 주요 코드 각 1개(5~15줄)를 선택하여 동작 원리 설명

useEffect(() => {
console.log('[LAB 1] effect');

    const timerId = setInterval(() => {
        setCount(prev => prev + 1);
    }, 1000);

    return () => {
        console.log('[LAB 1] cleanup');
        clearInterval(timerId);
    };

}, []);

useEffect를 이용하여 타이머를 관리한다. running을 [] 에 넣어서 그 값이 변경되면 이펙트가 다시 실행되도록 한다. 만약 그 값이 true이면 타이머를 실행하고, false값이면 실행하지 않는다. 마지막으로 클린업을 통해 기존의 타이머 기능을 종료함으로써 중복실행을 방지한다.

const timerRef = useRef(null);

const start = () => {
if (timerRef.current !== null) return;

    timerRef.current = setInterval(() => {
        setCount(prev => prev + 1);
    }, 1000);

    setRunning(true);

};

타이머 id를 저장해 놓을 공간을 생성한다. 그리고 timerRef.current에 저장된 값이 있다면, 중복실행이 방지된다. setInterval 부분은 1초마다 count 값을 증가시킨다. 아까 생성된 id를 timerRef.current에 저장한다. setRunning(true) 부분은 타이머를 화면에 출력하는 기능을 담당한다.

# useEffect의 Dependency Array가 필요한 이유는?

이펙트가 또 언제 실행될지를 React에게 고지하기 위해 필요하다.

# Cleanup을 사용하지 않으면 어떤 문제가 발생할 수 있는가?

이건 말 그대로의 뜻과 기능을 담당하고 있기 때문에, 메모리에 불필요한 것이 계속 쌓인다. 그리고 이펙트가 재실행 될 때 동작이 누적 또는 여러번 일어나게 된다.

# useState와 useRef의 가장 중요한 차이는?

값이 변경되었을 때 useState는 리렌더링이 발생하고, useRef는 리렌더링이 발생하지 않는다는 차이다.

# LAB 2와 LAB 4의 Timer 관리 방식은 어떻게 다른가?

먼저 2번은 useEffect를 쓰고, 4번은 useRef를 쓴다는 점에서 큰 차이가 있다. 2번은 타이머를 시작하고 종료하는 데에 running 과 cleanup을 사용하지만, 4번은 시작과 종료 함수를 사용한다. 즉 2번은 이펙트 중심이고 4번은 Ref를 이용하여 직접 관리하는 방식이라는 점에서 차이가 있다.

## 수행 방법

1. `src/components/` 아래의 LAB 1~4 파일에 있는 `TODO`를 직접 완성합니다.
2. `src/App.jsx`, `src/App.css`는 공통 화면이므로 가급적 수정하지 않습니다.
3. 각 LAB의 동작 화면과 콘솔 결과를 기록합니다.
4. 한 LAB에서 다른 LAB으로 탭을 전환하면 기존 컴포넌트가 언마운트됩니다. Cleanup 결과를 관찰합니다.

## 이해도 확인 질문

1. `setCount(prev => prev + 1)`은 왜 유용한가?
2. `useEffect(fn, [])`과 `useEffect(fn)`은 어떻게 다른가?
3. Cleanup은 언제 실행되는가? 개발 환경 StrictMode 영향은?
4. `useState`와 `useRef`의 값 변경 시 렌더링 차이는?
5. LAB 2와 LAB 4에서 Timer를 관리하는 방식의 차이는?
