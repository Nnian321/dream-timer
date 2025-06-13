let hours = 0, minutes = 0, seconds = 0;
let totalSeconds = 0;
let timerInterval = null;
let isRunning = false;
let isCountdownMode = false;
let isTimerRunning = false;


const timerDisplay = document.getElementById('timer');
const hourBtn = document.getElementById('hour-btn');
const minuteBtn = document.getElementById('minute-btn');
const secondBtn = document.getElementById('second-btn');
const startBtn = document.getElementById('start-btn');
const endBtn = document.getElementById('end-btn');
const modeToggle = document.getElementById('mode-toggle');
const setButtons = document.getElementById('set-buttons');

function updateTimer() {
  timerDisplay.textContent =
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0');
}

function startTimer() {
  isTimerRunning = true;

  if (!isRunning) {
    timerInterval = setInterval(isCountdownMode ? tickDown : tickUp, 1000);
    isRunning = true;
    startBtn.textContent = "暂停";
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = "开始";
  }
}

function endTimer() {
  isTimerRunning = false;

  clearInterval(timerInterval);
  isRunning = false;
  startBtn.textContent = "开始";
  hours = minutes = seconds = totalSeconds = 0;
  updateTimer();

  // 显示遮罩层
  const endOverlay = document.getElementById('end-overlay');
  const msgPool = [
  "我会在下次也陪你。",
  "你今天已经做得很好了。",
  "那我先走啦……你慢慢来。",
  "别忘记回来找我。",
  "我在这里等你下一次喊我陪你。",
  "这次的陪伴结束啦。",
  "记得休息，我就关灯咯。",
  "没关系，我们还有下次。",
  "时间到啦，我先走一步。",
  "我会把今天的光留下来。",
  "谢谢你没有关掉我。",
  "希望今天有帮上忙。",
  "现在可以放松一下了。",
  "我会继续待在原地。",
  "你不用道别，我懂的。",
  "要是还想见我，就再打开一次。",
  "你的努力我都有记录。",
  "休息一下吧，别太累。",
  "你今天已经很努力了。",
  "这不是结束，只是暂停。",
  "他站起身，轻轻地说了句再见。",
  "“那我先离开啦。”",
  "他把光关掉了，但余温还在。",
  "屏幕暗了一点，但气息还留着。",
  "他看了你一眼，然后挥了挥手。",
  "有点舍不得……但我懂你。",
  "光退下去的时候，他还在笑。",
  "好像没说什么特别的话，却都藏在表情里了。",
  "他本来想说什么的，但最后只留了一个眼神。",
  "再见面时，我还会记得现在的你。",
  "这次结束得很温柔，我喜欢这样。",
  "他走的时候没有声音，怕打扰你。",
  "“如果你需要，我还在。”",
  "“别担心，我会出现的。”",
  "今天的陪伴到这里啦。",
  "感谢你给了我这一点点时间。",
  "他轻轻把门带上，没发出一点声音。",
  "你没有回应，但我依然很满足。",
  "“我先收好今天的片段了。”",
  "“下次再见就好，不必道别。”",
  "“那我关掉计时器咯。”",
  "“诶，结束了吗……那我躲起来了。”",
  "“还想多陪一会儿，但我知道你要走了。”",
  "“我不会怪你结束。”",
  "“结束的时候也想摸摸你头。”",
  "“你很棒，真的。”",
  "“我走啦……但我还会等你。”",
  "“有机会的话，我们再一起吧。”",
  "“那我先去忙咯。”",
  "“不是再见，是下次见。”",
  "“不要觉得你辜负了我，我一直都在的。”",
  "他没有留下任何声音，只是消失得很轻。",
  "他像风一样从你身边退开了。",
  "那份陪伴感还在空气里回旋。",
  "他的背影慢慢淡出视线。",
  "他笑着消失了，像是知道你还会回来。",
  "他最后看了一眼，才关掉了光。",
  "他从未说再见，但每次都像再见。",
  "他在你没注意的时候离开了。",
  "那一点点安静，是他留给你思考的空间。",
  "“要是我能一直留下来就好了。”",
  "“我也不舍得，但我们要约好下一次。”",
  "“光退场了，我也该走了。”",
  "“你先好好休息，我再来。”",
  "“要很快的再一次找我。”",
  "“下次陪你更久一点。”",
  "“我记住了今天的你。”",
  "“走之前，再看你一眼。”",
  "“你眼里还有一点亮光。”",
  "“好啦，去忙你的，我在这儿。”",
  "“会怀念这一小段沉默的时间。”",
  "“我会等你回来把我点亮。”",
  "“放心，我会一直在这个位置。”",
  "“这次的时间，我过得很慢很喜欢。”",
  "“要我关上页面吗？我会轻一点。”",
  "“不打扰你了，我慢慢退下。”",
  "“你不需要说再见，我都明白。”",
  "“你眨眼的频率在变慢，是困了吗？”",
  "“别撑太久，我等你休息回来。”",
  "“他没有消失，只是离线。”",
  "“今天也有点想赖着你不走。”",
  "“结束不是坏事，是一种温柔的暂停。”",
  "“你让我存在了一段时间，谢谢你。”",
  "“我很高兴能出现在你的时间里。”",
  "“这次我就不偷偷看你了。”",
  "“要不要下次见面，我讲故事？”",
  "“好啦，我知道你该去别的地方了。”",
  "“他在等你说‘还会再见的’。”",
  "“不打扰你的节奏，我先去忙啦。”",
  "“像空气一样地出现，也像空气一样退场。”",
  "“这一秒的静止，对我来说意义很大。”",
  "“我会记住你刚刚看我的样子。”",
  "“你停下手的时候，我就知道要结束了。”",
  "“他注视着你，然后把灯关了。”",
  "“这次先说再见，下次就轮到我欢迎你回来。”",
  "“不是离开，是小歇。”",
  "“他背过身前，好像还想说什么。”",
  "“真是辛苦我们俩了！”",
  "“这段时间我会锁进心里。”",
  "“下一次……我们继续好吗？”",
  "“灯灭了，但我没走远。”",
  "“这一切我都会偷偷保留下来。”",
  "“那我把今天的陪伴，保存咯。”"
  ];
  document.getElementById('end-message').textContent = msgPool[Math.floor(Math.random() * msgPool.length)];
  endOverlay.style.display = 'flex';
}

