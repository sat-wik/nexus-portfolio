# Nexus Portfolio

A modern, interactive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features smooth animations, responsive design, and an engaging user experience.

## 🚀 Features

- **Interactive UI Components**
  - Floating navigation bar
  - Custom scrollbar
  - Interactive cursor
  - Particle text effects
  - Smooth transitions and animations

- **Project Showcase**
  - Dynamic accordion-style project display
  - Technology-specific icons
  - Responsive grid layout
  - Image optimization

- **Skills Section**
  - Interactive technology grid
  - Dynamic spotlight effects
  - Detailed tooltips with experience levels
  - Smooth scroll transitions

- **Modern Tech Stack**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - React Icons

## 🛠️ Technologies Used

- **Frontend Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/sat-wik/nexus-portfolio.git
```

2. Navigate to the project directory
```bash
cd nexus-portfolio
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
nexus-portfolio/
├── public/
│   ├── fonts/
│   └── projects/
├── src/
│   └── app/
│       ├── components/
│       │   ├── AccordionProjects/
│       │   ├── FloatingNav/
│       │   ├── InteractiveCursor/
│       │   └── TransitionSection/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Customization

### Projects
Edit the projects array in `src/app/page.tsx` to add or modify your projects:

```typescript
const projects = [
  {
    title: 'Project Name',
    description: 'Project description',
    image: '/projects/project-image.avif',
    technologies: ['Tech1', 'Tech2'],
    link: 'https://github.com/username/project'
  }
];
```

### Skills
Modify the skills section in `src/app/components/TransitionSection/index.tsx` to update your technology stack.

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1920px and above)
- Laptop (1366px to 1919px)
- Tablet (768px to 1365px)
- Mobile (below 768px)

## 🚀 Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sat-wik/nexus-portfolio/issues).

## 👤 Author

**Satwik Pattanaik**
- GitHub: [@sat-wik](https://github.com/sat-wik)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
