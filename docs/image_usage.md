# Image Usage Documentation - Tripax Homes Ltd.

This document outlines how images are currently managed and displayed across the Tripax Homes Ltd. web application.

## 1. Static Assets Location
All project-specific images are stored in the `/public/images/projects/` directory.
- `banner.png`: Used in the Hero carousel.
- `exterior.png`: Used as a general placeholder for project exteriors.
- `interior.png`: Used as a general placeholder for project interiors.

## 2. Homepage Hero Section
**Component**: `src/components/home/HeroCarousel.tsx`
- **Usage**: A hardcoded array `carouselImages` is used to rotate background images.
- **Current Images**:
  - `/images/projects/banner.png`
  - `/images/projects/exterior.png`
  - `/images/projects/interior.png`

## 3. Project Data (Mock)
**File**: `src/data/projectsMock.ts`
- **Interface**: The `Project` interface defines two image fields:
  - `thumbnail`: A string path to the main project image.
  - `gallery`: An array of strings representing additional project images.
- **Current State**: Most projects reuse `/images/projects/exterior.png` or `/images/projects/interior.png`.

## 4. Featured Projects (Homepage)
**Component**: `src/components/home/FeaturedCarousel.tsx`
- **Usage**: Pulls data from `projectsMock.ts` and displays the `thumbnail` property.
- **Planned Change**: A new `homepageThumbnail` field will be introduced to allow different visuals for the homepage vs. the catalogue.

## 5. Project Catalogue
**Components**: `src/app/projects/page.tsx` -> `CatalogueClient.tsx` -> `ProjectCard.tsx`
- **Usage**: `ProjectCard.tsx` displays the `thumbnail` property from `projectsMock.ts`.

## 6. Consultation CTA
**Component**: `src/components/home/ConsultationCTA.tsx`
- **Usage**: Currently uses a hardcoded Unsplash URL: `https://images.unsplash.com/photo-1600607687644-aac4c15ceea1...`
- **Planned Change**: Replace with a project-specific asset and add a click-to-call action.

## 7. Project Detail Pages
**Component**: `src/app/projects/[slug]/page.tsx`
- **Usage**: Displays the `thumbnail` and iterates through the `gallery` array.
