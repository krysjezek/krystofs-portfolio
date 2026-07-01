# Deploy Runbook

Fast path for future agents working in this repo.

## Project

- App root: `C:\Users\kryst\Dropbox\Work\Kodeni\Portfolio Update\portfolio`
- Git branch: `master`
- Remote: `origin` (`git@github.com:krysjezek/krystofs-portfolio.git`)
- Vercel project: `krystofs-portfolio`
- Package manager: `npm` (`package-lock.json`)

## Verify

```powershell
npm.cmd run build
```

PowerShell blocks the `npm.ps1` shim on this machine, so call `npm.cmd`. Use this before pushing when code changed. For tiny content-only changes, `git diff --check` is the minimum sanity check.

## Push

```powershell
git status --short --branch
git add <changed-files>
git commit -m "<message>"
git push origin master
```

## Deploy Production

PowerShell blocks the `vercel.ps1` shim on this machine, so call the CMD shim explicitly:

```powershell
vercel.cmd deploy --prod --yes
```

If Vercel reports that the project is not linked, run this once from the app root:

```powershell
vercel.cmd link --yes
```

The repo already has `.vercel/project.json`, so linking should normally be unnecessary.

## Post-Deploy Check

```powershell
vercel.cmd inspect <deployment-url>
```

Open the production URL and verify the changed page or interaction. For this portfolio, hover/cursor changes should be checked in a desktop browser because the custom cursor is disabled on coarse pointers.