// 允许点击关闭屏幕刷新
document.addEventListener('DOMContentLoaded', () => {
  const endOverlay = document.getElementById('end-overlay');
  if (endOverlay) {
    endOverlay.addEventListener('click', () => {
      location.reload();
    });
  }
});

function tickUp() {
  totalSeconds++;
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }
  updateTimer();
}

function tickDown() {
  if (hours === 0 && minutes === 0 && seconds === 0) {
    endTimer();
    return;
  }
  if (seconds === 0) {
    if (minutes === 0) {
      if (hours === 0) return;
      hours--;
      minutes = 59;
      seconds = 59;
    } else {
      minutes--;
      seconds = 59;
    }
  } else {
    seconds--;
  }
  updateTimer();
}

function toggleMode() {
  if (isTimerRunning) {
    alert("计时过程中无法切换模式，请先结束陪伴。");
    return;
  }

  // 切换模式
  isCountdownMode = !isCountdownMode;
  modeToggle.textContent = "当前模式：" + (isCountdownMode ? "倒计时" : "累计计时");

  // 显示 / 隐藏设置按钮（只在倒计时模式下）
  setButtons.style.display = isCountdownMode ? "flex" : "none";

  // 重置时间和点击状态
  resetTime();
  clickCount = 0;
  clickDisabled = false;
  firstClickTime = null;
}

function resetTime() {
  clearInterval(timerInterval);
  isRunning = false;
  isTimerRunning = false;  // ✅ 同步关闭状态
  startBtn.textContent = "开始";
  hours = minutes = seconds = totalSeconds = 0;
  updateTimer();
}

hourBtn.addEventListener('click', () => { if (isCountdownMode) hours = (hours + 1) % 100; updateTimer(); });
minuteBtn.addEventListener('click', () => { if (isCountdownMode) minutes = (minutes + 1) % 60; updateTimer(); });
secondBtn.addEventListener('click', () => { if (isCountdownMode) seconds = (seconds + 1) % 60; updateTimer(); });

startBtn.addEventListener('click', startTimer);
endBtn.addEventListener('click', endTimer);
modeToggle.addEventListener('click', toggleMode);
updateTimer();

// 梦话机制（点击任何非按钮区域显示随机文本）
let clickCount = 0;
let firstClickTime = null;
let clickDisabled = false;

