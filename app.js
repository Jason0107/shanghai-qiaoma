document.addEventListener("DOMContentLoaded", () => {

  /* ===================== Tier Switching ===================== */
  const tierBtns = document.querySelectorAll(".tier-btn");
  const tierContents = document.querySelectorAll(".tier-content");

  tierBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tier;
      tierBtns.forEach(b => b.classList.remove("active"));
      tierContents.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tier-" + target).classList.add("active");

      const firstTab = document.querySelector("#tier-" + target + " .tab-btn");
      if (firstTab && !document.querySelector("#tier-" + target + " .tab-btn.active")) {
        firstTab.click();
      } else {
        buildSidebar();
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /* ===================== Tab Switching (within tiers) ===================== */
  document.querySelectorAll(".tab-nav").forEach(nav => {
    nav.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;
        const tier = btn.closest(".tier-content");
        tier.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        tier.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        const section = document.getElementById("tab-" + target);
        if (section) section.classList.add("active");
        buildSidebar();
      });
    });
  });

  /* ===================== Quiz Data ===================== */
  const quizzes = [
    {
      title: "场景一：对手已敲，后期防守",
      difficulty: 2,
      scenario:
        "现在是第15轮（后期）。对面碰了 <span class='tile wan'>二万</span> 和 <span class='tile wan'>五万</span>，<strong>已经敲了</strong>。" +
        "他敲后刚摸切了 <span class='tile tiao'>九条</span>。<br>" +
        "你没敲，手里需要出一张牌，可选：<br>" +
        "A) <span class='tile wan'>四万</span>（场上没出现过）<br>" +
        "B) <span class='tile tiao'>九条</span>（敲家刚摸切的）<br>" +
        "C) <span class='tile tong'>五筒</span>（场上出过1张）<br>" +
        "D) <span class='tile wan'>八万</span>（场上出过2张）",
      options: ["A. 打四万", "B. 打九条 — 跟打敲家摸切", "C. 打五筒", "D. 打八万"],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 跟打九条</strong><br><br>" +
        "对面碰了两副万子并已敲 → 极可能做清/混一色万子。<br>" +
        "• A 四万是万子中间张生张 → 极危险<br>" +
        "• B 九条是敲家摸切的 → 他不需要 = 最安全<br>" +
        "• D 八万虽出了2张，但仍是万子 → 有风险<br>" +
        "<strong>核心</strong>：敲家摸切的牌 = 最佳安全牌来源"
    },
    {
      title: "场景二：下家快敲了",
      difficulty: 2,
      scenario:
        "第9轮。下家碰了 <span class='tile tong'>三筒</span> 和 <span class='tile tong'>七筒</span>，牌河筒子很少。<br>" +
        "A) <span class='tile tong'>六筒</span>（0张）<br>B) <span class='tile feng'>北风</span>（出过2张）<br>C) <span class='tile tiao'>二条</span>（出过1张）<br>D) <span class='tile tong'>九筒</span>（出过1张）",
      options: ["A. 打六筒", "B. 打北风", "C. 打二条", "D. 打九筒"],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 打北风</strong><br><br>" +
        "下家碰两副筒子，极可能做筒子清一色。<br>" +
        "• A 六筒 = 筒子中间张生张，送牌！<br>" +
        "• B 北风已出2张 + 风牌无顺子连接 → 最安全<br>" +
        "• 即使对手还没敲，碰了两副同花色就是强烈信号"
    },
    {
      title: "场景三：前期整理",
      difficulty: 1,
      scenario:
        "第3轮，没人碰吃敲。你要清理孤张：<br>" +
        "A) <span class='tile feng'>东风</span><br>B) <span class='tile wan'>五万</span><br>C) <span class='tile tiao'>一条</span><br>D) <span class='tile tong'>九筒</span>",
      options: ["A. 先打东风", "B. 先打五万", "C. 先打一条", "D. 先打九筒"],
      correct: 0,
      explanation:
        "<strong>正确答案：A. 先打东风</strong><br><br>" +
        "整理优先级：孤张风牌 > 孤张幺九 > 中间张。<br>" +
        "• 风牌只能做刻子，连接性最差<br>" +
        "• 五万是中间张连接性最强，留下<br>" +
        "• 口诀：「风牌幺九，大胆甩；中间张，留下来」"
    },
    {
      title: "场景四：要不要敲？",
      difficulty: 1,
      scenario:
        "第12轮，你听 <span class='tile wan'>三万</span>/<span class='tile wan'>六万</span>（两头听），三万0张出、六万出1张。<br>没人敲，你门清。该敲吗？",
      options: ["A. 果断敲", "B. 不敲", "C. 再等等", "D. 拆搭子防守"],
      correct: 0,
      explanation:
        "<strong>正确答案：A. 果断敲</strong><br><br>" +
        "两头听面宽 + 剩余张多 + 没人敲 + 门清加番 → 最佳敲牌时机。<br>" +
        "<strong>记住</strong>：不敲就永远不能胡！"
    },
    {
      title: "场景五：该不该敲？（困难局面）",
      difficulty: 2,
      scenario:
        "第14轮，你听 <span class='tile wan'>三万</span>（单骑），三万已出2张。<br>下家已敲，对面也快敲。你该敲吗？",
      options: ["A. 敲", "B. 不敲 — 保持防守", "C. 敲 — 抓紧", "D. 看下轮"],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 不敲</strong><br><br>" +
        "• 三万已出2张，最多剩1张 → 胡牌概率极低<br>" +
        "• 敲后手牌锁定，摸到危险牌被迫打出 → 送炮风险高<br>" +
        "• 核心：敲的收益(极低) vs 代价(丧失防守) → 不敲"
    },
    {
      title: "场景六：读牌推理",
      difficulty: 2,
      scenario:
        "第10轮，上家一直打条子（1/3/6/8条），万子筒子没打过。碰了 <span class='tile feng'>北</span>，刚敲了。<br>" +
        "你选：A) <span class='tile tiao'>七条</span>(出1张) B) <span class='tile wan'>六万</span>(0张) C) <span class='tile tong'>四筒</span>(0张)",
      options: ["A. 打七条", "B. 打六万", "C. 打四筒", "D. A最安全"],
      correct: 0,
      explanation:
        "<strong>正确答案：A. 打七条</strong><br><br>" +
        "上家大量打条子 → 不做条子 → 条子安全。<br>" +
        "碰了北 + 没打万子筒子 → 做万/筒混一色。<br>" +
        "B和C都是敲家可能在做的花色的生张 → 极危险。"
    },
    {
      title: "场景七：有人敲了还杠吗？",
      difficulty: 2,
      scenario:
        "第8轮，你有暗杠（四张 <span class='tile tong'>七筒</span>）。下家碰了2副、手牌仅7张，还没敲但快了。该开杠吗？",
      options: ["A. 开杠 — 多算番", "B. 不开杠 — 补牌可能摸危险牌", "C. 暗杠看不到", "D. 看牌面"],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 暂不开杠</strong><br><br>" +
        "杠后必须补牌再打一张 → 如果补到危险牌被迫出。<br>" +
        "下家快敲了，杠后多出的牌增加放炮风险。<br>" +
        "原则：有对手接近敲牌时，除非你也马上要敲且杠不影响安全，否则暂缓。"
    },
    {
      title: "场景八：已敲家数与攻防",
      difficulty: 3,
      scenario:
        "第9轮，你差2张听牌。<br>下家已敲（碰3副、手牌4张），对面碰2副快敲，上家没副露。<br>你摸到 <span class='tile wan'>五万</span>（0张出、生张中间张），怎么办？",
      options: ["A. 打五万推进", "B. 留五万打安全牌", "C. 才中期不急", "D. 给下家碰"],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 转入防守</strong><br><br>" +
        "下家已敲 + 对面快敲 = 高危态势。你差2张 → 追不上。<br>" +
        "五万是生张中间张 → 放炮概率 30~50%。<br>" +
        "有人敲了就是明确信号，该防守就防守。"
    },
    {
      title: "场景九：安全牌优先级",
      difficulty: 2,
      scenario:
        "第16轮，下家和对面都已敲。你纯防守。<br>下家摸切了 <span class='tile tiao'>三条</span>。手里可打：<br>" +
        "A) <span class='tile feng'>南风</span>(出4张) B) <span class='tile tiao'>三条</span>(敲家摸切) C) <span class='tile tong'>一筒</span>(出3张) D) <span class='tile wan'>九万</span>(出2张)",
      options: ["A. 南风(绝张)", "B. 三条(跟打)", "C. 一筒(出3张)", "D. 九万(出2张)"],
      correct: 0,
      explanation:
        "<strong>正确答案：A. 南风（绝张）</strong><br><br>" +
        "安全牌优先级：绝张(0%) > 跟打摸切 > 出3张 > 出2张幺九。<br>" +
        "多家敲时，绝张是唯一对所有人都安全的牌。<br>" +
        "B只对下家安全，对面也敲了所以三条对对面不一定安全。"
    },
    {
      title: "场景十：敲家摸切怎么用",
      difficulty: 2,
      scenario:
        "第13轮，对面已敲（碰两副万子做万子清/混一色）。敲后摸切了 <span class='tile tiao'>四条</span> 和 <span class='tile tong'>八筒</span>。<br>你有 <span class='tile tiao'>四条</span> 和 <span class='tile wan'>五万</span>，打哪张？",
      options: ["A. 打五万", "B. 打四条(敲家摸切)", "C. 都差不多", "D. 都不打"],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 打四条</strong><br><br>" +
        "对面做万子 → 五万极危险。<br>" +
        "四条是敲家摸切出来的 → 他不需要 = 安全。<br>" +
        "核心：善用敲家摸切的牌作为安全牌来源。"
    },
    {
      title: "场景十一：做牌方向选择",
      difficulty: 1,
      scenario:
        "第2轮，你手牌：万子6张(23/5678)、条子2张(4/9)、筒子2张(1/6)、风牌3张(东/东/北)。做什么方向？",
      options: ["A. 做门清", "B. 做混一色", "C. 做碰碰胡", "D. 随便打"],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 做万子混一色</strong><br><br>" +
        "万子6张搭子丰富(23/56/78全是两面) + 东有一对可碰 → 混一色1番。<br>" +
        "条子筒子零散 → 打掉。<br>" +
        "规则：单色5~7张 + 风牌对子 → 优先混一色。"
    },
    {
      title: "场景十二：搭子取舍",
      difficulty: 1,
      scenario:
        "第5轮，搭子太多要拆：<br>A) <span class='tile wan'>一二万</span>(边张) B) <span class='tile tiao'>五六条</span>(两面) C) <span class='tile tong'>三五筒</span>(嵌张) D) <span class='tile wan'>四四万</span>(对子)",
      options: ["A. 拆一二万", "B. 拆五六条", "C. 拆三五筒(嵌张)", "D. 拆四万对子"],
      correct: 2,
      explanation:
        "<strong>正确答案：C. 拆嵌张搭子</strong><br><br>" +
        "搭子效率：两面搭 > 对子 > 边张 ≥ 嵌张。<br>" +
        "五六条是两面搭 → 绝不拆！<br>" +
        "口诀：「两面搭子是宝贝，嵌张边张可以废」"
    },
    {
      title: "场景十三：听牌形状选择",
      difficulty: 2,
      scenario:
        "第10轮，你可以选：<br>A) 打一万 → 听四条和七条（两面听）<br>B) 打五筒 → 听一万（单骑）",
      options: ["A. 两面听", "B. 单骑听", "C. 无所谓", "D. 先不听"],
      correct: 0,
      explanation:
        "<strong>正确答案：A. 两面听</strong><br><br>" +
        "两面听可胡8张，单骑最多3张。<br>" +
        "敲后摸啥打啥，听口宽就是最大优势。<br>" +
        "原则：永远优先选最宽的听牌形状。"
    },
    {
      title: "场景十四：中途换方向",
      difficulty: 2,
      scenario:
        "第8轮，你本来做条子混一色，但条子只有4张还不连贯。<br>反而筒子摸到5张搭子不错。没人敲。怎么办？",
      options: ["A. 坚持条子", "B. 转做筒子", "C. 随便做", "D. 转防守"],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 果断转筒子</strong><br><br>" +
        "条子4张不连贯 → 效率低。筒子5张搭子好 → 自然成型。<br>" +
        "最大的坑是「沉没成本」心理。<br>" +
        "原则：看手里现在有什么，不看之前打了什么。"
    },
    {
      title: "场景十五：多家敲的安全出牌",
      difficulty: 3,
      scenario:
        "第14轮。下家已敲做万子清一色，对面已敲做筒子混一色。<br>" +
        "A) <span class='tile wan'>五万</span>(0张) B) <span class='tile tong'>六筒</span>(0张) C) <span class='tile tiao'>四条</span>(出1张) D) <span class='tile feng'>西风</span>(出2张)",
      options: ["A. 打五万", "B. 打六筒", "C. 打四条", "D. 打西风"],
      correct: 2,
      explanation:
        "<strong>正确答案：C. 打四条</strong><br><br>" +
        "下家做万子 → A排除。对面做筒子混一色 → B排除，D风牌有风险。<br>" +
        "C 四条：两家都不做条子 → 双重安全。<br>" +
        "多家敲核心：找两家都不做的花色。"
    },
    {
      title: "场景十六：从牌河反推",
      difficulty: 3,
      scenario:
        "第12轮，上家碰了 <span class='tile tiao'>六条</span> 和 <span class='tile feng'>东</span>，刚敲了。<br>" +
        "牌河：<span class='tile wan'>一万</span><span class='tile wan'>五万</span><span class='tile wan'>九万</span><span class='tile tong'>二筒</span><span class='tile tong'>七筒</span><span class='tile feng'>北</span><span class='tile tong'>九筒</span><br>他最可能做什么？",
      options: ["A. 条子清一色", "B. 条子混一色", "C. 碰碰胡", "D. 不好判断"],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 条子混一色</strong><br><br>" +
        "碰了条子+东 → 条子和风牌。牌河大量万筒，条子一张没打。<br>" +
        "碰了风牌「东」→ 不是清一色（清一色不留风牌）。<br>" +
        "结论：条子混一色。你的条子中间张是极高危牌。"
    },
    {
      title: "场景十七：宽听 vs 高番",
      difficulty: 3,
      scenario:
        "第11轮没人敲。两种听法：<br>A) 拆北对 → 听三条/六条（两面，0番）<br>B) 拆搭子 → 听北（单骑，门清1番=×2）<br>三条出1张，六条0张，北出1张。",
      options: ["A. 选宽听", "B. 选高番", "C. 先不听", "D. 随便选"],
      correct: 0,
      explanation:
        "<strong>正确答案：A. 选宽听</strong><br><br>" +
        "A听约7张，B听约3张。概率差2倍多。<br>" +
        "敲后锁定无法调整 → 听口宽窄直接决定能否胡。<br>" +
        "原则：除非窄听番数翻3倍以上且待牌充足，否则选宽听。"
    },
    {
      title: "场景十八：计分快算",
      difficulty: 2,
      scenario:
        "你自摸了！混一色(1番)、3朵花、明杠1个(1花)、底花1花。<br>花数？基础分？总赢？",
      options: ["A. 5花，基础分10，赢30", "B. 5花，5，赢15", "C. 4花，8，赢24", "D. 6花，12，赢36"],
      correct: 0,
      explanation:
        "<strong>正确答案：A</strong><br><br>" +
        "花数 = 3+1+1 = 5花。番数 = 1番。<br>" +
        "基础分 = 5×2¹ = 10。自摸 = 10×3 = 30。"
    },
    {
      title: "场景十九：碰不碰",
      difficulty: 3,
      scenario:
        "第6轮，做万子混一色，万子6张 + <span class='tile feng'>东</span><span class='tile feng'>东</span>。门清状态。<br>有人打了东，碰不碰？",
      options: ["A. 碰 — 加花加速", "B. 不碰 — 保门清", "C. 碰 — 有就碰", "D. 看情况"],
      correct: 0,
      explanation:
        "<strong>正确答案：A. 碰东</strong><br><br>" +
        "碰东 → 刻子加花(风向碰1花)，混一色保留风牌价值大。<br>" +
        "不碰 → 东只剩1张，后面可能没人打。<br>" +
        "做混一色时风牌刻子是核心资产，碰风牌收益通常大于保门清。"
    },
    {
      title: "场景二十：差一步 vs 防守",
      difficulty: 3,
      scenario:
        "第13轮，你差1张听牌(预计两面听)。下家刚敲了(做条子清一色)。<br>你有 <span class='tile tiao'>五条</span>(生张中间张)和 <span class='tile tong'>二筒</span>(出过2张)。<br>打五条可听牌，打二筒继续等。",
      options: ["A. 打五条听牌", "B. 打二筒安全牌", "C. 五条没问题", "D. 都不打"],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 打二筒</strong><br><br>" +
        "下家做条子清一色已敲 → 五条放炮概率约30~50%。<br>" +
        "清一色2番=×4，放炮代价极大。<br>" +
        "原则：差1张但需打极危险牌时，用安全牌过渡一轮。"
    },
    {
      title: "场景二十一：全是危险牌",
      difficulty: 3,
      scenario:
        "第16轮，下家做万子已敲，对面做筒子混一色已敲。手里全危险：<br>A) <span class='tile wan'>三万</span>(0张) B) <span class='tile tong'>七筒</span>(0张) C) <span class='tile feng'>南</span>(出1张) D) <span class='tile wan'>九万</span>(出2张)",
      options: ["A. 打三万", "B. 打七筒", "C. 打南风", "D. 打九万(幺九+出2张)"],
      correct: 3,
      explanation:
        "<strong>正确答案：D. 打九万</strong><br><br>" +
        "全危险时比较相对危险度：<br>" +
        "A 40~50% / B 35~45% / C 15~25% / D 10~20%<br>" +
        "九万虽是万子但幺九利用率低 + 出了2张 → 相对最安全。"
    },
    {
      title: "场景二十二：抢杠胡",
      difficulty: 2,
      scenario:
        "第11轮，你已敲听 <span class='tile wan'>六万</span>(剩2张)。对面有六万明碰，这轮要加杠。你可以抢杠胡，该不该？",
      options: ["A. 不胡", "B. 必须胡 — 抢杠=对方付三份！", "C. 看番型", "D. 不确定能不能抢"],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 必须胡！</strong><br><br>" +
        "抢杠胡 = 被抢杠者一人付三份（等同自摸收入）。<br>" +
        "最划算的胡法之一，机会极其罕见，没有理由放弃。"
    }
  ];

  /* ===================== Per-Tier Quiz State ===================== */
  const tierQuizConfig = {
    beginner: { levels: [1], label: "入门" },
    intermediate: { levels: [2], label: "进阶" },
    master: { levels: [3], label: "大师" }
  };

  const tierQuizState = {};
  const diffLabels = ["\u2b50 入门", "\u2b50\u2b50 进阶", "\u2b50\u2b50\u2b50 高手"];
  const diffClasses = ["d-easy", "d-medium", "d-hard"];

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function initTierQuiz(tier) {
    const cfg = tierQuizConfig[tier];
    const indices = [];
    quizzes.forEach((q, i) => {
      if (cfg.levels.includes(q.difficulty)) indices.push(i);
    });
    tierQuizState[tier] = {
      indices: shuffleArray(indices),
      current: 0,
      answered: 0,
      correct: 0
    };
  }

  Object.keys(tierQuizConfig).forEach(t => initTierQuiz(t));

  function renderTierQuiz(tier) {
    const area = document.getElementById("practice-area-" + tier);
    const nextBtn = document.getElementById("next-quiz-" + tier);
    if (!area) return;

    const state = tierQuizState[tier];
    if (state.current >= state.indices.length) {
      area.innerHTML = `
        <div class="card" style="text-align:center;">
          <h2>全部完成！</h2>
          <p>成绩：${state.correct} / ${state.answered}</p>
          <p style="color:var(--text-dim);margin-top:1rem;">
            ${state.correct === state.answered ? "满分！" :
              state.correct >= state.answered * 0.8 ? "很棒！继续学习下一阶段内容。" :
              "还需努力，建议回看本阶段教学内容。"}
          </p>
          <button class="btn-primary" style="margin-top:1rem;" onclick="location.reload()">重新开始</button>
        </div>`;
      if (nextBtn) nextBtn.style.display = "none";
      return;
    }

    const qIdx = state.indices[state.current];
    const q = quizzes[qIdx];
    const diff = q.difficulty;
    const diffTag = `<span class="difficulty-tag ${diffClasses[diff-1]}">${diffLabels[diff-1]}</span>`;
    area.innerHTML = `
      <div class="quiz-card">
        <h3>${q.title} ${diffTag}</h3>
        <div class="quiz-scenario">${q.scenario}</div>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `<div class="quiz-option" data-index="${i}">${opt}</div>`).join("")}
        </div>
        <div class="quiz-explanation" id="quiz-explain-${tier}">${q.explanation}</div>
      </div>`;

    let answered = false;
    area.querySelectorAll(".quiz-option").forEach(opt => {
      opt.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        state.answered++;
        const idx = parseInt(opt.dataset.index, 10);
        const isCorrect = idx === q.correct;
        if (isCorrect) state.correct++;

        area.querySelectorAll(".quiz-option").forEach((o, i) => {
          if (i === q.correct) o.classList.add("correct");
          if (i === idx && !isCorrect) o.classList.add("wrong", "selected");
        });
        document.getElementById("quiz-explain-" + tier).classList.add("show");
        const answeredEl = document.getElementById("answered-" + tier);
        const correctEl = document.getElementById("correct-" + tier);
        if (answeredEl) answeredEl.textContent = state.answered;
        if (correctEl) correctEl.textContent = state.correct;
      });
    });
  }

  document.querySelectorAll("[id^='next-quiz-']").forEach(btn => {
    const tier = btn.id.replace("next-quiz-", "");
    btn.addEventListener("click", () => {
      tierQuizState[tier].current++;
      renderTierQuiz(tier);
      const area = document.getElementById("practice-area-" + tier);
      if (area) area.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  Object.keys(tierQuizConfig).forEach(t => renderTierQuiz(t));

  /* ===================== Table Column Highlight ===================== */
  document.querySelectorAll(".has-hover").forEach(hoverTable => {
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
  });

  /* ===================== Sidebar Navigation ===================== */
  function buildSidebar() {
    const activeTier = document.querySelector('.tier-content.active');
    if (!activeTier) return;
    const sidebar = activeTier.querySelector('.sidebar');
    const activeTab = activeTier.querySelector('.tab-content.active');
    if (!sidebar || !activeTab) return;

    const cards = activeTab.querySelectorAll('.card');
    const headings = [];
    cards.forEach((card, i) => {
      const h2 = card.querySelector(':scope > h2');
      if (h2) {
        const id = 'nav-' + activeTab.id.replace('tab-', '') + '-' + i;
        card.id = id;
        headings.push({ id, text: h2.textContent });
      }
    });

    if (headings.length === 0) { sidebar.innerHTML = ''; return; }

    let html = '<div class="sidebar-title">本页目录</div><ul class="sidebar-nav">';
    headings.forEach(h => {
      html += '<li><a class="sidebar-link" href="#' + h.id + '" data-target="' + h.id + '">' + h.text + '</a></li>';
    });
    html += '</ul>';
    sidebar.innerHTML = html;

    sidebar.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById(link.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    updateScrollSpy();
  }

  function updateScrollSpy() {
    const activeTier = document.querySelector('.tier-content.active');
    if (!activeTier) return;
    const links = activeTier.querySelectorAll('.sidebar-link');
    if (links.length === 0) return;

    const navBar = activeTier.querySelector('.tab-nav-bar');
    const offset = (navBar ? navBar.offsetHeight : 0) + 80;
    const scrollPos = window.scrollY + offset;

    let activeLink = null;
    links.forEach(link => {
      const target = document.getElementById(link.dataset.target);
      if (target && target.offsetTop <= scrollPos) activeLink = link;
    });

    links.forEach(l => l.classList.remove('active'));
    if (activeLink) activeLink.classList.add('active');
  }

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => { updateScrollSpy(); scrollTicking = false; });
      scrollTicking = true;
    }
  });

  buildSidebar();
});
