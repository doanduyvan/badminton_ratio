
const ratio = {
    team1: 0,
    team2: 0
}


const ratioLocalStogare = localStorage.getItem('ratio');
if(ratioLocalStogare){
    const ratioParse = JSON.parse(ratioLocalStogare);
    ratio.team1 = ratioParse.team1
    ratio.team2 = ratioParse.team2
    const Eteam1 = document.getElementById('ratio1');
    const Eteam2 = document.getElementById('ratio2');
    Eteam1.textContent = ratio.team1;
    Eteam2.textContent = ratio.team2;
}

function handleRatio(work){
    const Eteam1 = document.getElementById('ratio1');
    const Eteam2 = document.getElementById('ratio2');
    switch(work){
        case "team1":
            ++ratio.team1
            break;
        case "team2":
            ++ratio.team2
            break;
        case "undo1":
            if(ratio.team1 > 0 ) --ratio.team1
            break;
        case "undo2":
            if(ratio.team2 > 0 ) --ratio.team2
            break;
        case "reset":
            ratio.team1 = 0
            ratio.team2 = 0
            break;
        default:
            return;
    }
    const sound = document.getElementById('clickSound');
    sound.pause();
    sound.currentTime = 0;
    sound.play();
    
    Eteam1.textContent = ratio.team1;
    Eteam2.textContent = ratio.team2;
    localStorage.setItem("ratio", JSON.stringify(ratio))
}

document.addEventListener('click', function(e){
    const target = e.target;
    const currentId = target.id;
    handleRatio(currentId);
})




let wakeLock = null;

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Wake Lock is active');

    // Lắng nghe sự kiện mất wake lock (ví dụ do người dùng rời khỏi tab)
    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock was released');
    });
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
}

// Gọi hàm khi trang được load hoặc khi người dùng nhấn nút
requestWakeLock();

let lastTouch = 0;
document.addEventListener('touchend', function (event) {
  const now = new Date().getTime();
  if (now - lastTouch <= 300) {
    event.preventDefault(); // chặn zoom
  }
  lastTouch = now;
}, false);


