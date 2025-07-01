create table snippets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  title text,
  content text,
  language text,
  created_at timestamp default now()
); 