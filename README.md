# ❤️ iFell

**A 48-hour hackathon celebrating love in every form.**

iFell is a platform where anyone can submit and read real stories of love — from the magic of a first love to the growth found in self-love. 

---

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ifell
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   REACT_APP_PASSCODE=your_admin_secret_passcode
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

---

## Database Schema (Supabase)

Create a table named `articles` with the following structure:

| Column | Type | Default | Notes |
| :--- | :--- | :--- | :--- |
| `id` | uuid | `gen_random_uuid()` | Primary Key |
| `title` | text | - | |
| `author` | text | - | |
| `category` | text | - | See Categories below |
| `excerpt` | text | - | Short summary |
| `body` | text | - | Full story content |
| `approved` | boolean | `false` | For Admin moderation |
| `created_at`| timestamptz | `now()` | |

### Row Level Security (RLS)
To ensure the app functions correctly, run these queries in your Supabase SQL editor:

```sql
-- Enable RLS
alter table public.articles enable row level security;

-- Allow anyone to submit (Insert)
create policy "Enable insert for anonymous users" 
on public.articles for insert 
to anon 
with check (true);

-- Allow everyone to read ALL articles (Required for Admin Preview & Feed)
create policy "Enable read access for all users" 
on public.articles for select 
to anon 
using (true);

-- Allow Admin actions (Update/Delete) via Anon 
-- (Security is handled by your app's passcode check)
create policy "Enable update/delete for admins" 
on public.articles for all 
to anon 
using (true);
```

---

## Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | **Landing** | Welcome & Mission statement |
| `/read` | **Magazine** | Filterable feed of approved stories |
| `/submit` | **Submit** | Form to share a new story |
| `/admin` | **Dashboard** | Moderation queue (Passcode protected) |
| `/article/:id` | **Story View** | Full-page view for a specific story |

---

## Categories

- `first-love` · `heartbreak` · `long-distance` · `unrequited` · `self-love` · `soulmates`

---

## Built With

* [React.js](https://reactjs.org/)
* [Supabase](https://supabase.com/) (Database & Auth)
* [React Router](https://reactrouter.com/) (Navigation)
* CSS3 (Custom Glassmorphism UI)

---
**Made with ❤️ for the iFell Hackathon 2026**
