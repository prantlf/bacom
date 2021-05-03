(async () => {
  await require('./attr.test').run()
  await require('./dasherize.test').run()
  await require('./eventize.test').run()
  await require('./comp.test').run()
  await require('./elem.test').run()
  await require('./event.test').run()
  await require('./prop.test').run()
})()
