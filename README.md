# 🗣️ Anonymous Feedback

A modern and interactive anonymous feedback collection system built with **Next.js 15**, **Framer Motion**, and **Tailwind CSS**. This project allows users to submit feedback anonymously, and displays them beautifully in the form of animated floating bubbles.

## 🌟 Features

- 🎈 Real-time floating feedback bubbles with animations
- ✨ Smooth pop-up modal for detailed feedback view
- 📱 Responsive design (mobile & desktop)
- 💬 Event-driven feedback injection (with custom events)
- 🎨 Vibrant bubble colors for better UX
- 🧠 Clean architecture using functional React components

## 🚀 Tech Stack

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Type Safety:** TypeScript
- **Custom Hooks:** `useMediaQuery` for responsive behavior

## 🛠️ Installation & Running

1. **Clone the repo**
   ```bash
   git clone https://github.com/Ironspidy2506/Anonymous-Feedback.git
   cd Anonymous-Feedback
2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the dev server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Usage

To trigger a new feedback bubble:

```ts
const newFeedback = {
    id: Date.now().toString(),
    message: feedbackText,
    createdAt: new Date().toISOString(),
}

const event = new CustomEvent("newFeedback", {
    detail: {
        feedback: newFeedback,
        position,
  },
})
window.dispatchEvent(event)
```

## 📂 Folder Structure

```
components/
  ├── feedback-bubbles.tsx
  ├── feedback-bubbles-container.tsx
hooks/
  └── use-media-query.ts
lib/
  └── types.ts
public/
  └── favicon, images, etc.
```

---

Made with 💙 by [Ironspidy2506](https://github.com/Ironspidy2506)

