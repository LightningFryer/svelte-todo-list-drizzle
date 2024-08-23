
# A Simple Todo List

This project is a simple todo list which uses Google's OAuth to keep track of your todos. It is built using the following stack:

- [SvelteKit](https://kit.svelte.dev/)
- [Tailwindcss](https://kit.svelte.dev/)
- [Skeleton UI library](https://www.skeleton.dev/)
- [lucia-auth](https://lucia-auth.com/) (For authentication)
- [Drizzle ORM*](https://orm.drizzle.team/)
- [TursoDB](https://turso.tech/)

## Notes
### Why did I use Drizzle, which is still not complete, instead of prisma?
Refer to [this](https://www.youtube.com/watch?v=jqhHXe746Ns) video by ThePrimeTime.

### What is lucia-auth?
[lucia-auth](https://lucia-auth.com/) is a relatively new auth library that I've been using for a good amount of time now. This project was originally made using [Auth.js](https://authjs.dev/). So why did I switch? The Drizzle ORM Adapter that is provided by the Auth.js library is not stable and often breaks SQLite tables. So I found a great, robust alternative library called lucia-auth which not only provides a stable Drizzle ORM Adapter but also provides much more control to the auth flow.
