# Design Guidelines: Netflix-Style Movie Streaming Platform

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Netflix and Amazon Prime Video for a premium streaming experience with dark theme and cinematic feel.

## Core Design Elements

### A. Color Palette
**Dark Mode Primary**:
- Background: 0 0% 8% (deep charcoal)
- Surface: 0 0% 12% (elevated dark)
- Primary brand: 0 85% 50% (Netflix red)
- Text primary: 0 0% 95% (near white)
- Text secondary: 0 0% 70% (muted gray)

**Accent Colors**:
- Success (access granted): 120 60% 45% (forest green)
- Warning (verification): 45 85% 55% (amber)
- Error (access denied): 0 75% 55% (red)

### B. Typography
**Font Stack**: Inter or Roboto via Google Fonts
- Headings: 600-700 weight, larger scale (2xl-4xl)
- Body text: 400-500 weight, readable sizes (sm-base)
- UI elements: 500 weight, consistent sizing

### C. Layout System
**Spacing Units**: Tailwind 2, 4, 6, 8, 12, 16 for consistent rhythm
- Container max-width: 7xl with centered alignment
- Grid gaps: 4-6 units between movie cards
- Generous padding: 8-12 units for sections

### D. Component Library

**Movie Cards**:
- Aspect ratio 2:3 for poster images
- Hover effects with scale transform and shadow
- Eye button positioned top-right with blur background
- Age rating badge bottom-left corner

**Face Verification Modal**:
- Full viewport overlay with backdrop blur
- Central card with webcam preview
- Green oval outline matching attached design
- "Take a selfie" instruction text below oval
- Simulation buttons arranged horizontally below camera

**Navigation**:
- Fixed header with transparent-to-solid transition on scroll
- Logo left-aligned, navigation center, user menu right
- Admin login accessible via separate route (/admin-login)

**Hero Section**:
- Full viewport height with video/image background
- Gradient overlay for text readability
- Large title with description and CTA buttons
- Outline buttons with blurred backgrounds over hero imagery

### E. Interactions

**Animations**:
- Smooth transitions (300ms ease-in-out)
- Hover scaling for movie cards (scale-105)
- Modal fade-in/slide-up animations
- Loading spinners for AI processing simulation

**Face Verification Flow**:
1. Eye button click triggers modal overlay
2. Webcam permission request simulation
3. Green oval frame for face positioning
4. Processing animation with spinner
5. Success/denial result with appropriate messaging

## Key Design Principles

1. **Cinematic Experience**: Dark theme with high contrast for premium feel
2. **Content Focus**: Imagery-driven with minimal UI chrome
3. **Intuitive Navigation**: Familiar streaming platform patterns
4. **Accessibility**: High contrast ratios and clear interactive states
5. **Performance**: Optimized loading states and smooth animations

## Images
- **Hero Background**: Large cinematic movie/series banner image at viewport height
- **Movie Posters**: High-quality 2:3 aspect ratio promotional images
- **Profile Pictures**: Circular avatars for user accounts
- **Logo**: Brand mark for header navigation