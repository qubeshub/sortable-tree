# Sortable tree

This repo creates a standalone JavaScript library of [react-sortable-tree](https://github.com/frontend-collective/react-sortable-tree).

The bundle can be created using the `sortable-tree.js` file in the `create-bundle` folder, simply by running:

```yarn && yarn dist```

If you run into the following error

```
opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ]
```

you need to downgrade Node.JS to Long Term Support(LTS). Do the following (based on https://itsmycode.com/error-digital-envelope-routines-unsupported/):

```
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
> export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
> nvm install --lts
> nvm use --lts
> yarn && yarn dist
```

See `dist/index.html` for how to use the bundle.

Note: The structure of this package is based on https://github.com/gooddata/ui-sdk-examples/tree/master/vanillajs. Essentially, this is a working example of how to embed a React app in a JavaScript-only framework.