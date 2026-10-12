# Before You Say “I Do”

An interactive visual novel and web story with dynamic procedural SVG art, Web Audio sound design, and branching choices.

## Project Structure

```
.
├── index.html                  # Main entry point for GitHub Pages
├── .nojekyll                   # Bypasses Jekyll processing on GitHub Pages
├── css/
│   ├── style.css               # Core UI styling, layouts, dialogs, typography
│   └── visual-upgrade.css      # Visual upgrade layer: camera effects, overlays, responsive stages
├── js/
│   ├── game.js                 # Core game engine: story chapters, choices, endings, sound synthesis
│   └── visual-upgrade.js       # Visual upgrade engine: procedural SVG backgrounds, emotes, audio player
├── stop-the-wedding.mp3        # Background soundtrack ("Stop the Wedding")
├── auko na.mp4                 # Original audio file backup
└── is ms word fine...docx      # Original source document
```

## Running Locally

To run locally using Python:
```bash
python -m http.server 8080
```
Then visit `http://localhost:8080` in your web browser.

Alternatively, using Node:
```bash
npx serve .
```

## Deploying to GitHub Pages

1. **Initialize Git and Commit**:
   ```bash
   git init
   git add .
   git commit -m "feat: setup project structure for GitHub Pages"
   ```

2. **Connect to your GitHub Repository**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Navigate to **Settings** > **Pages** (under Code and automation).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`, then click **Save**.
   - Your site will be live at `https://<your-username>.github.io/<your-repo-name>/`.
