# CourseMaster Frontend

CourseMaster is a React application for browsing and taking courses. Students can enroll, view course lessons, track progress, submit assignments, and take quizzes. Administrators can manage courses, enrollments, assignments, users, and analytics.

Live site: https://course-master4981.netlify.app/

## What you need

- Node.js 20.19+ or 22.12+
- npm (included with Node.js)
- A running CourseMaster backend API. The frontend does not include the backend or a local database.

## Run locally

1. Clone this repository and open its root folder:

   ```sh
   git clone https://github.com/Pullock4981/courseMaster_frontEnd.git
   cd courseMaster_frontEnd
   ```

2. Install the exact dependency versions from the lockfile:

   ```sh
   npm ci
   ```

3. Create a local environment file by copying `.env.example`:

   **Windows PowerShell**

   ```powershell
   Copy-Item .env.example .env
   ```

   **macOS/Linux**

   ```sh
   cp .env.example .env
   ```

4. Set `VITE_API_BASE_URL` in `.env` to the backend API base URL. For a local backend, the usual value is:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

   The checked-in `.env.example` points to the project's hosted API. Use a backend URL you are authorized to access. The backend must allow requests from the frontend origin (for example, `http://localhost:5173`) through CORS.

5. Start the frontend:

   ```sh
   npm run dev
   ```

6. Open the URL printed by Vite, usually http://localhost:5173.

After changing `.env`, restart the Vite development server.

## Try the application

### Student flow

1. Open **Create an account** and register with an email address you control.
2. Sign in with that account.
3. Browse courses, open a course, and enroll.
4. Open **Dashboard** to find your enrolled courses.
5. Continue a course, watch a lesson, and mark it complete.
6. Where course content provides them, submit an assignment or complete a quiz.

Course enrollment, lesson progress, assignments, and quizzes require a working backend and suitable course data.

### Administrator flow

Admin pages require a backend-authenticated account with the `admin` role. Create or request an administrator account through the backend's supported provisioning process. If registration accepts an admin key, obtain it from the backend operator through a secure channel; do not put it in this repository, source code, or a shared `.env` file.

After signing in as an administrator, open the dashboard to manage courses, users, enrollments, assignments, video classes, and analytics. The frontend does not contain demo credentials or a route-authentication bypass.

## Checks

Run these from the repository root:

```sh
npm run lint
npm run build
npm audit
```

- `npm run lint` checks JavaScript and JSX with ESLint.
- `npm run build` creates the production bundle in `dist/`.
- `npm audit` checks installed dependencies against npm's security advisories.

There is currently no automated test script. Use the student and administrator flows above for manual end-to-end checks against a test backend.

## Configuration

| Variable | Purpose | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL used by Axios for backend requests | `http://localhost:5000/api` |

Anything prefixed with `VITE_` is bundled into client-side code. Do not store passwords, admin keys, private API keys, or other secrets in frontend environment variables.

## Main areas of the code

```text
src/
  components/     Shared UI and course-list components
  contexts/       Theme provider and hook
  layouts/        Shared application layout
  pages/          Public, student, course-player, and admin screens
  routes/         Authentication and administrator route guards
  services/       Axios client and API functions
  store/          Redux store and state slices
  utils/          Authentication token helpers
```

The frontend uses React, Vite, React Router, Redux Toolkit, Axios, Tailwind CSS, and DaisyUI. Backend API routes, authorization, CORS, and data storage must be configured in the backend project.
