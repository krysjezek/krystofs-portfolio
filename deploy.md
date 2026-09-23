# Publishing

Project: krystofs-portfolio. Canonical site: https://www.krystofjezek.com.
Repository: https://github.com/krysjezek/krystofs-portfolio.
The rebuild lives on rebuild/portfolio-2027 until explicitly approved for merging.

Only push or deploy when requested. From the repository root, first run:

```powershell
npm.cmd run lint
npm.cmd run build
node scripts/verify-portfolio.mjs
git diff --check
git status --short --branch
```

Verify the affected pages at desktop and mobile sizes. Commit the intended files.
If deployment is requested and this checkout is not linked:

```powershell
vercel.cmd link --project krystofs-portfolio --yes
```

Then deploy and inspect the returned URL:

```powershell
vercel.cmd deploy --prod --yes
vercel.cmd inspect <deployment-url>
```

Verify the affected pages at the returned deployment URL. Keep .vercel/ and .env* ignored. Do not infer authorization to push or merge from authorization to deploy.
