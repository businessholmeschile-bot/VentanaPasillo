-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Trips Table: Stores the generated travel plans (JSON)
create table public.trips (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  destination varchar not null,
  duration_days integer,
  travel_plan jsonb not null, -- Stores the full JSON schema (flights, hotels, itinerary)
  user_email varchar, -- Optional, if we capture it later
  session_id varchar -- To link anonymous sessions
);

-- Leads Table: For newsletter or "Unlock full itinerary" features
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email varchar not null unique,
  source varchar default 'landing'
);

-- Analytics/Clicks Table: To track affiliate clicks (Monetization Law)
create table public.clicks (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  element_type varchar not null, -- 'flight', 'hotel', 'secret'
  element_name varchar,
  destination varchar,
  url_clicked text
);

-- Row Level Security (RLS) - Basic enabling
alter table public.trips enable row level security;
alter table public.leads enable row level security;
alter table public.clicks enable row level security;

-- Policies (Open for now for demo purposes, lock down in Production)
-- Allow anyone to read trips (sharing)
create policy "Enable read access for all users" on public.trips for select using (true);
-- Allow anon to insert trips (generation)
create policy "Enable insert access for anon users" on public.trips for insert with check (true);

-- Allow anon to insert clicks
create policy "Enable insert for analytics" on public.clicks for insert with check (true);