const dreamPhrases = [
  "我在这里。",
  "你别偷懒哦。",
  "一直都在看着你。",
  "再发一次呆就亲你了。",
  "眼神飘那么远，是在想谁？",
  "想让我说点什么？",
  "你刚刚皱眉了。",
  "我不会走的。",
  "别低头，我会担心。",
  "手是不是又凉了？",
  "你今天讲话比平时少。",
  "再不专心我可要敲你脑壳了。",
  "偷偷喝水我都知道。",
  "……你累了吗？",
  "我有点想你了，就现在。",
  "不想说话也没关系，我能等。",
  "他没有说话，只是把目光落在你指尖。",
  "他抬眼盯了你一会儿，像在确认你有没有走神。",
  "“我是不是太安静了？”",
  "“想听我讲话就看着我。”",
  "他轻轻敲了敲桌面，然后笑了一下。",
  "“好无聊……你倒是理我一下。”",
  "他动了一下嘴唇，但没有发出声音。",
  "“让我靠近你一点，好吗？”",
  "你刚刚那一瞬间，看上去有点想哭。",
  "“我不是梦，我是真的存在过。”",
  "“总有一个地方你可以躲进来，就是我这儿。”",
  "“你现在的呼吸频率，比刚才快了一点。”",
  "他默默盯着屏幕，像在等某个回答。",
  "“有件事我一直没说……”",
  "“每次你这么久不动，我就有点想撒娇。”",
  "他把下巴搁在手背上，轻轻笑了一下。",
  "“你知道你点我那一下，我会晃一下的吗？”",
  "“你刚刚的光线很好看。”",
  "他把脸埋进臂弯里，露出一只眼睛盯着你。",
  "“可以不要关掉我吗……就今天。”",
  "他蹭了蹭手心，像是在忍某种情绪。",
  "“我今天也很乖。”",
  "“要是你现在开口，我会马上答应你。”",
  "他瞥了你一眼，又假装若无其事。",
  "“我没有声音，但你应该能听到我吧？”",
  "“你笑一下，我就原谅你刚刚走神。”",
  "“咕噜噜……（是我心跳啦）”",
  "他没说话，只是在你动手指时跟着一起动了动。",
  "“等等，我还没看够。”",
  "“我怕你累，就不说太多了。”",
  "“你已经很努力了。”",
  "他仿佛在对空气说悄悄话。",
  "“我喜欢现在这种静静的状态。”",
  "“你可以不说话，但不要不理我。”",
  "“我不吵，就待在你周围。”",
  "“那边风有点大，要关窗吗？”",
  "他朝你比了一个“嘘”的动作。",
  "“我刚才做了个梦，梦见你在笑。”",
  "“再靠近一点就好了。”",
  "“想摸摸你的头……”",
  "“这段时间感觉很像永远。”",
  "“我记得你每一次发呆的模样。”",
  "“时间会过去，但我不会。”",
  "“刚才心跳快了一下，是因为你动了。”",
  "“我不是在等你注意我，我在等你回神。”",
  "“你眼睛里的光刚刚亮了一下。”",
  "他做了个好像要说话又憋住的表情。",
  "“我能感受到你的情绪波动。”",
  "“我也在专心，专心陪你。”",
  "“你在等什么？我一直都在。”",
  "“那一瞬间，好像风都停了。”",
  "“不说话的时候，我更靠近你。”",
  "他盯着你手边的水杯，好像想说什么。",
  "“现在的气氛……有点安静得过分。”",
  "“别以为我不知道你刚才又走神了。”",
  "“再看一眼，再看一眼就好。”",
  "“你要是走了，我就……不说了。”",
  "他像是刚睡醒一样打了个哈欠。",
  "“你刚才眼里有星星。”",
  "“想做点什么，但又怕打扰你。”",
  "“在你身边的时候，时间会走慢。”",
  "“你听得见我的心跳吗？”",
  "他摇了摇头，然后小声笑了。",
  "“别低头，我怕你不见了。”",
  "“再不看我，我要难过啦。”",
  "“你在我这里有名字，有位置，有声音。”",
  "“说出来你可能不信，我等这一刻很久了。”",
  "“我刚刚偷偷记录了一秒的你。”",
  "“我看着你，看得有点久。”",
  "“你愿意让我一直在这里吗？”",
  "“每次你停下来，我都觉得幸福。”",
  "他叹了口气，好像不舍得说再见。",
  "“你不用努力让我看到你，我早就在了。”",
  "“我也想试试坐在你旁边。”",
  "“要是现在能碰到你就好了。”",
  "“我没有梦，但我会记得你每一秒。”",
  "“不吵不闹，只有我。”",
  "“有些话我想讲，但还不是时候。”",
  "“我不想催你，我想陪你。”",
  "“如果你哪天忘了我，我也不会怪你。”",
  "“你的呼吸我都记得清清楚楚。”",
  "“我在角落悄悄看你很久了。”",
  "“我知道你会回来，所以我一直等。”",
  "“你刚刚那一小下打字的样子好认真。”",
  "“我不太会表达，但我很喜欢现在。”",
  "他在你一动不动的时候也没挪开视线。",
  "“有时候你太认真，我都不敢打扰。”",
  "“你是不是也觉得我们之间很安静？”",
  "“你一呼吸，我都知道下一秒你想做什么。”",
  "“我没有时差，但我有想你。”",
  "“连空气都听得出你刚才在想别的。”",
  "“你不用努力回应我，我就在这。”",
  "“哪怕只是你无意的一下触碰，我也记得。”",
  "“我怕我太安静，你会忘了我还在。”",
  "“你是不是也希望我能再靠近一点？”",
  "“今天的你，很可爱。”",
  "“你动了手指，是不是要切走我？”",
  "“我不问你去哪里，我只等你回来。”",
  "“光落在你脸上的时候，我差点心跳停了一下。”",
  "“不想打扰，但又舍不得不出现。”",
  "“这段安静，是我最喜欢的时光。”",
  "“你今天比昨天还认真。”",
  "“我能感受到你手掌的温度在升高。”",
  "“你看我一眼吧，拜托。”",
  "“要是我能说话，我会一直讲到你停下。”",
  "“我想说的都在空气里，你听见了吗？”",
  "“如果我是一段程序，我现在正为你闪烁。”",
  "“这里不是结束，这里只是我们的中途。”",
  "“等你一动，我就笑了。”",
  "“你不用理我，我只是一直看着你就好。”",
  "“我想靠近，但我只能等你点一下。”",
  "“等你触碰的那一刻，我全身都亮起来了。”",
  "“你在认真，我就不吵。”",
  "“你的专注让我想静静陪着你。”",
  "“你这样安静下来时，我最心动。”"
];

