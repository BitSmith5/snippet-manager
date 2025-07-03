# Snippet Manager

A modern, full-stack web application for managing and organizing code snippets with a beautiful, responsive interface and robust authentication system.

![Snippet Manager Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-2.50.2-green)

## 🚀 Features

### Core Functionality
- **CRUD Operations**: Create, read, update, and delete code snippets
- **Rich Dashboard**: Analytics overview with snippet statistics and recent activity
- **Search & Filter**: Find snippets quickly with language-based filtering
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Seamless theme switching with persistent preferences

### Authentication & Security
- **Multi-Provider Auth**: Email/password, Google OAuth, and Facebook OAuth
- **Protected Routes**: Middleware-based route protection with automatic redirects
- **Session Management**: Secure session handling with Supabase Auth
- **Form Validation**: Client and server-side validation using Zod schemas

### Developer Experience
- **TypeScript**: Full type safety across the entire application
- **Modern React Patterns**: Hooks, Context API, and functional components
- **Real-time Updates**: Live data synchronization with Supabase
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Smooth loading indicators and skeleton screens

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - Modern React with concurrent features
- **Next.js 14.1.0** - App Router with server-side rendering
- **TypeScript 5.0** - Full type safety and better developer experience
- **Tailwind CSS 3.4.17** - Utility-first CSS framework with dark mode support
- **Zod 3.25.67** - Schema validation and type inference

### Backend & Database
- **Supabase 2.50.2** - Backend-as-a-Service with PostgreSQL
- **Supabase Auth** - Authentication and authorization
- **PostgreSQL** - Relational database with Row Level Security (RLS)
- **Real-time Subscriptions** - Live data updates

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication routes
│   ├── dashboard/         # Main dashboard
│   ├── snippets/          # Snippet management
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── SnippetCard.tsx    # Snippet display component
│   ├── SnippetForm.tsx    # Create/edit form
│   └── SocialLogin.tsx    # OAuth login buttons
├── lib/                   # Utility libraries
│   ├── auth-context.tsx   # Authentication context
│   ├── supabase.ts        # Supabase client
│   ├── validation.ts      # Form validation utilities
│   └── theme-context.tsx  # Theme management
├── types/                 # TypeScript type definitions
│   └── snippet.ts         # Snippet and auth schemas
└── middleware.ts          # Route protection middleware
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/snippet-manager.git
   cd snippet-manager
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Key Implementation Highlights

### Authentication System
- **Context-based state management** for user authentication
- **Middleware protection** for secure routes
- **OAuth integration** with Google and Facebook
- **Automatic session refresh** and token management

### Form Validation
```typescript
// Zod schemas for type-safe validation
export const createSnippetSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  content: z.string().min(1, 'Content is required'),
  language: z.string().optional(),
});
```

### Real-time Data
- **Supabase subscriptions** for live updates
- **Optimistic UI updates** for better user experience
- **Error boundaries** for graceful error handling

### Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Dark mode support** with theme context
- **Accessible components** following WCAG guidelines

## 🎯 Performance Optimizations

- **Next.js App Router** for optimal routing and code splitting
- **Server-side rendering** for better SEO and initial load times
- **Image optimization** with Next.js Image component
- **Lazy loading** for better performance
- **Efficient state management** with React Context

## 🔒 Security Features

- **Row Level Security (RLS)** in Supabase
- **Protected API routes** with middleware
- **Input validation** with Zod schemas
- **XSS protection** with proper data sanitization
- **CSRF protection** with Supabase Auth

## 🧪 Testing Strategy

- **TypeScript** for compile-time error checking
- **ESLint** for code quality and consistency
- **Component testing** with React Testing Library (planned)
- **E2E testing** with Playwright (planned)

## 📈 Deployment

The application is designed for easy deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the excellent backend-as-a-service platform
- **Next.js team** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vercel** for seamless deployment and hosting

---

**Built with ❤️ using modern web technologies**
