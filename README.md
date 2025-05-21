http://localhost:3002/api/locations?page=1&limit=10# Jindal Platform

This is the repository for Jindal platform

## Getting Started

First, run the development server:

```bash
pnpm dev
```

## PUSH IMAGE 
```
sudo docker tag jindalfe:latest registry.gam-group.net/jindal/jindalfe:latest
sudo docker push registry.gam-group.net/jindal/jindalfe:latest
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## User Interface

- `antd` for all components
- `tailwindcss` for CSS styling
- `@ant-design/cssinjs` for SSR style
- `@heroicons/react` for icons

## Data Fetching

For data fetching and mutation, [TanStack React Query](/REACT_QUERY.md) has been used.

## PWA

This is a Progressive Web App, it uses `@ducanh2912/next-pwa` package to work.
P.s.: It works only in production.

## VSCode Debugger

1. Go on the `“Run and Debug”` tab of vscode
2. Click on the text `“create a launch.json file”`
3. Select `“Web App (Chrome)”` from the dropdown
4. You need to copy this launch.json for NextJS [[source]](https://nextjs.org/docs/pages/building-your-application/configuring/debugging#debugging-with-vs-code)

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "pnpm dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "sourceMaps": true
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "serverReadyAction": {
        "pattern": "- Local:.+(https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

5. Select `Next.js: debug client-side` profile if debugging client-side (90% cases it's this).
6. Start `pnpm dev:debug` command, it will open the debug on `localhost:3000`. Click F5 to open a new Window on Chrome with the debugger attached.
7. Just put a breakpoint near the statement you want to debug.

## Common issues

### Infinite reload in `next dev`

It's a Service Worker problem caused by PWA + NextJS.  
To remove it, open Chrome Dev Tools (Ctrl+Shift+I), go to Application, select Service workers -> See all registrations.  
Search for `localhost:3000` and click "Unregister".

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
