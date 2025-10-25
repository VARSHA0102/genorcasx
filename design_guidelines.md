# GenOrcasX Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern tech companies like Linear, Notion, and Vercel, combined with glassmorphic design principles for a cutting-edge AI/tech company aesthetic.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Dark Mode: Deep navy blue (220 25% 12%) as primary background
- Light Mode: Clean white (0 0% 98%) with subtle blue undertones
- Brand Accent: Vibrant cyan blue (195 100% 50%) for CTAs and highlights
- Glass Elements: Semi-transparent whites (0 0% 100% / 0.1-0.2) with subtle borders

**Glassmorphic Treatment:**
- Background blur effects with backdrop-filter: blur(10-20px)
- Subtle gradients from light blue to transparent
- Soft drop shadows with colored glows
- Semi-transparent borders (1px solid rgba(255,255,255,0.2))

### B. Typography
**Font Stack:**
- Primary: Inter (Google Fonts) for body text and UI elements
- Headings: Space Grotesk (Google Fonts) for modern, tech-forward appeal
- Code/Technical: JetBrains Mono for AI tool outputs

**Hierarchy:**
- Hero titles: 3xl-6xl with gradient text effects
- Section headers: 2xl-3xl with medium weight
- Body text: base-lg with optimized line height
- Tool interfaces: Clean, readable sizes with proper contrast

### C. Layout System
**Spacing System:** Tailwind units of 4, 6, 8, 12, 16, 24 for consistent rhythm
- Container max-width: 1200px with responsive padding
- Section spacing: py-16 to py-24 for generous breathing room
- Component spacing: Consistent 4-8 unit gaps
- Grid layouts: 12-column responsive grid for complex layouts

### D. Component Library

**Navigation:**
- Glassmorphic sticky header with blur background
- Logo integration with provided GenOrcasX branding
- Mobile hamburger menu with smooth slide animations
- Dark/light mode toggle with icon transitions

**Hero Section:**
- Full viewport height with gradient background overlay
- Large hero text with animated gradient effects
- Glass-style CTA buttons with hover depth effects
- Subtle floating animation elements

**AI Tools Interface:**
- Glass-panel tool containers with soft shadows
- Input fields with glassmorphic styling and focus states
- Loading states with elegant spinners
- Output display in glass containers with syntax highlighting

**Blog Cards:**
- Glass-effect cards with hover lift animations
- Category tags with colored backgrounds
- Search bar with glassmorphic styling
- Filter buttons with active state indicators

**Team Profiles:**
- Circular profile images with glass border effects
- Hover cards revealing additional information
- Social links with subtle icon animations

**Contact Form:**
- Glass-panel form container
- Floating label inputs with smooth transitions
- Submit button with loading and success states

### E. Glassmorphic Implementation Details

**Glass Panels:**
- backdrop-filter: blur(16px) for main glass effects
- background: rgba(255,255,255,0.1) in dark mode
- background: rgba(255,255,255,0.8) in light mode
- border: 1px solid rgba(255,255,255,0.2)
- box-shadow with colored glows (cyan/blue tints)

**Interactive States:**
- Hover: Increased opacity and stronger glow effects
- Focus: Enhanced border glow with accessibility colors
- Active: Subtle scale transforms and deeper shadows

## Images
**Hero Section:**
- Abstract tech/AI visualization as background (geometric patterns, neural network graphics, or flowing data streams)
- Gradient overlay for text readability
- Optional: Floating 3D elements or particles

**Tool Pages:**
- Icon illustrations for each AI tool (brain for AI Assistant, puzzle pieces for chunking, etc.)
- Clean, minimal vector graphics matching the glassmorphic aesthetic

**Team Page:**
- Professional headshots with consistent lighting and backgrounds
- Optional: Subtle company branding elements in backgrounds

**Blog Section:**
- Featured images for blog posts (tech/AI themed)
- Placeholder images with consistent aspect ratios (16:9)

## Animations
**Subtle Interactions:**
- Gentle fade-ins on scroll for section reveals
- Smooth glass panel hover effects with transform: translateY(-2px)
- Loading spinners with glassmorphic styling
- Page transitions with opacity and slight movement

**Performance Considerations:**
- CSS transforms only (avoid layout-triggering animations)
- Prefer opacity and transform properties
- Use will-change sparingly for performance

This design creates a modern, professional appearance that positions GenOrcasX as an innovative AI/tech company while maintaining excellent usability across all devices and use cases.