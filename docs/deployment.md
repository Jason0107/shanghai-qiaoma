# 部署指南

## 线上地址

| 平台 | 地址 | 说明 |
|------|------|------|
| Cloudflare Pages | https://shanghai-qiaoma.pages.dev | 主站，国内可直接访问 |
| GitHub Pages | https://jason0107.github.io/shanghai-qiaoma/ | 备用，需要梯子 |

## 架构

```
本地改代码 → git push → GitHub Actions → 自动部署到 Cloudflare Pages
```

整个站是纯静态的（HTML + CSS + JS），无需构建步骤、无后端、无数据库。

## 日常更新

改完代码后：

```bash
git add .
git commit -m "你的改动描述"
git push
```

推送后约 30 秒自动生效，无需其他操作。

## 自动部署原理

推送到 `main` 分支时，GitHub Actions 会自动触发 `.github/workflows/deploy.yml`，将项目文件部署到 Cloudflare Pages。

所需的两个 Secret 已配置在 GitHub 仓库中（Settings → Secrets）：

- `CLOUDFLARE_API_TOKEN` — Cloudflare API 令牌
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare 账户 ID

## 手动部署（备用）

如果 GitHub Actions 出问题，可以本地手动部署：

```bash
# 需要先设置环境变量 CLOUDFLARE_API_TOKEN
npx wrangler pages deploy . --project-name shanghai-qiaoma --branch main
```

## Token 管理

- Cloudflare API Token 管理：https://dash.cloudflare.com/profile/api-tokens
- 创建 token 时选 **Edit Cloudflare Workers** 模板
- Account Resources 选你的账号，Zone Resources 选 All zones
- 如果 token 泄露，立即在上述页面删除并重新生成
- 新 token 需更新到 GitHub Secrets：`gh secret set CLOUDFLARE_API_TOKEN`

## 相关链接

- GitHub 仓库：https://github.com/Jason0107/shanghai-qiaoma
- Cloudflare Pages 控制台：https://dash.cloudflare.com → Workers & Pages
- GitHub Actions 运行记录：https://github.com/Jason0107/shanghai-qiaoma/actions
