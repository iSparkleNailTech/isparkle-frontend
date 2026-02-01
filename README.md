# iSparkle Frontend

Modern booking interface for iSparkle Day Spa - a nail salon booking application.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Authentication**: Supabase Auth
- **Routing**: React Router

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

4. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## Building for Production

```bash
npm run build
npm run preview  # Preview the production build
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_BASE_URL` | Yes | Backend API URL (e.g., `https://your-backend.railway.app/api`) |
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Yes | Supabase anon/public key |

## Deployment on Vercel

### Quick Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click **Add New → Project**
4. Import your GitHub repository
5. Vercel will auto-detect Vite configuration
6. Add environment variables:
   - `VITE_API_BASE_URL` = Your Railway backend URL
   - `VITE_SUPABASE_URL` = Your Supabase URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = Your Supabase anon key
7. Click **Deploy**

### Manual Configuration

The `vercel.json` is already configured with:
- SPA routing (all routes → `index.html`)
- Asset caching (1 year for static assets)
- Security headers (XSS protection, frame denial)

### Custom Domain

1. Go to your Vercel project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. **Important**: Update your backend's `CORS_ORIGIN` to include the new domain

## Project Structure

```
src/
├── assets/          # Static assets (images, logos)
├── components/      # React components
│   ├── admin/       # Admin dashboard components
│   ├── booking/     # Booking flow components
│   └── ui/          # shadcn/ui components
├── config/          # Environment configuration
├── data/            # Mock data & constants
├── hooks/           # Custom React hooks
├── integrations/    # External service integrations
│   ├── backend/     # API client
│   └── supabase/    # Supabase client
├── lib/             # Utility functions
├── pages/           # Page components
└── types/           # TypeScript type definitions
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
