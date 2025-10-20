# Adding content to Strapi for CodeKrafters website

This file explains the content-types added and shows quick ways to import images and entries into the Strapi app located at `cms/`.

Collections added:

- Hero (hero)
- Story (story)
- Event (event)
- Team Member (team-member)
- Sponsor (sponsor)
- Division (division)
- Page (page)

Quick start

1. From the repo root, open a terminal and run (powershell):

   # start strapi in development mode

   cd cms; npm install; npm run develop

2. Open the admin UI (usually http://localhost:1337/admin) and login/create an admin user.

Uploading images

- Use the Media Library in the Strapi admin to upload the `public/` images from the main project. You can drag & drop or use the Upload API:

  POST /api/upload
  multipart/form-data with file fields

Programmatic seeding (optional)

- For many images and entries, you can write a small Node script that:
  1. Uploads images to /api/upload
  2. Creates entries via /api/<collection>/content-type endpoints

Example minimal curl (powershell-friendly):

# upload an image

curl -X POST http://localhost:1337/api/upload -F "files=@..\\public\\ck-core.jpg" -H "Authorization: Bearer <TOKEN>"

# create a sponsor (after upload, attach by id)

curl -X POST http://localhost:1337/api/sponsors -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d '{"data": {"name":"Acme","website":"https://example.com","logo": 1}}'

Notes

- These schema files are Strapi v5-compatible and will be loaded on next boot.
- If you need a seed script, I can add a script that scans `public/` and uploads images and creates entries.
