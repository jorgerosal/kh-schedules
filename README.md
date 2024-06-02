# mwb-scheduler



## Pushing to Github Pages
```
npm run build

git add .

git commit -m "Deploy to GitHub Pages"

git push origin main

```

## Deployment

Deployed with https://jezzar042015.github.io/kh-schedules/


## Ensuring Permissions
You can create a new Personal Access Token (PAT) with repo permissions and add it as a secret in your GitHub repository settings:

Go to GitHub Personal Access Tokens.
Generate a new token with repo permissions.
In your repository, go to Settings > Secrets > Actions.
Add a new secret with the name GH_TOKEN and the value as your newly created PAT.
Update your workflow file to use this token:

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    personal_token: ${{ secrets.GH_TOKEN }}
    publish_dir: ./dist

```