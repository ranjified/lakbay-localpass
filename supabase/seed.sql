insert into public.destinations (slug, name, category, barangay, description, story, latitude, longitude, points, tags, is_published)
values
  ('basilica-st-michael', 'Minor Basilica of St. Michael the Archangel', 'Religious', 'Poblacion', 'A landmark church and anchor stop for a heritage walk in Tayabas.', 'Learn about the basilica, nearby heritage streets, visitor etiquette, and nearby food stops.', 14.0251000, 121.5929000, 50, array['heritage', 'church', 'walkable'], true),
  ('casa-comunidad', 'Casa Comunidad de Tayabas', 'Heritage', 'Poblacion', 'A civic heritage structure that can anchor storytelling and student tours.', 'Unlock old Tayabas civic stories, photo prompts, and nearby local merchant coupons.', 14.0243000, 121.5914000, 40, array['heritage', 'history', 'students'], true),
  ('budin-trail', 'Budin and Pasalubong Trail', 'Pasalubong', 'Poblacion', 'A curated food trail that gives visibility to local delicacy makers.', 'View pasalubong bundles, pickup instructions, merchant stories, and rewards.', 14.0263000, 121.5941000, 30, array['food', 'pasalubong', 'coupon'], true),
  ('tayabas-food-loop', 'Tayabas Food Loop', 'Food', 'City Proper', 'A sample itinerary connecting restaurants, cafes, and local delicacy shops.', 'Browse meal suggestions, preorder forms, and LocalPass reward stamps.', 14.0219000, 121.5899000, 35, array['food', 'msme', 'preorder'], true)
on conflict (slug) do nothing;

insert into public.qr_spots (destination_id, qr_code, title, content, points)
select id, 'LP-BASILICA-001', 'Basilica LocalPass Stop', story, points from public.destinations where slug = 'basilica-st-michael'
on conflict (qr_code) do nothing;

insert into public.qr_spots (destination_id, qr_code, title, content, points)
select id, 'LP-CASA-002', 'Casa Comunidad LocalPass Stop', story, points from public.destinations where slug = 'casa-comunidad'
on conflict (qr_code) do nothing;

insert into public.qr_spots (destination_id, qr_code, title, content, points)
select id, 'LP-BUDIN-003', 'Budin Trail LocalPass Stop', story, points from public.destinations where slug = 'budin-trail'
on conflict (qr_code) do nothing;

insert into public.businesses (name, business_type, barangay, description, contact_number, status, engagement_score, offers)
values
  ('Tayabas Budin House', 'pasalubong', 'Poblacion', 'Demo pasalubong merchant with preorder and pickup requests.', '09000000001', 'approved', 128, array['Budin box preorder', 'LocalPass coupon', 'Pickup request']),
  ('Heritage Cafe Tayabas', 'cafe', 'City Proper', 'Demo cafe partner for heritage walk meals and student groups.', '09000000002', 'approved', 94, array['Coffee stop', 'Student meal set', 'QR badge reward']),
  ('Lakbay Guide Juan', 'tour_guide', 'Poblacion', 'Demo tour guide profile for heritage walks and food crawl packages.', '09000000003', 'pending', 23, array['Heritage walk', 'Food crawl', 'Student tour package']),
  ('Tayabas Farm Stay Demo', 'accommodation', 'Rural Tayabas', 'Demo accommodation listing for farm stay and retreat packages.', '09000000004', 'needs_review', 39, array['Overnight room', 'Retreat package', 'Breakfast add on']),
  ('Local Transport Desk', 'transport', 'Terminal Area', 'Demo transport listing for local transfer and terminal pickup requests.', '09000000005', 'approved', 76, array['Tricycle request', 'Van inquiry', 'Terminal pickup'])
on conflict do nothing;

insert into public.itineraries (title, description, audience, estimated_duration, is_published)
values
  ('Heritage Walk Starter', 'Basilica, Casa Comunidad, nearby food and pasalubong stops.', 'tourist', '2 to 3 hours', true),
  ('Food and Pasalubong Loop', 'A simple route for meals, delicacies, pickup requests, and LocalPass rewards.', 'tourist', '2 hours', true)
on conflict do nothing;

