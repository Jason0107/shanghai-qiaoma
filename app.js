document.addEventListener("DOMContentLoaded", () => {

  /* ===================== Tab Switching ===================== */
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-" + target).classList.add("active");
    });
  });

  /* ===================== Quiz Data ===================== */
  const quizzes = [
    {
      title: "场景一：后期防守",
      scenario:
        "现在是第15轮（后期）。对面碰了 <span class='tile wan'>二万</span> 和 <span class='tile wan'>五万</span>，" +
        "并且刚打出 <span class='tile tiao'>九条</span>。<br>" +
        "你手里需要出一张牌，可选：<br>" +
        "A) <span class='tile wan'>四万</span>（场上没出现过）<br>" +
        "B) <span class='tile tiao'>九条</span>（对面刚打的）<br>" +
        "C) <span class='tile tong'>五筒</span>（场上出过1张）<br>" +
        "D) <span class='tile wan'>八万</span>（场上出过2张）",
      options: [
        "A. 打四万 — 想着拆搭子",
        "B. 打九条 — 跟打对面刚出的牌",
        "C. 打五筒 — 中间张，但不是万子",
        "D. 打八万 — 已出2张感觉安全"
      ],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 跟打九条</strong><br><br>" +
        "分析：<br>" +
        "• 对面碰了两副万子，极有可能做<strong>清一色</strong>或<strong>混一色</strong>，万子全花色都是极危险牌<br>" +
        "• A选项四万是万子中间张生张，放炮概率 <strong>35~50%</strong>，是送分题！<br>" +
        "• D选项八万虽然出了2张，但对方做万子清一色仍可能在等<br>" +
        "• C选项五筒虽不是万子，但作为中间张生张仍有 <strong>18~30%</strong> 风险<br>" +
        "• B选项跟打九条，对面刚打过没人胡，放炮概率仅 <strong>3~8%</strong>，是最安全选择"
    },
    {
      title: "场景二：中期选择",
      scenario:
        "第9轮（中期）。下家已碰了 <span class='tile tong'>三筒</span>，牌河里筒子很少。<br>" +
        "你手里需要出一张，可选：<br>" +
        "A) <span class='tile tong'>六筒</span>（场上0张，生张）<br>" +
        "B) <span class='tile feng'>北风</span>（场上出过2张）<br>" +
        "C) <span class='tile tiao'>二条</span>（场上出过1张）<br>" +
        "D) <span class='tile tong'>九筒</span>（场上出过1张）",
      options: [
        "A. 打六筒 — 反正也用不上",
        "B. 打北风 — 已出2张的字牌",
        "C. 打二条 — 边张比较安全",
        "D. 打九筒 — 幺九牌应该安全"
      ],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 打北风</strong><br><br>" +
        "分析：<br>" +
        "• 下家碰了筒子，牌河筒子少 → 极可能做筒子清一色<br>" +
        "• A选项六筒是筒子中间张生张，对做清一色的下家来说简直是<strong>送牌</strong><br>" +
        "• D选项九筒虽是幺九，但仍是筒子花色，清一色也会用到<br>" +
        "• C选项二条虽然不是筒子，但只出了1张，仍有一定风险<br>" +
        "• B选项北风已出2张，字牌没有顺子连接，对手做清一色也用不上，风险最低（约 <strong>5~10%</strong>）"
    },
    {
      title: "场景三：前期整理",
      scenario:
        "第3轮（前期）。没有人碰牌和吃牌，牌局刚开始。<br>" +
        "你手里有以下孤张需要清理：<br>" +
        "A) <span class='tile feng'>东风</span>（没有对子）<br>" +
        "B) <span class='tile wan'>五万</span>（没有搭配）<br>" +
        "C) <span class='tile tiao'>一条</span>（没有搭配）<br>" +
        "D) <span class='tile tong'>九筒</span>（没有搭配）",
      options: [
        "A. 先打东风 — 字牌先走",
        "B. 先打五万 — 孤张先走",
        "C. 先打一条 — 幺九先出",
        "D. 先打九筒 — 幺九先出"
      ],
      correct: 0,
      explanation:
        "<strong>正确答案：A. 先打东风</strong><br><br>" +
        "分析：<br>" +
        "• 前期整理手牌的优先级：<strong>孤张字牌 > 孤张幺九 > 孤张边张 > 中间张</strong><br>" +
        "• 字牌只能做刻子（碰/杠），连接性最差（危险指数20%），前期打出最安全<br>" +
        "• 五万是中间张，连接性最强，即使现在是孤张也有很大概率后续摸到搭配，应该<strong>留下</strong><br>" +
        "• 一条和九筒是幺九牌，连接性较差，但比字牌稍好，可以在字牌打完后出<br>" +
        "• 前期口诀：<strong>「字幺九，大胆甩；中间张，留下来」</strong>"
    },
    {
      title: "场景四：百搭牌判断",
      scenario:
        "第11轮（中期偏后）。本局百搭牌是 <span class='tile wan'>二万</span>。<br>" +
        "上家打出 <span class='tile wan'>三万</span> 没人要，你手里有一张 <span class='tile wan'>一万</span>。<br>" +
        "另外还有 <span class='tile feng'>西风</span>（场上出了3张）。<br>" +
        "你该先出哪张？",
      options: [
        "A. 打一万 — 上家刚打了三万，一万应该安全",
        "B. 打西风 — 已出3张，基本安全",
        "C. 都安全，随便打",
        "D. 两张都不打，先拆别的"
      ],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 打西风</strong><br><br>" +
        "分析：<br>" +
        "• 本局 <strong>二万是百搭</strong>，意味着二万可以当任何牌用<br>" +
        "• 虽然上家打了三万没人要，但某人手里可能有百搭（二万）+ 三万的搭子在等一万<br>" +
        "• 或者有人拿着百搭当一万用做了 123 的搭子，再来一张一万可以配将<br>" +
        "• 百搭牌附近的牌（相邻数字）危险度会上升，需要格外小心<br>" +
        "• 西风已出3张，最多只剩1张，且字牌只能碰不能吃，放炮概率仅约 <strong>2~5%</strong>"
    },
    {
      title: "场景五：是否放弃胡牌",
      scenario:
        "第14轮（后期）。你只差一张就能胡牌，听 <span class='tile wan'>三万</span>。<br>" +
        "但你发现：<br>" +
        "• 对面和下家都只剩很少的牌，可能都已听牌<br>" +
        "• 你摸到一张 <span class='tile tiao'>五条</span>（全场没出过，生张中间张）<br>" +
        "你该怎么做？",
      options: [
        "A. 打五条 — 反正我也要胡了，赌一把",
        "B. 拆掉自己的听牌搭子，打安全牌",
        "C. 打五条，中间张别人未必在等",
        "D. 看情况，如果筒子牌河多就打"
      ],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 拆听牌搭子，打安全牌</strong><br><br>" +
        "分析：<br>" +
        "• 后期多家听牌时，打生张中间张的放炮概率高达 <strong>35~50%</strong><br>" +
        "• 你虽然也在听牌，但你自摸到三万的概率远低于这张五条被别人胡的概率<br>" +
        "• <strong>「能黄庄也是赢」</strong>：黄庄（流局）大家都不赔不赚，但点炮可能一把输光<br>" +
        "• 特别是上海敲麻翻数高的情况下，一次点炮的损失可能要好几把才能挣回来<br>" +
        "• 正确做法：放弃听牌，拆搭子出安全牌，以防守保住不赔"
    },
    {
      title: "场景六：读牌推理",
      scenario:
        "第10轮。上家从第1轮开始就一直在打条子（已打出 1条、3条、6条、8条），<br>" +
        "但他一张万子和筒子都没有打过。他还碰了一副 <span class='tile feng'>发</span>。<br>" +
        "你手里有：<br>" +
        "A) <span class='tile tiao'>七条</span>（场上出1张）<br>" +
        "B) <span class='tile wan'>六万</span>（场上出0张）<br>" +
        "C) <span class='tile tong'>四筒</span>（场上出0张）",
      options: [
        "A. 打七条 — 上家一直在打条子，条子应该安全",
        "B. 打六万 — 生张但不是上家做的花色",
        "C. 打四筒 — 生张但不是上家做的花色",
        "D. A最安全，因为上家不要条子"
      ],
      correct: 0,
      explanation:
        "<strong>正确答案：A. 打七条</strong><br><br>" +
        "分析：<br>" +
        "• 上家一直在甩条子 → 他的手牌里<strong>没有条子搭子</strong>，条子对他是安全的<br>" +
        "• 上家没打过万子和筒子 → 他可能在做万子或筒子的<strong>清一色/混一色</strong><br>" +
        "• 碰了「发」→ 混一色的可能性更大<br>" +
        "• B和C虽然不是他在收集的花色（如果我们能确定的话），但万子和筒子的生张中间张对<strong>其他两家</strong>仍然危险<br>" +
        "• 七条虽然只出了1张，但上家大量打条子说明<strong>条子整体在这局是相对安全的花色</strong><br>" +
        "• <strong>读牌关键</strong>：一个人大量打出某花色 = 他不做这个花色 = 这个花色对他安全"
    },
    {
      title: "场景七：杠牌后的危险",
      scenario:
        "第8轮（中期）。你有一副暗杠在手（四张 <span class='tile tong'>七筒</span>），正在考虑是否开杠。<br>" +
        "场上情况：<br>" +
        "• 下家已碰了2副牌，手牌只剩7张<br>" +
        "• 开杠后你需要从牌墙补一张牌再打一张出去<br>" +
        "你该开杠吗？",
      options: [
        "A. 开杠 — 杠了能多算番，划算",
        "B. 不开杠 — 下家手牌少可能快听了，开杠后要多出一张牌增加风险",
        "C. 开杠 — 暗杠别人看不到",
        "D. 看牌面决定"
      ],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 暂不开杠</strong><br><br>" +
        "分析：<br>" +
        "• 杠的好处：增加番数，多摸一张牌<br>" +
        "• 杠的风险：<strong>补牌后必须打出一张</strong>，如果补到危险牌你就被迫出牌<br>" +
        "• 下家已碰2副（4张副露），手牌仅7张，很可能已经或即将听牌<br>" +
        "• 中期杠牌后被迫打出危险牌的「杠后点炮」是新手常见的高损失场景<br>" +
        "• <strong>原则</strong>：当有对手明显接近听牌时，除非你也已经听牌且杠不影响牌面安全，否则暂缓开杠<br>" +
        "• 补充：「杠上炮」在上海敲麻中是有额外惩罚的，亏上加亏"
    },
    {
      title: "场景八：听牌家数与攻防",
      scenario:
        "第9轮（中期）。你手牌还差2张才能听牌。<br>" +
        "观察场面：<br>" +
        "• 下家已碰了3副牌，手牌仅剩4张，几乎肯定已听牌<br>" +
        "• 对面也碰了2副牌，手牌仅剩7张，大概率接近听牌<br>" +
        "• 上家没有副露，牌河花色均匀，应该还没听<br>" +
        "你摸到一张 <span class='tile wan'>五万</span>（场上0张，生张中间张），你该怎么办？",
      options: [
        "A. 打五万 — 我也要向听牌推进，不能白白浪费",
        "B. 留着五万，打出手里的安全牌 — 两家疑似听牌，我离听牌还远，该防守了",
        "C. 打五万 — 才第9轮中期，没必要这么早防守",
        "D. 打五万给下家碰 — 反正他已经碰了3副了"
      ],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 转入防守模式，打安全牌</strong><br><br>" +
        "分析：<br>" +
        "• 虽然只是第9轮（按轮数是中期），但场上<strong>两家疑似听牌</strong>，实际已进入「后期危险态势」<br>" +
        "• 你差2张才能听牌，即使推进也很难赶上，且每一步都在冒险<br>" +
        "• 五万是<strong>生张中间张</strong>，在两家听牌的情况下，放炮概率可能高达 <strong>30~50%</strong><br>" +
        "• 根据「听牌家数×攻防策略」：两家听牌 + 你差2张 = <strong>偏向防守</strong><br>" +
        "• <strong>关键认知</strong>：判断进攻还是防守，不能只看轮数！要看场上有多少家接近听牌。两家听牌就已经很危险了<br>" +
        "• 口诀：「两家听了要提防」—— 这时候保不赔比追胡牌重要得多"
    },
    {
      title: "场景九：安全牌优先级",
      scenario:
        "第16轮（后期）。你确定自己无法胡牌，进入纯防守模式。<br>" +
        "手里有以下几张牌可以打：<br>" +
        "A) <span class='tile feng'>南风</span> — 场上出了4张（绝张）<br>" +
        "B) <span class='tile tiao'>三条</span> — 对面上一手刚打出<br>" +
        "C) <span class='tile tong'>一筒</span> — 场上出了3张<br>" +
        "D) <span class='tile wan'>九万</span> — 场上出了2张",
      options: [
        "A. 南风 — 4张全出，绝对安全",
        "B. 三条 — 跟打",
        "C. 一筒 — 出了3张",
        "D. 九万 — 出了2张，幺九"
      ],
      correct: 0,
      explanation:
        "<strong>正确答案：A. 南风（绝张）</strong><br><br>" +
        "分析：<br>" +
        "• 安全牌优先级从高到低：<br>" +
        "  1. <strong>绝张</strong>（已出4张）= 0%风险 ← 最优先<br>" +
        "  2. <strong>跟打</strong>（刚被打出的同牌）= 约3~8%风险<br>" +
        "  3. <strong>已出3张</strong> = 约2~5%风险<br>" +
        "  4. <strong>已出2张的幺九</strong> = 约8~15%风险<br>" +
        "• 虽然B和C也比较安全，但在纯防守模式下，永远<strong>先打最安全的</strong><br>" +
        "• 把安全度高的牌留到更后面用，万一后面摸到更危险的牌，有退路<br>" +
        "• <strong>策略</strong>：不要一次把安全牌都打光，每轮只打最安全的那一张，保留安全牌库存"
    }
  ];

  /* ===================== Quiz Logic ===================== */
  let currentQuiz = 0;
  let answeredCount = 0;
  let correctCount = 0;
  const shuffled = shuffleArray([...Array(quizzes.length).keys()]);

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function renderQuiz() {
    const area = document.getElementById("practice-area");
    if (currentQuiz >= shuffled.length) {
      area.innerHTML = `
        <div class="card" style="text-align:center;">
          <h2>全部练习完成！</h2>
          <p>你的成绩：${correctCount} / ${answeredCount}</p>
          <p style="color:var(--text-dim);margin-top:1rem;">
            ${correctCount === answeredCount ? "满分！你已经掌握了防炮精髓！" :
              correctCount >= answeredCount * 0.7 ? "不错！再多复习几次概率表就更稳了。" :
              "还需要多练习，建议回顾「阶段策略」和「概率速查表」。"}
          </p>
        </div>`;
      document.getElementById("next-quiz").style.display = "none";
      return;
    }

    const q = quizzes[shuffled[currentQuiz]];
    area.innerHTML = `
      <div class="quiz-card">
        <h3>${q.title}</h3>
        <div class="quiz-scenario">${q.scenario}</div>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `<div class="quiz-option" data-index="${i}">${opt}</div>`).join("")}
        </div>
        <div class="quiz-explanation" id="quiz-explain">${q.explanation}</div>
      </div>`;

    let answered = false;
    area.querySelectorAll(".quiz-option").forEach(opt => {
      opt.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        answeredCount++;
        const idx = parseInt(opt.dataset.index, 10);
        const isCorrect = idx === q.correct;
        if (isCorrect) correctCount++;

        area.querySelectorAll(".quiz-option").forEach((o, i) => {
          if (i === q.correct) o.classList.add("correct");
          if (i === idx && !isCorrect) { o.classList.add("wrong", "selected"); }
        });
        document.getElementById("quiz-explain").classList.add("show");
        document.getElementById("answered").textContent = answeredCount;
        document.getElementById("correct").textContent = correctCount;
      });
    });
  }

  document.getElementById("next-quiz").addEventListener("click", () => {
    currentQuiz++;
    renderQuiz();
    document.getElementById("practice-area").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  renderQuiz();

  /* ===================== Table Column Highlight ===================== */
  const hoverTable = document.getElementById("combined-table");
  if (hoverTable) {
    const cols = hoverTable.querySelectorAll("col");
    const ths = hoverTable.querySelectorAll("thead th");

    function clearHighlight() {
      cols.forEach(c => c.classList.remove("col-highlight"));
      ths.forEach(t => t.classList.remove("col-highlight"));
    }

    hoverTable.querySelectorAll("td, th").forEach(cell => {
      cell.addEventListener("mouseenter", () => {
        clearHighlight();
        const idx = Array.from(cell.parentNode.children).indexOf(cell);
        if (idx > 0 && cols[idx]) {
          cols[idx].classList.add("col-highlight");
          ths[idx].classList.add("col-highlight");
        }
      });
    });

    hoverTable.addEventListener("mouseleave", clearHighlight);
  }
});
