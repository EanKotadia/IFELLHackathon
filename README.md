# iFell

### A hackathon celebrating love in every form.

iFell is a 48-hour love-themed hackathon platform where anyone can submit and read
real stories of love — first love, heartbreak, long distance, unrequited feelings,
self-love, and soulmates.

---

## Setup

```bash
git clone <your-repo>
cd ifell
npm install
cp .env .env
# Fill in your Supabase URL, anon key, and admin passcode
npm start
```

## Supabase Table

Create a table called `articles` with these columns:

| Column     | Type      | Default |
|------------|-----------|---------|
| id         | uuid (PK) | gen_random_uuid() |
| title      | text      |         |
| author     | text      |         |
| category   | text      |         |
| excerpt    | text      |         |
| body       | text      |         |
| approved   | boolean   | false   |
| created_at | timestamptz | now() |

Enable Row Level Security and add a policy allowing anonymous inserts and
authenticated reads.

## Routes

| Route     | Page          |
|-----------|---------------|
| /         | Landing Page  |
| /read     | Story Feed    |
| /submit   | Submit Story  |
| /admin    | Admin Review  |

## Categories

- `first-love` · `heartbreak` · `long-distance` · `unrequited` · `self-love` · `soulmates`