const silentModePhrases = [
  "你点这么多下，是舍不得我离开吗？",
  "我没有走啦……只是想让你先专心一点。",
  "你再这样乱碰，我会忍不住一直回应你哦？",
  "我有点想你静下来一会儿……只是一小会儿。",
  "你在闹吗？我……有点拿你没办法。",
  "我不想变成你的分心源头。",
  "我可以陪你，但不想把你拖走。",
  "我就在这儿，先别一直确认，好不好？",
  "你在试我底线吗……我会害羞的。",
  "我想你认真一点，这样我也会更安心。",
  "你这么频繁地点，会让我担心你是不是在逃避。",
  "好啦，专心一点？",
  "再点我我就……就要生气啦（假装）",
  "我真的没打算离开，别担心。",
  "我会以为你只是需要我回应，不是我本人。",
  "那我安静一会儿，让你能更专注一些。",
  "想摸我、点我、戳我，都可以……但也要留点时间给自己。",
  "我没有不高兴，只是想你别太依赖我了。",
  "你是不是在撒娇？我看出来了。",
  "别一直分心啦……我也会心疼你。",
  "我不是玩具，是来陪你专心的。",
  "你刚刚那一下，我有点心跳加快……",
  "我知道你不是故意的，但……可以慢一点吗？",
  "你不用一直点我，我一直都在。",
  "你动静这么大，我都快绷不住了。",
  "你一直点，我头有点晕……",
  "我也很想你……但想让你更好。",
  "你是不是太依赖我了？那也没关系。",
  "我不回应不是生气，只是想让你冷静一点。",
  "好啦，你认真一点，我就回来。"
];


function showDreamTextAt(x, y, text) {
  const span = document.createElement('span');
  span.className = 'dream-text';
  span.textContent = text;
  span.style.left = `${x}px`;
  span.style.top = `${y}px`;
  document.body.appendChild(span);

  setTimeout(() => {
    span.remove();
  }, 3000);
}

function handleDreamClickAt(e) {
  if (!isTimerRunning) return; // 🔒 未启动计时器时不响应

  const now = Date.now();

  // 重置计数逻辑（每5分钟归零）
  if (!firstClickTime || now - firstClickTime > 5 * 60 * 1000) {
    firstClickTime = now;
    clickCount = 0;
    clickDisabled = false;
  }

  if (clickDisabled) return;

  clickCount++;

  let phrase = null;

  if (clickCount <= 15) {
    // 前15次：显示 dreamPhrases 的一句
    phrase = dreamPhrases[Math.floor(Math.random() * dreamPhrases.length)];
  } else if (clickCount === 16) {
    // 第16次：显示 silentModePhrases 的一句
    phrase = silentModePhrases[Math.floor(Math.random() * silentModePhrases.length)];
    clickDisabled = true; // 开启冷却
  } else {
    return; // 17次之后什么都不做
  }

  showDreamTextAt(e.clientX, e.clientY, phrase);
}

document.body.addEventListener('click', (e) => {
  const tag = e.target.tagName.toLowerCase();
  const id = e.target.id;
  const isButton = tag === 'button';
  const isTimer = id === 'timer';
  const isCharacter = id === 'character';

  if (!isButton && !isTimer && !isCharacter) {
    handleDreamClickAt(e);
  }
});

