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
      buildSidebar();
    });
  });

  /* ===================== Quiz Data ===================== */
  const quizzes = [
    {
      title: "场景一：对手已敲，后期防守",
      scenario:
        "现在是第15轮（后期）。对面碰了 <span class='tile wan'>二万</span> 和 <span class='tile wan'>五万</span>，<strong>已经敲了</strong>。" +
        "他敲后刚摸切了 <span class='tile tiao'>九条</span>。<br>" +
        "你没敲，手里需要出一张牌，可选：<br>" +
        "A) <span class='tile wan'>四万</span>（场上没出现过）<br>" +
        "B) <span class='tile tiao'>九条</span>（敲家刚摸切的）<br>" +
        "C) <span class='tile tong'>五筒</span>（场上出过1张）<br>" +
        "D) <span class='tile wan'>八万</span>（场上出过2张）",
      options: [
        "A. 打四万 — 想着拆搭子",
        "B. 打九条 — 跟打敲家刚摸切的牌",
        "C. 打五筒 — 中间张，但不是万子",
        "D. 打八万 — 已出2张感觉安全"
      ],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 跟打九条</strong><br><br>" +
        "分析：<br>" +
        "• 对面碰了两副万子<strong>并且已敲</strong>，100%确定在等牌，极可能做<strong>清一色</strong>或<strong>混一色</strong><br>" +
        "• A选项四万是万子中间张生张，对做万子的敲家来说简直是送牌，放炮概率极高<br>" +
        "• D选项八万虽然出了2张，但对方做万子，仍可能在等<br>" +
        "• C选项五筒虽不是万子，但中间张生张对<strong>其他未敲的人</strong>仍有风险<br>" +
        "• B选项跟打敲家摸切的九条最安全：敲家手牌锁定摸啥打啥，他摸到九条没胡说明九条不是他要的牌，放炮概率极低<br>" +
        "• <strong>关键</strong>：敲家敲后打出的牌 = 他不需要的牌 = 跟打的最佳来源"
    },
    {
      title: "场景二：下家快敲了，中期选择",
      scenario:
        "第9轮（中期）。下家已碰了 <span class='tile tong'>三筒</span> 和 <span class='tile tong'>七筒</span>，牌河里筒子很少，还没敲但手牌已经不多了。<br>" +
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
        "• 下家碰了两副筒子，牌河筒子少 → 极可能做筒子清一色，随时可能敲<br>" +
        "• A选项六筒是筒子中间张生张，对做清一色的下家来说简直是<strong>送牌</strong>——如果他正好因此听牌敲了，你更危险<br>" +
        "• D选项九筒虽是幺九，但仍是筒子花色，清一色也会用到<br>" +
        "• C选项二条虽然不是筒子，但只出了1张，仍有一定风险<br>" +
        "• B选项北风已出2张，字牌没有顺子连接，对手做清一色也用不上，风险最低（约 <strong>5~10%</strong>）<br>" +
        "• <strong>提醒</strong>：即使对手还没敲，碰了两副同花色就已经是强烈信号，要提前防守"
    },
    {
      title: "场景三：前期整理",
      scenario:
        "第3轮（前期）。没有人碰牌吃牌，更没有人敲，牌局刚开始。<br>" +
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
        "• 前期没人敲，相对安全，是整理手牌的好时机<br>" +
        "• 整理优先级：<strong>孤张字牌 > 孤张幺九 > 孤张边张 > 中间张</strong><br>" +
        "• 字牌只能做刻子（碰/杠），连接性最差（危险指数20%），前期打出最安全<br>" +
        "• 五万是中间张，连接性最强，即使现在是孤张也有很大概率后续摸到搭配，应该<strong>留下</strong><br>" +
        "• 一条和九筒是幺九牌，连接性较差，但比字牌稍好，可以在字牌打完后出<br>" +
        "• 前期口诀：<strong>「字幺九，大胆甩；中间张，留下来」</strong>"
    },
    {
      title: "场景四：要不要敲？",
      scenario:
        "第12轮（中期偏后）。你差一张就能听牌，听 <span class='tile wan'>三万</span> 或 <span class='tile wan'>六万</span>（两头听）。<br>" +
        "场上情况：<br>" +
        "• 三万场上出了0张，六万场上出了1张<br>" +
        "• 目前没有人敲<br>" +
        "• 你的手牌没有副露（门清状态）<br>" +
        "你该敲吗？",
      options: [
        "A. 果断敲 — 两头听面宽，门清加番，赶紧敲",
        "B. 不敲 — 敲了手牌锁定，太危险",
        "C. 再等等看 — 等别人先敲了再说",
        "D. 不敲，直接拆搭子防守"
      ],
      correct: 0,
      explanation:
        "<strong>正确答案：A. 果断敲</strong><br><br>" +
        "分析：<br>" +
        "• 两头听（听三万和六万）是较宽的听牌面，胡牌机会大<br>" +
        "• 三万0张出、六万只出了1张，说明场上剩余的三万和六万还很多，胡牌概率高<br>" +
        "• 你是<strong>门清</strong>状态，敲了胡牌可以加番，价值很高<br>" +
        "• 目前没有人敲，说明竞争压力小，你有先手优势<br>" +
        "• <strong>记住</strong>：不敲就永远不能胡！上海敲麻的规则是必须敲了才能胡，犹豫不敲等于放弃了胡牌的权利<br>" +
        "• 敲的最佳时机就是：听牌面宽 + 剩余张数多 + 竞争少"
    },
    {
      title: "场景五：该不该敲？（困难局面）",
      scenario:
        "第14轮（后期）。你听 <span class='tile wan'>三万</span>（单骑），但场上三万已出了2张。<br>" +
        "场上情况：<br>" +
        "• 下家已经敲了（碰了两副条子）<br>" +
        "• 对面也碰了2副牌，看起来快敲了<br>" +
        "你该敲吗？",
      options: [
        "A. 敲 — 不敲就不能胡，赌一把",
        "B. 不敲 — 听口太窄，敲了手牌锁定反而可能给别人送炮",
        "C. 敲 — 后期了必须抓紧",
        "D. 看下一轮摸什么再决定"
      ],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 不敲，保持防守灵活性</strong><br><br>" +
        "分析：<br>" +
        "• 你听的三万已出2张，最多只剩1张在牌墙或别人手里，胡牌概率很低<br>" +
        "• 下家<strong>已经敲了</strong>，对面也快敲了 → 场上至少1~2家在等牌<br>" +
        "• 如果你敲了，手牌锁定摸啥打啥 → 你摸到的牌很可能是敲家需要的危险牌，被迫打出去就是送炮<br>" +
        "• 不敲的话你保留了<strong>防守灵活性</strong>：可以选择打安全牌、拆搭子、避开敲家的花色<br>" +
        "• <strong>核心权衡</strong>：敲牌的收益（极低的胡牌概率）vs 代价（丧失防守能力，可能送炮）<br>" +
        "• 后期多家敲了 + 你听口极窄 = <strong>不敲，守住不赔就是赢</strong>"
    },
    {
      title: "场景六：读牌推理",
      scenario:
        "第10轮。上家从第1轮开始就一直在打条子（已打出 1条、3条、6条、8条），<br>" +
        "但他一张万子和筒子都没有打过。他碰了一副 <span class='tile feng'>发</span>，<strong>刚刚宣布敲了</strong>。<br>" +
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
        "• 上家<strong>已经敲了</strong>，100%确定在等牌。现在要做的是推断他听什么<br>" +
        "• 上家一直在甩条子 → 他的手牌里<strong>没有条子搭子</strong>，条子对他是安全的<br>" +
        "• 上家没打过万子和筒子 → 他在做万子或筒子的<strong>混一色</strong>（碰了发，不可能是清一色）<br>" +
        "• B和C都是敲家可能在做的花色的<strong>生张中间张</strong>，极危险！<br>" +
        "• 七条虽然只出了1张，但上家大量打条子说明<strong>条子整体对他安全</strong>。他听的绝不可能是条子<br>" +
        "• <strong>读牌关键</strong>：敲家大量打出某花色 = 他不做这个花色 = 这个花色对他安全"
    },
    {
      title: "场景七：有人敲了，还要杠吗？",
      scenario:
        "第8轮（中期）。你有一副暗杠在手（四张 <span class='tile tong'>七筒</span>），正在考虑是否开杠。<br>" +
        "场上情况：<br>" +
        "• 下家碰了2副牌，手牌只剩7张，<strong>还没有敲</strong>但看起来很快了<br>" +
        "• 开杠后你需要从牌墙补一张牌再打一张出去<br>" +
        "你该开杠吗？",
      options: [
        "A. 开杠 — 杠了能多算番，划算",
        "B. 不开杠 — 下家可能马上敲，开杠后补牌可能摸到危险牌",
        "C. 开杠 — 暗杠别人看不到",
        "D. 看牌面决定"
      ],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 暂不开杠</strong><br><br>" +
        "分析：<br>" +
        "• 杠的好处：增加番数，多摸一张牌<br>" +
        "• 杠的风险：<strong>补牌后必须打出一张</strong>，如果补到危险牌你就被迫出牌<br>" +
        "• 下家碰了2副，手牌只剩7张，很可能马上敲。一旦他敲了，你杠后补到的牌就可能是他等的<br>" +
        "• 如果下家在你杠完之后敲了，你多打出的那张牌就增加了一次放炮风险<br>" +
        "• <strong>原则</strong>：当有对手接近敲牌或已经敲了时，除非你自己也马上要敲且杠不影响安全，否则暂缓开杠<br>" +
        "• 特别提醒：如果你已经敲了，杠后补牌打出的那张是<strong>摸啥打啥</strong>，完全无法选择，风险更大"
    },
    {
      title: "场景八：已敲家数与攻防",
      scenario:
        "第9轮（中期）。你手牌还差2张才能听牌（敲）。<br>" +
        "观察场面：<br>" +
        "• 下家已碰了3副牌，手牌仅剩4张，<strong>已经敲了</strong><br>" +
        "• 对面也碰了2副牌，手牌仅剩7张，<strong>还没敲</strong>但看起来接近<br>" +
        "• 上家没有副露，牌河花色均匀，应该离敲还远<br>" +
        "你摸到一张 <span class='tile wan'>五万</span>（场上0张，生张中间张），你该怎么办？",
      options: [
        "A. 打五万 — 我也要向敲牌推进，不能白白浪费",
        "B. 留着五万，打出手里的安全牌 — 有人已敲，我离敲还远，该防守了",
        "C. 打五万 — 才第9轮中期，没必要这么早防守",
        "D. 打五万给下家碰 — 反正他已经碰了3副了"
      ],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 转入防守模式，打安全牌</strong><br><br>" +
        "分析：<br>" +
        "• 虽然只是第9轮（按轮数是中期），但下家<strong>已经敲了</strong>，这是100%确定的危险信号！<br>" +
        "• 对面也接近敲牌 → 场面实际已进入「高度危险态势」<br>" +
        "• 你差2张才能听牌敲牌，即使推进也很难赶上，且每一步都在给敲家送炮的风险<br>" +
        "• 五万是<strong>生张中间张</strong>，在有人已敲的情况下，放炮概率可能高达 <strong>30~50%</strong><br>" +
        "• 根据「已敲家数×攻防策略」：1家已敲 + 你差2张 = <strong>偏向防守</strong><br>" +
        "• <strong>关键</strong>：上海敲麻中有人敲了就是明确的危险信号，不用猜！该防守就防守<br>" +
        "• 口诀：「一家敲了心不慌，两家敲了要提防」"
    },
    {
      title: "场景九：安全牌优先级",
      scenario:
        "第16轮（后期）。下家和对面都<strong>已经敲了</strong>。你没有敲，进入纯防守模式。<br>" +
        "下家（敲家）刚摸切了 <span class='tile tiao'>三条</span>。<br>" +
        "手里有以下几张牌可以打：<br>" +
        "A) <span class='tile feng'>南风</span> — 场上出了4张（绝张）<br>" +
        "B) <span class='tile tiao'>三条</span> — 敲家刚摸切的<br>" +
        "C) <span class='tile tong'>一筒</span> — 场上出了3张<br>" +
        "D) <span class='tile wan'>九万</span> — 场上出了2张",
      options: [
        "A. 南风 — 4张全出，绝对安全",
        "B. 三条 — 跟打敲家摸切的",
        "C. 一筒 — 出了3张",
        "D. 九万 — 出了2张，幺九"
      ],
      correct: 0,
      explanation:
        "<strong>正确答案：A. 南风（绝张）</strong><br><br>" +
        "分析：<br>" +
        "• 两家都敲了，你是纯防守模式。安全牌优先级从高到低：<br>" +
        "  1. <strong>绝张</strong>（已出4张）= 0%风险 ← 最优先<br>" +
        "  2. <strong>敲家摸切的牌</strong>（敲后摸啥打啥打出的）= 极低风险，对该敲家安全<br>" +
        "  3. <strong>已出3张</strong> = 约2~5%风险<br>" +
        "  4. <strong>已出2张的幺九</strong> = 约8~15%风险<br>" +
        "• B选项三条虽然对下家安全（他摸切的），但<strong>对面也敲了</strong>，三条对对面不一定安全！<br>" +
        "• 多家敲了时，绝张是唯一<strong>对所有人都安全</strong>的牌<br>" +
        "• <strong>策略</strong>：不要一次把安全牌都打光，每轮只打最安全的那一张，保留安全牌库存<br>" +
        "• <strong>注意</strong>：跟打敲家摸切的牌只对<strong>那个敲家</strong>安全，多家敲时要综合考虑"
    },
    {
      title: "场景十：敲家摸切的牌怎么用？",
      scenario:
        "第13轮（后期）。对面已敲（碰了两副万子，做万子清一色或混一色）。<br>" +
        "对面敲后连续摸切了 <span class='tile tiao'>四条</span> 和 <span class='tile tong'>八筒</span>。<br>" +
        "你手里正好有 <span class='tile tiao'>四条</span> 和 <span class='tile wan'>五万</span>。<br>" +
        "你该打哪张？",
      options: [
        "A. 打五万 — 虽然是万子但我也用不上",
        "B. 打四条 — 敲家刚摸切了四条，安全",
        "C. 两张都差不多，随便出",
        "D. 都不打，拆别的搭子"
      ],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 打四条</strong><br><br>" +
        "分析：<br>" +
        "• 对面做万子清一色/混一色并且已敲 → 万子是他的<strong>目标花色</strong><br>" +
        "• 五万是万子中间张 → 对敲家来说是<strong>极危险牌</strong>！他很可能正在等万子的某张<br>" +
        "• 四条是敲家敲后<strong>摸切出来的</strong> → 敲后手牌锁定摸啥打啥，他摸到四条打出去了说明四条不是他胡的牌<br>" +
        "• 跟打敲家摸切的牌，对该敲家来说是安全的<br>" +
        "• <strong>核心技巧</strong>：善用敲家摸切的牌作为安全牌来源。敲家打出什么，你跟什么，这是上海敲麻防守的重要手段"
    },
    {
      title: "场景十一：做牌方向选择",
      scenario:
        "第2轮（前期），你的起手牌花色分布：<br>" +
        "• 万子：<span class='tile wan'>二万</span> <span class='tile wan'>三万</span> <span class='tile wan'>五万</span> <span class='tile wan'>六万</span> <span class='tile wan'>七万</span> <span class='tile wan'>八万</span><br>" +
        "• 条子：<span class='tile tiao'>四条</span> <span class='tile tiao'>九条</span><br>" +
        "• 筒子：<span class='tile tong'>一筒</span> <span class='tile tong'>六筒</span><br>" +
        "• 字牌：<span class='tile feng'>东风</span> <span class='tile feng'>发</span> <span class='tile feng'>发</span><br>" +
        "你该朝什么方向做牌？",
      options: [
        "A. 做门清 — 手牌搭子多，不吃不碰",
        "B. 做混一色 — 万子6张 + 发一对，打掉条子和筒子",
        "C. 做碰碰胡 — 发是对子可以碰",
        "D. 随便打，先打字牌"
      ],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 做万子混一色</strong><br><br>" +
        "分析：<br>" +
        "• 万子有 6 张（二三五六七八），搭子非常丰富：23、56、78 都是两面搭子<br>" +
        "• 发有一对，可以碰成刻子做番<br>" +
        "• 条子和筒子只有零散的牌，不成体系，应该打掉<br>" +
        "• 做混一色的路线：打掉条子和筒子 → 保留万子 + 发 → 碰发 → 组成万子混一色<br>" +
        "• 门清虽然也可以，但混一色番数更高，且6张万子的基础很好<br>" +
        "• 碰碰胡不合适：只有一对发，其他都是顺子搭子<br>" +
        "• <strong>做牌规则</strong>：单色 5~7 张 + 字牌对子 → 优先考虑混一色"
    },
    {
      title: "场景十二：搭子取舍",
      scenario:
        "第5轮（前期），你的手牌搭子太多需要拆一个。<br>" +
        "手里的搭子有：<br>" +
        "A) <span class='tile wan'>一万</span> <span class='tile wan'>二万</span>（边张搭子，听三万）<br>" +
        "B) <span class='tile tiao'>五条</span> <span class='tile tiao'>六条</span>（两面搭子，听四条和七条）<br>" +
        "C) <span class='tile tong'>三筒</span> <span class='tile tong'>五筒</span>（嵌张搭子，听四筒）<br>" +
        "D) <span class='tile wan'>四万</span> <span class='tile wan'>四万</span>（对子）<br>" +
        "你该拆哪个搭子？",
      options: [
        "A. 拆一二万 — 边张搭子效率低",
        "B. 拆五六条 — 随便拆一个",
        "C. 拆三五筒 — 嵌张搭子效率低",
        "D. 拆四万对子 — 对子不重要"
      ],
      correct: 2,
      explanation:
        "<strong>正确答案：C. 拆三五筒（嵌张搭子）</strong><br><br>" +
        "分析：<br>" +
        "• 搭子效率排序：<strong>两面搭子 > 对子 > 边张搭子 ≥ 嵌张搭子</strong><br>" +
        "• B选项五六条是<strong>两面搭子</strong>，听四条和七条两张牌（最多8张），效率最高，绝不能拆！<br>" +
        "• D选项四万对子可以碰成刻子或做将头，保留价值较高<br>" +
        "• A选项一二万是边张，只听三万（最多4张），效率一般<br>" +
        "• C选项三五筒是嵌张，只听四筒（最多4张），而且嵌张比边张更难摸到（中间张被别人用的概率更大）<br>" +
        "• A和C都效率低，但嵌张通常比边张更差一点，优先拆嵌张<br>" +
        "• <strong>口诀</strong>：两面搭子是宝贝，嵌张边张可以废"
    },
    {
      title: "场景十三：听牌形状选择",
      scenario:
        "第10轮（中期），你只差一张就听牌了。摸到 <span class='tile tiao'>六条</span>，进张了！<br>" +
        "现在你可以选择不同的打法形成不同的听牌形状：<br>" +
        "A) 打 <span class='tile wan'>一万</span> → 听 <span class='tile tiao'>四条</span> 和 <span class='tile tiao'>七条</span>（两面听）<br>" +
        "B) 打 <span class='tile tong'>五筒</span> → 听 <span class='tile wan'>一万</span>（单骑听）<br>" +
        "你该怎么选？",
      options: [
        "A. 打一万，两面听 — 听两张牌",
        "B. 打五筒，单骑听 — 一万没出过可能好胡",
        "C. 无所谓，都是听牌",
        "D. 先不听，再调整一下"
      ],
      correct: 0,
      explanation:
        "<strong>正确答案：A. 两面听</strong><br><br>" +
        "分析：<br>" +
        "• 两面听可以胡<strong>两种牌</strong>（四条和七条），最多可以胡 8 张牌<br>" +
        "• 单骑听只能胡<strong>一种牌</strong>（一万），最多可以胡 3 张牌<br>" +
        "• 两面听的每轮胡牌概率大约是单骑的 <strong>2~3 倍</strong><br>" +
        "• 虽然一万没出过「看起来」好胡，但没出过只是说明还在牌墙或别人手里，不代表你更容易摸到<br>" +
        "• 而且敲了之后摸啥打啥，你已经无法操作了——这时候听牌面宽就是最大的优势<br>" +
        "• <strong>原则</strong>：敲牌时永远优先选择听牌面最宽的形状"
    },
    {
      title: "场景十四：中途是否换方向",
      scenario:
        "第8轮（中期）。你一开始打算做条子混一色，已经打掉了一些万子和筒子。<br>" +
        "但到现在，条子搭子一直摸不到好的，手里条子只有 4 张还不太连贯。<br>" +
        "反而摸到了好几张筒子，现在筒子有 5 张且搭子不错。<br>" +
        "场上还没有人敲。你该怎么办？",
      options: [
        "A. 坚持做条子混一色 — 已经打了那么多万子筒子了",
        "B. 转做筒子方向 — 筒子现在更好，果断换",
        "C. 随便做 — 先听了再说",
        "D. 放弃进攻转防守"
      ],
      correct: 1,
      explanation:
        "<strong>正确答案：B. 转做筒子方向</strong><br><br>" +
        "分析：<br>" +
        "• 条子只有 4 张且不连贯 → 继续做条子混一色的效率很低，可能到后期都听不了牌<br>" +
        "• 筒子有 5 张且搭子不错 → 自然成型的方向，摸牌在帮你做筒子<br>" +
        "• 虽然之前打过一些筒子，但才第 8 轮还有调整空间<br>" +
        "• 场上没人敲 → 进攻窗口仍然开放，不需要放弃<br>" +
        "• A选项「沉没成本」心理是最大的陷阱！已经打出去的牌收不回来，不要因为之前的投入而坚持错误方向<br>" +
        "• <strong>做牌原则</strong>：摸牌不配合原方向，果断换跑道。看手里现在有什么，而不是之前打了什么"
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

  /* ===================== Sidebar Navigation ===================== */
  function buildSidebar() {
    const sidebar = document.getElementById('sidebar');
    const activeTab = document.querySelector('.tab-content.active');
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

    if (headings.length === 0) {
      sidebar.innerHTML = '';
      return;
    }

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
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    updateScrollSpy();
  }

  function updateScrollSpy() {
    const links = document.querySelectorAll('.sidebar-link');
    if (links.length === 0) return;

    const navBar = document.querySelector('.tab-nav-bar');
    const offset = navBar ? navBar.offsetHeight + 30 : 80;
    const scrollPos = window.scrollY + offset;

    let activeLink = null;
    links.forEach(link => {
      const target = document.getElementById(link.dataset.target);
      if (target && target.offsetTop <= scrollPos) {
        activeLink = link;
      }
    });

    links.forEach(l => l.classList.remove('active'));
    if (activeLink) activeLink.classList.add('active');
  }

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateScrollSpy();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  buildSidebar();
});