insert into public.events (title, venue, event_date, description, is_published)
values
  ('Mayohan Festival Demo Listing', 'Tayabas City Proper', '2026-05-15', 'Sample event listing for calendar, route recommendations, QR challenges, and merchant promos.', true),
  ('Heritage Weekend Walk', 'Poblacion Heritage Loop', '2026-06-08', 'Demo guided walk showing how tourism staff and guides can publish bookable activities.', true)
on conflict do nothing;

insert into public.products (business_id, name, category, price, prep_time, pickup_point, trail_tag, localpass_points)
select id, 'Budin Box Preorder', 'pasalubong', 180, '45 minutes', 'Poblacion pickup counter', 'Pasalubong Run', 25
from public.businesses where name = 'Tayabas Budin House'
on conflict do nothing;

insert into public.products (business_id, name, category, price, prep_time, pickup_point, trail_tag, localpass_points)
select id, 'Heritage Snack Set', 'snack', 150, '20 minutes', 'Near heritage route', 'Heritage Walk', 15
from public.businesses where name = 'Heritage Cafe Tayabas'
on conflict do nothing;

insert into public.stay_rooms (business_id, room_name, stay_type, best_for, nightly_rate, max_guests, amenities, match_tags)
select id, 'Family room with breakfast add-on', 'Farm Stay', 'Family Tour and Quiet Retreat', 2800, 5,
array['Farm breakfast add-on', 'Parking', 'Nature side trip suggestion'],
array['Best for families', 'Quiet retreat', 'Workation friendly']
from public.businesses where name = 'Tayabas Farm Stay Demo'
on conflict do nothing;

insert into public.vehicle_packages (business_id, name, vehicle_type, capacity, route, price_mode, route_badge)
select id, 'Heritage Trike Loop', 'Tricycle', '1 to 3 passengers', 'Basilica to Casa Comunidad to Budin Trail', 'Demo fixed package inquiry', 'Heritage Rider'
from public.businesses where name = 'Local Transport Desk'
on conflict do nothing;

insert into public.vehicle_packages (business_id, name, vehicle_type, capacity, route, price_mode, route_badge)
select id, 'Terminal Pickup Assist', 'Terminal Pickup', '1 to 4 passengers', 'Terminal to stay, basilica, or food stop', 'Driver confirms fare before trip', 'Arrival Buddy'
from public.businesses where name = 'Local Transport Desk'
on conflict do nothing;

insert into public.tour_packages (business_id, name, duration, ideal_for, meeting_point, includes, story_cards)
select id, 'Kwentong Tayabas Heritage Walk', '2 hours', 'Students, balikbayans, first-time visitors', 'Basilica entrance',
array['Basilica story', 'Casa Comunidad stop', 'Photo prompts', 'Pasalubong recommendation'],
array['Basilica etiquette', 'Civic history', 'Old Tayabas trivia']
from public.businesses where name = 'Lakbay Guide Juan'
on conflict do nothing;

insert into public.service_requests (business_id, request_type, item_name, trip_style, preferred_date, preferred_time, quantity, guest_count, pickup_point, destination, message, status)
select id, 'food_order', 'Budin Box Preorder', 'Food Trip', '2026-06-10', '3:00 PM', 2, null, 'Poblacion pickup counter', null, 'Please prepare as pasalubong after our heritage walk.', 'ready'
from public.businesses where name = 'Tayabas Budin House'
on conflict do nothing;

insert into public.service_requests (business_id, request_type, item_name, trip_style, preferred_date, preferred_time, quantity, guest_count, pickup_point, destination, message, status)
select id, 'stay_booking', 'Family room with breakfast add-on', 'Family Day Tour', '2026-06-10', null, null, 4, null, null, 'Need parking and breakfast option.', 'pending'
from public.businesses where name = 'Tayabas Farm Stay Demo'
on conflict do nothing;

insert into public.service_requests (business_id, request_type, item_name, trip_style, preferred_date, preferred_time, quantity, guest_count, pickup_point, destination, message, status)
select id, 'ride_request', 'Heritage Trike Loop', 'Heritage Walk', '2026-06-10', '4:30 PM', null, 3, 'Casa Comunidad', 'Budin and Pasalubong Trail', 'Please include a short pasalubong stopover.', 'confirmed'
from public.businesses where name = 'Local Transport Desk'
on conflict do nothing;
