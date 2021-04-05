(async () => {
  await require('./attr.test').run()
  await require('./dasherize.test').run()
  await require('./empty.test').run()
  await require('./render.test').run()
  await require('./comp.test').run()
  await require('./prop.test').run()
})()
