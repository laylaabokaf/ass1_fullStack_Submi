import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {


      on('before:run', () => {
        console.log('before run 1')
      })
      on('before:run', () => {
        console.log('before run 2')
      })
      // each spec
      on('after:spec', (a) => {
        console.log('after spec 1', a.relative)
      })
      on('after:spec', (a) => {
        console.log('after spec 2', a.relative)
      })
      on('after:spec', (a) => {
        console.log('after spec 3', a.relative)
      })
      // run finished
      on('after:run', () => {
        console.log('after run 1')
      })
      on('after:run', () => {
        console.log('after run 2')
      })
      },
   },
  env: {
    login_url: '/login',
    api_server: 'http://localhost:3000/'
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
