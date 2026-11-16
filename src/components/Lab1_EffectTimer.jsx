import { useEffect, useState, useMemo} from 'react';

// LAB 1 (Slide 07): useEffect Timer
export default function Lab1EffectTimer() {
  const [count, setCount] = useState(0);
  
    // TODO 1: 1초마다 setCount(prev => prev + 1)을 실행할 setInterval 작성
    // TODO 2: 만든 타이머 ID를 보관
    // TODO 3: return Cleanup 함수에서 clearInterval 호출
    // TODO 4: Dependency Array가 []일 때와 생략했을 때의 차이 관찰

  const time = useMemo(() => {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [count]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <p className="status">상태: Running</p>
      <p className="hint">1초마다 자동으로 숫자가 증가한다.</p>
      <div className="count">{time}</div>
      <p className="hint">useEffect와 Cleanup을 확인하세요.</p>
    </div>
  );
}
