create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default 'Demo User',
  role text not null check (role in ('tourist', 'merchant', 'guide', 'transport', 'accommodation', 'event_organizer', 'tourism_staff', 'admin')),
  organization text,
  mobile_number text,
  status text not null default 'active' check (status in ('active', 'pending', 'suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  barangay text not null,
  description text not null,
  story text not null,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  points integer not null default 0,
  tags text[] not null default '{}',
  is_published boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id),
  name text not null,
  business_type text not null check (business_type in ('restaurant', 'pasalubong', 'cafe', 'accommodation', 'transport', 'tour_guide', 'event_organizer')),
  barangay text not null,
  description text not null,
  contact_number text,
  status text not null default 'pending' check (status in ('approved', 'pending', 'needs_review', 'rejected')),
  engagement_score integer not null default 0,
  offers text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.itineraries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  audience text not null default 'tourist',
  estimated_duration text,
  is_published boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.itinerary_stops (
  id uuid primary key default gen_random_uuid(),
  itinerary_id uuid not null references public.itineraries(id) on delete cascade,
  destination_id uuid references public.destinations(id) on delete set null,
  business_id uuid references public.businesses(id) on delete set null,
  stop_order integer not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.qr_spots (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid references public.destinations(id) on delete cascade,
  qr_code text unique not null,
  title text not null,
  content text not null,
  points integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.localpass_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  qr_spot_id uuid references public.qr_spots(id) on delete cascade,
  points_awarded integer not null default 0,
  checked_in_at timestamptz not null default now(),
  unique(user_id, qr_spot_id)
);

create table if not exists public.points_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  source_type text not null check (source_type in ('qr_checkin', 'coupon_claim', 'admin_adjustment')),
  source_id uuid,
  points integer not null,
  remarks text,
  created_at timestamptz not null default now()
);

create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  title text not null,
  description text not null,
  points_required integer not null default 0,
  status text not null default 'active' check (status in ('active', 'paused', 'expired')),
  valid_until date,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references public.profiles(id),
  business_id uuid references public.businesses(id),
  inquiry_type text not null check (inquiry_type in ('order', 'booking', 'ride', 'tour', 'stay', 'general')),
  message text not null,
  status text not null default 'new' check (status in ('new', 'accepted', 'declined', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  venue text not null,
  event_date date not null,
  description text not null,
  organizer_id uuid references public.profiles(id),
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  destination_id uuid references public.destinations(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
before update on public.profiles
for each row execute function public.touch_updated_at();

drop trigger if exists destinations_touch_updated_at on public.destinations;
create trigger destinations_touch_updated_at
before update on public.destinations
for each row execute function public.touch_updated_at();

drop trigger if exists businesses_touch_updated_at on public.businesses;
create trigger businesses_touch_updated_at
before update on public.businesses
for each row execute function public.touch_updated_at();

drop trigger if exists inquiries_touch_updated_at on public.inquiries;
create trigger inquiries_touch_updated_at
before update on public.inquiries
for each row execute function public.touch_updated_at();

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete cascade,
  name text not null,
  category text not null check (category in ('meal', 'pasalubong', 'snack', 'bundle')),
  price numeric(10, 2) not null default 0,
  prep_time text,
  pickup_point text,
  trail_tag text,
  localpass_points integer not null default 0,
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stay_rooms (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete cascade,
  room_name text not null,
  stay_type text not null,
  best_for text not null,
  nightly_rate numeric(10, 2) not null default 0,
  max_guests integer not null default 2,
  amenities text[] not null default '{}',
  match_tags text[] not null default '{}',
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vehicle_packages (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete cascade,
  name text not null,
  vehicle_type text not null,
  capacity text,
  route text not null,
  price_mode text,
  route_badge text,
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tour_packages (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete cascade,
  name text not null,
  duration text not null,
  ideal_for text,
  meeting_point text,
  includes text[] not null default '{}',
  story_cards text[] not null default '{}',
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references public.profiles(id),
  business_id uuid references public.businesses(id),
  request_type text not null check (request_type in ('food_order', 'stay_booking', 'ride_request', 'tour_request', 'event_interest')),
  item_name text not null,
  trip_style text,
  preferred_date date,
  preferred_time text,
  quantity integer,
  guest_count integer,
  pickup_point text,
  destination text,
  message text,
  status text not null default 'pending' check (status in ('draft', 'pending', 'confirmed', 'preparing', 'ready', 'on_route', 'completed', 'declined', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  notes text,
  created_at timestamptz not null default now()
);

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
before update on public.products
for each row execute function public.touch_updated_at();

drop trigger if exists stay_rooms_touch_updated_at on public.stay_rooms;
create trigger stay_rooms_touch_updated_at
before update on public.stay_rooms
for each row execute function public.touch_updated_at();

drop trigger if exists vehicle_packages_touch_updated_at on public.vehicle_packages;
create trigger vehicle_packages_touch_updated_at
before update on public.vehicle_packages
for each row execute function public.touch_updated_at();

drop trigger if exists tour_packages_touch_updated_at on public.tour_packages;
create trigger tour_packages_touch_updated_at
before update on public.tour_packages
for each row execute function public.touch_updated_at();

drop trigger if exists service_requests_touch_updated_at on public.service_requests;
create trigger service_requests_touch_updated_at
before update on public.service_requests
for each row execute function public.touch_updated_at();
