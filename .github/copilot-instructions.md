<!-- Copilot / AI agent instructions for this Expo + Redux Toolkit project -->
# Repository-specific instructions for AI agents

This file contains short, actionable guidance for AI agents working in this repo. Focus on the files and patterns below — they are the canonical places to change behavior.

- Project type: Expo (React Native) using `expo-router` (file-based routing) and TypeScript. See `package.json` and `README.md` for start scripts.
- Path alias: `@/*` is mapped to the repo root (see `tsconfig.json`). Use `@/` imports when modifying app code.

Key patterns and places to edit
- Routing / screens: `app/` is file-based routing (Expo Router). Routes grouped with parentheses (example: `(tabs)` folder). Modal route: `app/modal.tsx` and `Stack.Screen name="modal"` are declared in `app/_layout.tsx`.
- Root app wrapper: `app/_layout.tsx` wraps the app with Redux `Provider` (store at `store/store.ts`) and `ThemeProvider`. When changing global providers, update this file.
- Tabs: `app/(tabs)/_layout.tsx` defines the tab layout and uses `Tabs.Screen name="index"` and `explore`. To add a new tab, add a screen in this folder.

- State & Server integration:
  - Global store: `store/store.ts` — reducers are under `store/reducer/` (e.g. `authSlice.ts`, `userSlice.ts`). `apiService` (RTK Query) is registered here and its middleware is added.
  - API client: `services/apiClients.ts` exports `apiClient` (an Axios instance). Update `baseURL` and interceptor logic here. Example: token injection is implemented in this file (currently stubbed with `"tu-token-aqui"`).
  - RTK Query service: `services/apiService.ts` wraps `apiClient` with `axiosBaseQuery` and defines endpoints via `createApi`. When adding endpoints, follow the existing pattern and export the generated hooks (e.g. `useLoginMutation`, `useGetUserProfileQuery`).

Important conventions and examples
- Use the axios wrapper: always call backend via `services/apiService.ts` (RTK Query) or `apiClient` directly — do not create new raw `axios.create` instances unless necessary.
- Token handling: token retrieval should live in `services/apiClients.ts` (the interceptor). The current code uses a placeholder; replace with `expo-secure-store` or `AsyncStorage` calls as appropriate.
- File-based route names: filenames map to routes. Parentheses groupings (e.g. `(tabs)`) are route anchors used by `expo-router`; keep that convention when reorganizing pages.
- Theme / color scheme: `hooks/use-color-scheme.ts` and `constants/theme.ts` define color logic. `components/*` contains small UI primitives (e.g. `themed-text.tsx`, `haptic-tab.tsx`, `icon-symbol.tsx`). Reuse these components for consistent styling.

Developer workflows / commands (discoverable in this repo)
- Install deps: `npm install`
- Start dev server / Expo: `npm start` (alias runs `expo start`), or `npm run ios`, `npm run android`, `npm run web`
- Reset starter app: `npm run reset-project` (see `scripts/reset-project.js`) — this moves starter code and creates a blank `app` directory.
- Lint: `npm run lint`

What to check when changing behavior
- If changing network endpoints or authorization, update `services/apiClients.ts` and `services/apiService.ts` together. Validate that `store/store.ts` includes the `apiService.reducerPath` and `apiService.middleware`.
- When adding screens, ensure routes match file names and that any new top-level navigation changes are reflected in `app/_layout.tsx` or `app/(tabs)/_layout.tsx`.
- Use path alias `@/` for imports to match existing code (TypeScript paths configured in `tsconfig.json`).

Files to open first when investigating a change
- `package.json` — scripts and deps
- `app/_layout.tsx` — root providers + routing anchor
- `app/(tabs)/_layout.tsx` and pages inside `app/(tabs)` — tab routing
- `services/apiClients.ts` and `services/apiService.ts` — API wiring and RTK Query endpoints
- `store/store.ts` and `store/reducer/*` — global state layout
- `components/` and `components/ui/` — small UI primitives and patterns (themed components)

If anything in these instructions is unclear or you need additional examples (e.g., how to add an RTK Query endpoint, or where to put a new screen), ask for the exact change and I will expand this file with concrete code snippets.
