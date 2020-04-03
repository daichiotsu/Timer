'use strict'

// 編集

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId; 
  let elapsedTime = 0;

  function countUp(){
    // console.log(Date.now() - startTime); //Date.nowは常に動いている「時」なので、ボタンを押したときの時刻からの経過時間が表示される
    
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}.${ms}`;


    timeoutId = setTimeout(() =>{ //10ミリ秒ごとに経過時間をコンソールに表示
      countUp(); //再帰呼び出し(繰り返し実行される)
    }, 10);
  }

  function setButtonStateInitial(){
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
  }
  function setButtonStateRunning(){
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = true;
  }
  function setButtonStateStopped(){
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
  }

  setButtonStateInitial();

  start.addEventListener('click', () =>{
    setButtonStateRunning();
    startTime = Date.now(); //まず変数startTimeを現在時刻と一致させる
    countUp();

  });
  stop.addEventListener('click', () =>{
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
    
  });
  reset.addEventListener('click', () =>{
    setButtonStateInitial();
    timer.textContent = '00:00.000';
    elapsedTime = 0;

  });
  }