# 🎂 Happy Birthday Priya E — Birthday Website

A beautiful mobile-friendly birthday surprise website with RCB theme (Red, Gold, Black), pink & white colors, photo memories, Tamil wishes, Kadhaippoma song, and an animated cricket birthday wish.

## ✨ Features

- **Live clock** and **countdown** to June 22 (21st birthday)
- **Tamil quote**: எப்ப சொல்லப் போகிறாய் நீ சொல்லும் வார்த்தையில் இருக்கும் தமிழ் கூட ஏங்குகிறது அந்த வார்த்தைக்காக
- **"She is my princess"** message
- **4 interactive buttons**: Wishes, Memories, Special Wish, Celebrate
- **Photo gallery** with your Priya photos + memory cards
- **Animated cricket player** (RCB style) with birthday wish text
- **Kadhaippoma** song player (Oh My Kadavule)
- **Confetti, fireworks, heart rain, birthday cake** effects
- **100% mobile responsive**

## 🎵 Add the Song (Important!)

1. Download **Kadhaippoma** from the movie *Oh My Kadavule*
2. Save the MP3 file as: `audio/kadhaippoma.mp3`
3. The music button (🎵 top-right) will play it

## 🚀 Deploy Online (Free) — Get Your Link

### Option 1: Netlify Drop (Easiest — 2 minutes)

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `bd` folder onto the page
3. You get a link like `https://random-name.netlify.app`
4. Share that link on Instagram / YouTube / WhatsApp!

### Option 2: GitHub Pages

```bash
cd C:\Users\welcome\Desktop\bd
git init
git add .
git commit -m "Birthday website for Priya E"
git branch -M main
# Create a repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/priya-birthday.git
git push -u origin main
```

Then in GitHub repo → **Settings** → **Pages** → Source: `main` branch → Save.

Your link: `https://YOUR_USERNAME.github.io/priya-birthday/`

### Automated script (Windows PowerShell)

I included `deploy.ps1` to simplify publishing. It will try to use the GitHub CLI (`gh`) to create the repo and push. Steps:

1. Install Git and GitHub CLI (`gh`) and login: `gh auth login`.
2. Open PowerShell in the `bd` folder and run:

```powershell
.\deploy.ps1 -RepoName "priya-birthday" -Public
```

If you don't have `gh`, the script prints the exact `git` commands to run manually.

### Option 3: Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up → New Project → Import the folder
3. Deploy → get instant link

## 📱 How to Use

1. Open the link on phone or computer
2. Tap **"Open Your Surprise"**
3. Use the 4 buttons:
   - **💌 Wishes** — Birthday messages in English & Tamil
   - **📸 Memories** — Tap photos to enlarge
   - **🏏 Special Wish** — Tap "Play Birthday Wish" for animated RCB-style message
   - **🎉 Celebrate!** — Confetti, fireworks, hearts, cake

## 🎨 Colors Used

| Color | Meaning |
|-------|---------|
| 🔴 Red `#EC1C24` | RCB Red |
| 🟡 Gold `#D4AF37` | RCB Gold |
| ⚫ Black | RCB Black |
| 🩷 Pink | Princess theme |
| ⚪ White | Clean & elegant |

## 📁 Project Structure

```
bd/
├── index.html          # Main website
├── css/style.css       # All styling
├── js/app.js           # Animations & interactions
├── assets/
│   ├── priya-shine.png # Your chibi collage photo
│   └── priya-dreams.png # Your dreams quote photo
├── audio/
│   └── kadhaippoma.mp3 # ADD THIS — Tamil song
└── README.md
```

## ⚠️ Note on Virat Kohli Video

This website includes an **animated RCB-style cricket tribute** with birthday wishes for Priya E. It uses custom SVG animation (not AI-generated video of a real person). For a realistic AI video, you can use tools like HeyGen or D-ID separately and embed the video link.

---

Made with 💕 for **Priya E** · June 22 · 21st Birthday 🎂
