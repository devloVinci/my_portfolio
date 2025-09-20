# Flutter & Dart Portfolio (Static Site)

This is a simple, responsive static portfolio site meant to showcase Flutter & Dart projects.

Open `index.html` in your browser to view.

Customize:
- Edit `index.html` to change content (name, projects, links).
- Edit `styles.css` to tweak colors and layout.
- Edit `scripts.js` to update interactivity and project details.

Deploy (GitHub Pages):

1. Initialize a git repository (if you haven't already), add files, and push to GitHub:

```powershell
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/devloVinci/my_portfolio.git
git push -u origin main
```

2. The included GitHub Actions workflow will automatically deploy the repository root to GitHub Pages when you push to `main`. The action uses `peaceiris/actions-gh-pages` and writes to the `gh-pages` branch.

3. After the action completes, enable Pages in your repository settings (if needed) and set the source to the `gh-pages` branch.

Notes:
- Replace `<devloVinci>/<my_portfolio>` with your GitHub repo path.
- Alternatively, you can deploy manually by enabling GitHub Pages from the repository settings.

