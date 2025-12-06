# Strapi Backend Setup Guide

This guide will help you set up a customized Strapi backend to serve content for the ToolScan blog.

## 1. Create a Strapi Project

Run the following command in a separate directory (e.g., outside your Next.js project folder):

```bash
npx create-strapi-app@latest my-strapi-project --quickstart
```

This will automatically create a new Strapi project and start the development server at `http://localhost:1337`.  Your browser should open to the admin registration page.

## 2. Register Admin User

Complete the form to create your key administrator account.

## 3. Create "Blog Post" Collection Type

1.  In the Strapi Dashboard, go to **Content-Type Builder** (left sidebar).
2.  Click **Create new collection type**.
3.  Display name: `Blog Post`.
4.  Click **Continue**.
5.  Add the following fields:

| Field Name | Type | Settings |
| :--- | :--- | :--- |
| `title` | Text (Short text) | Required |
| `slug` | UID | Attached field: `title` (Required) |
| `excerpt` | Text (Long text) | Required |
| `content` | Rich Text | Required |
| `date` | Date | Type: date (Required) |
| `author` | Text (Short text) | Default value: `ToolScan Team` |
| `keywords` | JSON | (To store array of strings) |
| `relatedPostIds`| JSON | (To store array of related IDs/slugs) |

6.  Click **Save**. The server will restart.

## 4. Add Content

1.  Go to **Content Manager** > **Blog Post**.
2.  Click **Create new entry**.
3.  Copy content from your existing `src/data/blogPosts.ts` and paste it into the fields.
    *   For `content`, you can paste the HTML directly if using a standard Rich Text editor, or convert it to Markdown.
    *   For `keywords` and `relatedPostIds`, enter valid JSON arrays (e.g., `["antique tools", "vintage"]`).
4.  Click **Save** and then **Publish**. Repeat for all 5 posts.

## 5. Enable Public API Access

By default, Strapi APIs are private.

1.  Go to **Settings** > **Users & Permissions Plugin** > **Roles**.
2.  Click **Public**.
3.  Scroll down to **Permissions**.
4.  Select `Blog-post` (or `api::blog-post.blog-post`).
5.  Check **find** (get all) and **findOne** (get one).
6.  Click **Save**.

## 6. Get API Token (Optional but Recommended)

For better security, you can use an API Token instead of public permissions, but for this integration we will start with Public access for simplicity as per the "find/findOne" steps above.

## 7. Configuration in Next.js

1.  Create a `.env.local` file in your Next.js project root:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
```


## 8. Starting the Server & Logging In (Daily Usage)

If you stopped the server or are coming back later:

1.  Open your terminal and navigate to your Strapi folder:
    ```bash
    cd my-strapi-project
    ```
2.  Start the development server:
    ```bash
    npm run develop
    ```
3.  Open your browser and go to the Admin Panel:
    *   **URL**: [http://localhost:1337/admin](http://localhost:1337/admin)
    *   **Login**: Enter the email and password you created in Step 2.

## 9. Deployment (Production)

**Yes, you MUST deploy Strapi** if you plan to publish your Next.js site to the web (e.g., on Vercel).

*   **Why?** Your deployed website cannot access `localhost`. It needs a live URL (e.g., `https://my-strapi-app.herokuapp.com`) to fetch content.
*   **Where?**
    *   **Strapi Cloud**: Easiest, managed hosting by Strapi.
    *   **Render / Railway / Heroku**: Good alternatives for hosting Node.js apps.
    *   **DigitalOcean / VPS**: For full control.

Once deployed, remember to update `NEXT_PUBLIC_STRAPI_URL` in your Vercel (or other host) environment variables to point to your **live** Strapi URL, not localhost.
