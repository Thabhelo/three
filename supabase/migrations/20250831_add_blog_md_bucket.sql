-- Create public blog bucket for Markdown posts (readable by anyone)
insert into storage.buckets (id, name, public)
values ('blog-md', 'blog-md', true)
on conflict (id) do nothing;

-- Public can read .md files in blog-md
drop policy if exists "Public read blog-md" on storage.objects;
create policy "Public read blog-md" on storage.objects
for select using (
  bucket_id = 'blog-md'
);

-- Only authenticated users can insert into blog-md
drop policy if exists "Authenticated write blog-md" on storage.objects;
create policy "Authenticated write blog-md" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'blog-md'
);

-- Only the uploader (owner) can update/delete their objects in blog-md
drop policy if exists "Owner update blog-md" on storage.objects;
create policy "Owner update blog-md" on storage.objects
for update to authenticated
using (
  bucket_id = 'blog-md' and auth.uid() = owner
)
with check (
  bucket_id = 'blog-md' and auth.uid() = owner
);

drop policy if exists "Owner delete blog-md" on storage.objects;
create policy "Owner delete blog-md" on storage.objects
for delete to authenticated
using (
  bucket_id = 'blog-md' and auth.uid() = owner
);


