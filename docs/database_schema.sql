-- TRIPAX HOMES LTD. - SUPABASE SCHEMA INITIALIZATION
-- Version: 1.1 | Date: April 3, 2026

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. PROJECTS TABLE
create table projects (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    slug text not null unique,
    location text not null,
    type text not null, -- residential, commercial, industrial
    status text check (status in ('ongoing', 'completed', 'upcoming')) default 'ongoing',
    description text,
    thumbnail text, -- Cloudinary URL
    images text[],  -- Array of Cloudinary URLs
    specifications jsonb, -- Dynamic specs (e.g. { "size": "2500 sqft", "parking": "2" })
    is_featured boolean default false
);

-- 3. INQUIRIES TABLE
create table inquiries (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    email text not null,
    phone text,
    project_id uuid references projects(id),
    message text,
    status text check (status in ('new', 'read', 'archived')) default 'new'
);

-- 4. CMS CONFIG TABLE
create table cms_config (
    key text primary key,
    value jsonb not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. RLS POLICIES
-- Note: As per the "Gatekeeper" security model, RLS is enabled to prevent accidental public writes.
-- The Next.js server uses the SUPABASE_SERVICE_ROLE_KEY to perform all mutations.

alter table projects enable row level security;
create policy "Public view projects" on projects for select using (true);

alter table inquiries enable row level security;
create policy "Public submit inquiries" on inquiries for insert with check (true);

alter table cms_config enable row level security;
create policy "Public view config" on cms_config for select using (true);
