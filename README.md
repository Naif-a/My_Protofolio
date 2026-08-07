# Naif Alenazi Portfolio

Interactive portfolio built with React, TypeScript, and Vite. It includes a responsive developer-themed interface, animated neural network, project certificates, and contact links.

## Run locally

Requirements: Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Deploy free with GitHub Pages

1. Create a new empty GitHub repository, for example `portfolio`.
2. Upload all files from this project to the repository.
3. Make sure the default branch is named `main`.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **GitHub Actions** as the source.
6. Open the **Actions** tab and wait for **Deploy portfolio to GitHub Pages** to finish.
7. Your free public URL will appear in the completed deployment.

Future updates deploy automatically whenever you push to `main`.

## Upload using Git

```bash
git init
git add .
git commit -m "Add portfolio"
git branch -M main
git remote add origin https://github.com/Naif-a/YOUR-REPOSITORY-NAME.git
git push -u origin main
```

Then enable **GitHub Actions** under **Settings → Pages** as described above.

## Customize

- Main content: `src/App.tsx`
- Visual styles: `src/index.css`
- Neural animation: `src/NetworkCanvas.tsx`
- Certificates: `public/certificates/`
