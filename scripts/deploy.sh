#!/bin/bash
# Manual deploy script that pushes dist/ to gh-pages branch
# Usage: GITHUB_TOKEN=your_token ./scripts/deploy.sh

set -e

REPO="https://github.com/LamontChean/Preschool.git"
BRANCH="gh-pages"
BUILD_DIR="dist"

if [ -z "$GITHUB_TOKEN" ]; then
  echo "ERROR: GITHUB_TOKEN environment variable not set"
  echo "Create a token at https://github.com/settings/tokens/new (repo scope)"
  echo "Then run: GITHUB_TOKEN=ghp_xxxx npm run deploy"
  exit 1
fi

# Use token in remote URL
REPO_WITH_TOKEN="https://${GITHUB_TOKEN}@github.com/LamontChean/Preschool.git"

echo "Deploying $BUILD_DIR to $BRANCH branch..."

# Create temp deploy directory
DEPLOY_DIR=$(mktemp -d)
trap "rm -rf $DEPLOY_DIR" EXIT

cp -r "$BUILD_DIR/." "$DEPLOY_DIR/"
cd "$DEPLOY_DIR"

git init
git config user.email "github-actions[bot]@users.noreply.github.com"
git config user.name "github-actions[bot]"
git remote add origin "$REPO_WITH_TOKEN"
git add -A
git commit -m "Deploy site $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push origin HEAD:$BRANCH --force

echo "✓ Deploy complete!"
