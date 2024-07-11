#!/bin/bash

# Function to check if nvm is installed
check_nvm_installed() {
  if command -v nvm &> /dev/null; then
    echo "nvm is already installed."
    return 0
  else
    echo "Installing nvm..."
    return 1
  fi
}

# Function to install nvm
install_nvm() {
  echo "Installing NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

  # Source nvm script to make it available in the current session
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

  echo "NVM installation completed."
}

# Function to install the version specified in .nvmrc
install_node_version() {
  if [ -f ".nvmrc" ]; then
    local node_version=$(cat .nvmrc)
    echo "Installing and using Node.js version: $node_version"
    nvm install $node_version
    nvm use $node_version
    echo "Node.js version $node_version is now in use."
  else
    echo ".nvmrc file not found. Please ensure it exists in the current directory."
  fi
}

# Function to install the node modules in the package.json
install_node_modules() {
  if [ -f "package.json" ]; then
    echo "Installing node modules"
    npm install
    echo "Done."
  else
    echo "package.json file not found."
  fi
}

create_env_file() {
  if [ -f ".env.local" ]; then
    echo ".env.local already exist."
  else
    echo "Create .env.local file"
    cat .env > .env.local
  fi
}

# Main script execution
if ! check_nvm_installed; then
  install_nvm
  install_node_version
  install_node_modules
  create_env_file
else
  echo "No setup needed."
fi
