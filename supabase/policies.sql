alter table public.profiles enable row level security;
alter table public.destinations enable row level security;
alter table public.businesses enable row level security;
alter table public.itineraries enable row level security;
alter table public.itinerary_stops enable row level security;
alter table public.qr_spots enable row level security;
alter table public.localpass_checkins enable row level security;
alter table public.points_ledger enable row level security;
alter table public.coupons enable row level security;
alter table public.inquiries enable row level security;
alter table public.events enable row level security;
alter table public.reviews enable row level security;

create or replace function public.current_user_role()
returns text
language sql
security definer
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

create policy "Public can read published destinations"
on public.destinations for select
using (is_published = true or public.current_user_role() in ('tourism_staff', 'admin'));

create policy "Tourism staff can manage destinations"
on public.destinations for all
using (public.current_user_role() in ('tourism_staff', 'admin'))
with check (public.current_user_role() in ('tourism_staff', 'admin'));

create policy "Public can read approved businesses"
on public.businesses for select
using (status = 'approved' or owner_id = auth.uid() or public.current_user_role() in ('tourism_staff', 'admin'));

create policy "Owners can update own business"
on public.businesses for update
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "Tourism staff can manage businesses"
on public.businesses for all
using (public.current_user_role() in ('tourism_staff', 'admin'))
with check (public.current_user_role() in ('tourism_staff', 'admin'));

create policy "Public can read published itineraries"
on public.itineraries for select
using (is_published = true or public.current_user_role() in ('tourism_staff', 'admin'));

create policy "Public can read active QR spots"
on public.qr_spots for select
using (is_active = true or public.current_user_role() in ('tourism_staff', 'admin'));

create policy "Users can read own profile"
on public.profiles for select
using (id = auth.uid() or public.current_user_role() = 'admin');

create policy "Users can update own profile"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "Users can create own checkins"
on public.localpass_checkins for insert
with check (user_id = auth.uid());

create policy "Users can read own checkins"
on public.localpass_checkins for select
using (user_id = auth.uid() or public.current_user_role() in ('tourism_staff', 'admin'));

create policy "Users can read own points ledger"
on public.points_ledger for select
using (user_id = auth.uid() or public.current_user_role() in ('tourism_staff', 'admin'));

create policy "Public can read active coupons"
on public.coupons for select
using (status = 'active');

create policy "Users can create inquiries"
on public.inquiries for insert
with check (requester_id = auth.uid());

create policy "Users can read related inquiries"
on public.inquiries for select
using (
  requester_id = auth.uid()
  or public.current_user_role() in ('tourism_staff', 'admin')
  or exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = auth.uid()
  )
);

create policy "Public can read published events"
on public.events for select
using (is_published = true or public.current_user_role() in ('tourism_staff', 'admin'));

create policy "Users can create reviews"
on public.reviews for insert
with check (user_id = auth.uid());

create policy "Public can read reviews"
on public.reviews for select
using (true);
