const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
(async () => {
 const browser = await chromium.launch({executablePath:process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 const results=[];
 const context=await browser.newContext();
 const page=await context.newPage();
 const errors=[]; const remote=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error') errors.push(m.text());});
 page.on('request',r=>{if(/^https?:/.test(r.url()))remote.push(r.url());});
 await page.context().setOffline(true);
 for(const size of [{width:1920,height:1080},{width:1366,height:768},{width:1024,height:768},{width:390,height:844}]){
  await page.setViewportSize(size);
  await page.goto('file://'+root+'/index.html');
  await page.evaluate(()=>document.fonts.ready);
  for(const section of ['overview','structure','responsibilities']){
   await page.locator('nav [data-go='+section+']').click();
   await page.waitForTimeout(300);
   const layout=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:innerHeight,scrollHeight:document.documentElement.scrollHeight,fonts:document.fonts.check('16px "DM Sans"')&&document.fonts.check('16px "Libre Baskerville"'),shortButtons:[...document.querySelectorAll('button')].filter(b=>b.getBoundingClientRect().width && (b.getBoundingClientRect().height<56||b.getBoundingClientRect().width<56)).map(b=>b.textContent)}));
   if(layout.scrollWidth>size.width || !layout.fonts || layout.shortButtons.length) throw Error(JSON.stringify({size,section,layout}));
   if(size.width>=1366)await page.screenshot({path:root+'/qa/'+section+'-'+size.width+'.png',fullPage:true});
   if(size.width>=1366&&layout.scrollHeight>size.height) throw Error('Target viewport overflow: '+JSON.stringify({size,section,layout}));
   if(size.width>=1366)await page.screenshot({path:root+'/qa/'+section+'-'+size.width+'.png',fullPage:true});
   const axe=await new AxeBuilder({page}).options({preload:false}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   if(axe.violations.length) throw Error(JSON.stringify(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.html)}))));
   results.push({size,section,layout,axeViolations:axe.violations.length});
  }
 }
 await page.setViewportSize({width:1366,height:768});
 await page.locator('nav [data-go=structure]').click();
 for(const key of ['director','main-0','main-1','main-2','support-0','support-1','support-2']){
  await page.locator('[data-cell="'+key+'"]').click();
  if(await page.locator('[data-cell="'+key+'"]').getAttribute('aria-pressed')!=='true')throw Error('Cell selection');
  if(await page.evaluate(()=>document.documentElement.scrollHeight>innerHeight))throw Error('Selected cell overflow '+key);
 }
 await page.locator('nav [data-go=responsibilities]').click();
 for(let i=0;i<11;i++){
  if(i===6)await page.locator('#list-next').click();
  await page.locator('[data-responsibility="'+i+'"]').click();
  const expected=await page.evaluate(i=>window.PROCUREMENT.responsibilities[i][1],i);
  if(await page.locator('#responsibility-text').textContent()!==expected)throw Error('Content mismatch');
  if(await page.evaluate(()=>document.documentElement.scrollHeight>innerHeight))throw Error('Selected responsibility overflow '+i);
 }
 for(let i=10;i>0;i--) await page.locator('#responsibility-prev').click();
 if(!await page.locator('#responsibility-prev').isDisabled())throw Error('First boundary');
 for(let i=0;i<10;i++)await page.locator('#responsibility-next').click();
 if(!await page.locator('#responsibility-next').isDisabled())throw Error('Last boundary');
 await page.locator('#list-prev').click();
 if(await page.locator('#responsibility-number').textContent()!=='01')throw Error('Page reset');
 await page.locator('#back-button').click();
 if(!await page.locator('#structure').isVisible())throw Error('Back');
 await page.locator('.home-button').click();
 if(!await page.locator('#overview').isVisible())throw Error('Home');
 await page.locator('nav [data-go=structure]').focus();await page.keyboard.press('Enter');
 if(await page.evaluate(()=>document.activeElement.id)!=='structure-title')throw Error('Heading focus');
 await page.keyboard.press('Tab');
 if(await page.evaluate(()=>document.activeElement.dataset.cell)!=='director')throw Error('Tab navigation');
 await page.keyboard.press('Tab');await page.keyboard.press('Space');
 if(await page.locator('[data-cell=main-0]').getAttribute('aria-pressed')!=='true')throw Error('Keyboard selection');
 await page.emulateMedia({reducedMotion:'reduce'});
 const motion=await page.locator('#structure').evaluate(e=>getComputedStyle(e).animationName);
 if(motion!=='none')throw Error('Reduced motion');
 if(errors.length||remote.length)throw Error(JSON.stringify({errors,remote}));
 fs.writeFileSync(root+'/qa/results.json',JSON.stringify({results,interactions:'All 7 organization positions and all 11 responsibilities; list paging; detail previous/next; boundaries; Home and Back; Enter/Space/Tab navigation; heading focus; reduced motion',errors,remote,offline:true,browser:await browser.version()},null,2));
 if(fs.existsSync('/private/tmp/procurement-reference/index.html')) {
 await page.goto('file:///private/tmp/procurement-reference/index.html');
 await page.locator('.attract-lang-pill[data-lang=en]').click();
 await page.screenshot({path:root+'/qa/reference-1366.png'});
 }
 await browser.close();
 console.log('PASS: 12 responsive screen checks, accessibility scans, content, interactions, keyboard, reduced motion, offline file loading.');
})().catch(e=>{console.error(e);process.exit(1)});
