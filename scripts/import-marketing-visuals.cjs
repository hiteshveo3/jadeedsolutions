/* Owner-selected local asset import. Keep originals and a source/placement manifest. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');
const source = 'C:/Jadeed Marketing/jadeed-marketing/public';
const rootFiles = JSON.parse(fs.readFileSync('reports/image-expansion/source-files.json', 'utf8'));
const whatsApp = JSON.parse(fs.readFileSync('C:/Jadeed Marketing/jadeed-marketing/audit/image-review/inventory.json', 'utf8'));

const photos = [
  [0,'phone-payment','Man showing a payment confirmation on his phone'],
  [1,'headphones-campaign','Woman wearing headphones against a purple background'],
  [2,'mobile-selfie','Man holding a smartphone above him'],
  [3,'construction-professional','Woman wearing a yellow construction helmet'],
  [4,'customer-phone-call','Woman smiling while talking on the phone'],
  [5,'customers-mobile-search','Two people comparing information on their phones'],
  [6,'mobile-search-closeup','Hands using a smartphone against a blue background'],
  [8,'couple-yellow-background','Two people seated against a yellow background'],
  [9,'food-menu-laptop','Couple browsing food options on a laptop'],
  [10,'colourful-portrait-framing','Woman holding her hands in a frame around her face'],
  [11,'bright-campaign-portrait','Woman smiling against a yellow background'],
  [13,'expressive-campaign-portrait','Woman with a surprised expression in a yellow shirt'],
  [14,'business-owner-laptop','Woman sitting with a laptop'],
  [15,'mobile-social-frame','Woman using a phone inside an illustrated social media frame'],
  [16,'mobile-portrait-composition','Man pictured inside an illustrated mobile screen'],
  [17,'contractor-yellow-helmet','Contractor wearing a yellow helmet and checked shirt'],
  [19,'delivery-worker-packages','Delivery worker holding a parcel and takeaway containers'],
  [21,'professional-colour-portrait','Woman wearing a suit and green glasses'],
  [24,'customer-online-order','Man holding a phone with packages beside him'],
  [25,'customer-checking-phone','Woman smiling while using her smartphone'],
  [28,'business-customer-conversation','Woman seated across a desk from another person'],
  [31,'mover-stacked-boxes','Mover carrying a stack of cardboard boxes'],
  [33,'photographer-at-work','Photographer holding a camera beside a desk'],
  [34,'delivery-worker-box','Worker in a blue polo shirt holding a cardboard box'],
  [38,'laptop-campaign-composition','Woman with a laptop against a colourful illustrated background'],
  [39,'portrait-green-hat','Portrait of a man wearing a green knitted hat'],
  [44,'photographer-blue-jacket','Photographer holding a camera to his eye'],
  [45,'portrait-green-jacket','Man looking through green glasses toward the camera'],
  [47,'social-platforms-laptop','Woman using a laptop surrounded by social platform symbols'],
  [49,'customer-mobile-screen','Man holding a smartphone with a purple screen'],
  [50,'seasonal-travel-photo','Person sitting in a deckchair holding a phone'],
  [51,'business-website-laptop','Business professional holding an open laptop'],
  [53,'construction-planning','Construction professional holding a clipboard'],
  [54,'photographer-striped-shirt','Photographer looking through a camera'],
  [55,'phone-user-expression','Man with glasses looking at a smartphone'],
  [56,'business-reporting-documents','Professional holding printed charts and documents'],
  [57,'construction-high-visibility','Worker wearing a white helmet and high-visibility vest'],
  [59,'mobile-campaign-blue','Man looking at his phone against a blue background'],
  [60,'energetic-campaign-purple','Person calling out against a purple background'],
  [61,'bookings-dashboard-example','Illustrative dashboard showing booked jobs'],
  [63,'laptop-orange-chair','Woman using a laptop in an orange chair'],
  [64,'mobile-customer-purple','Man looking at a smartphone against a purple background'],
  [75,'restaurant-kitchen-cook','Cook working at a kitchen counter'],
  [77,'customer-support-headset','Customer support professional wearing a headset'],
  [78,'customer-website-browsing','Man using a laptop in a yellow armchair'],
  [80,'hand-held-smartphone','Hand holding a smartphone against a yellow background'],
  [83,'lifestyle-campaign-couple','Two people smiling against a yellow background'],
  [84,'campaign-portrait-hands','Woman posing with her hands framing her face'],
  [87,'home-service-visit','Home service technician talking with a homeowner'],
  [92,'maps-ranking-example','Illustrative Google Maps ranking dashboard'],
  [96,'paid-jobs-dashboard-example','Illustrative dashboard showing completed and paid jobs'],
  [99,'customer-browsing-cakes','Woman browsing cake photos on her phone'],
  [100,'qualified-leads-example','Illustrative dashboard showing calls and form submissions'],
  [102,'revenue-dashboard-example','Illustrative dashboard showing tracked revenue'],
  [103,'search-performance-example','Illustrative Search Console impressions dashboard'],
  [104,'technology-professional','Portrait of a professional in a dark shirt'],
  [106,'moving-service-worker','Moving service worker lifting a cardboard box'],
];
const tradePhotos = [
  [31,'landscaping-house-garden','Flower beds beside a house and garden path'],
  [32,'landscaping-flower-path','Garden path bordered by colourful flowers'],
  [34,'landscaping-stepping-stones','Stepping stones and planting beside a modern house'],
  [35,'lawn-care-green-garden','Green garden lawn surrounded by planting'],
  [38,'landscaping-courtyard','Narrow courtyard with potted plants and a gravel path'],
  [39,'bakery-layered-cake','Layered chocolate cake on a cake stand'],
  [40,'bakery-professional','Chef in a white jacket standing with folded arms'],
  [41,'bakery-mixing-ingredients','Hands cracking an egg into a glass mixing bowl'],
  [43,'bakery-cake-decoration','Baker decorating a layered chocolate cake'],
  [53,'food-shop-owner','Woman in an apron standing beside fresh produce'],
  [54,'local-business-owner','Man standing outside with his arms folded'],
  [55,'food-market-owner','Woman in an apron holding produce at a market'],
  [56,'food-store-owner','Woman in an apron standing in a produce shop'],
  [58,'catering-food-preparation','Woman preparing vegetables at a kitchen counter'],
  [59,'catering-fresh-salad','Woman holding a plate of fresh salad'],
  [60,'catering-kitchen-counter','Woman preparing food beside a kitchen counter'],
  [61,'bakery-dough-preparation','Woman preparing dough in a home kitchen'],
  [62,'bakery-flour-preparation','Baker preparing flour and dough in a kitchen'],
  [64,'home-kitchen-cooking','Woman working at a stove in a home kitchen'],
  [65,'cleaning-window-glass','Woman wearing gloves cleaning window glass'],
  [66,'cleaning-kitchen-counter','Woman wiping a kitchen counter with a cloth'],
  [67,'cleaning-kitchen-cloth','Cleaner holding a cloth beside a kitchen counter'],
  [68,'cleaning-kitchen-cabinet','Cleaner wearing gloves wiping a kitchen cabinet'],
];
const references = [
  [7,'food-app-offer','Food ordering campaign with an orange product and headline'],
  [12,'launch-announcement','Blue launch announcement with a bold headline'],
  [18,'green-service-campaign','Green service campaign with a product illustration'],
  [20,'partnership-campaign','Green partnership announcement with handshake imagery'],
  [26,'social-campaign-headline','Red social campaign with a large headline and portrait'],
  [27,'music-campaign-green','Green music campaign with headphones and a laptop'],
  [29,'service-offer-blue','Blue service campaign with a portrait and headline'],
  [30,'mobile-payments-campaign','Mobile payment campaign with a phone user'],
  [32,'seasonal-campaign-blue','Bright seasonal campaign with a portrait and blue background'],
  [35,'orange-drink-campaign','Orange beverage campaign with a portrait and product'],
  [37,'beverage-headline-composition','Beverage campaign combining a close portrait and headline'],
  [40,'retail-shopping-campaign','Retail campaign showing a customer with a shopping trolley'],
  [42,'review-campaign-green','Green review campaign with a customer portrait'],
  [48,'retail-offer-campaign','Retail offer campaign with a large discount message'],
  [52,'creative-services-campaign','Creative services campaign with a green headline'],
  [66,'music-subscription-campaign','Music subscription campaign with a product price'],
  [76,'food-delivery-campaign','Food delivery campaign with an orange background'],
  [79,'social-conversation-campaign','Green conversation campaign with two portraits'],
  [81,'weekly-campaign-green','Weekly campaign with green typography and a portrait'],
  [85,'beverage-product-portrait','Beverage campaign featuring a customer and product'],
  [86,'new-week-campaign','Green weekly campaign with large type and a portrait'],
];
const referenceIds = [1,3,5,6,9,13,17,18,19,20,21,22,23,25,27,29,30,33,70,71,72,74,77,80];

// Every imported asset has a primary page; extra placements are intentional reuse.
const placements = {
  home: ['r6','r17','r77'],
  'how-it-works': ['r0','r25','r56','r96','r102'],
  'service:seo': ['r4','r5','r61','r92','r103'],
  'service:web-development': ['r14','r51','r78','r104'],
  'service:app-development': ['r2','r15','r16','r49','r64','r80','r47'],
  'service:digital-advertising': ['r1','r11','r13','r21','r24','r38','r39','r45','r50','r55','r59','r60','r63','r83'],
  'industry:seo-for-plumbers': ['r19','r28','r87'],
  'industry:seo-for-cleaners': ['w66','w68'],
  'industry:seo-for-uk-removals': ['r31','r34','r106'],
  'industry:seo-for-local-service-businesses': ['w31','w32','w34','w35','w38'],
  'guide:how-plumbers-get-more-jobs-online': ['r3','r53','r57','r100'],
  'guide:how-cleaning-companies-get-more-bookings': ['w64','w65','w67'],
  'guide:website-seo-app-or-10-percent': ['r8','w53','w54','w55','w56'],
  'blog:how-to-talk-to-app-clients-restaurant-example': ['r9','r75','r99','w39','w40','w41','w43','w58','w59','w60','w61','w62'],
  'blog:download-public-instagram-photos-without-login': ['r10','r33','r44','r54','r84'],
  'campaign:colour-and-message': references.filter(([id])=>![7,35,37,40,48,76,85].includes(id)).map(([id])=>'r'+id),
  'campaign:food-and-retail': ['r7','r35','r37','r40','r48','r76','r85', ...[29,30,33].map(id=>'w'+id)],
  'campaign:seasonal': [1,3,5,6,9,13,17,18,19,20,21,22,23,25,27].map(id=>'w'+id),
  'campaign:local-services': [70,71,72,74,77,80].map(id=>'w'+id),
};
const referenceDescriptions = {
  1:'Yellow and blue social campaign with a phone and headphones',3:'Orange announcement with a portrait and repeated headline',
  5:'Orange portrait collage with customer expressions',6:'Green brand recognition campaign with illustrated character',
  9:'Green campaign featuring large numerical typography',13:'Yellow creativity campaign with a bold handwritten headline',
  17:'Green weekend campaign showing two seated customers',18:'Green Friday campaign with oversized rounded typography',
  19:'Light green Friday campaign with a seated customer',20:'Orange Friday campaign with a couple and large white type',
  21:'Green Friday campaign with stacked typography',22:'Yellow and orange Friday campaign with a customer portrait',
  23:'Orange Friday campaign with a customer using a laptop',25:'Bright green mobile banking campaign',27:'Yellow Friday campaign with a customer portrait',
  29:'Orange grocery campaign with produce and a customer',30:'Green seasonal campaign with plants and a customer',33:'Green fresh produce campaign with a grocery worker',
  70:'Cleaning campaign with a mop and playful headline',71:'Cleaning campaign contrasting a service message and a customer',
  72:'Dark green cleaning campaign with a clear call to action',74:'Light green cleaning campaign with a customer portrait',
  77:'Green cleaning campaign showing a cleaner and service offer',80:'Moving campaign showing a worker carrying boxes',
};

async function main() {
  fs.mkdirSync('public/images/marketing', { recursive: true });
  const all = [
    ...photos.map(([id,name,alt])=>({id:'r'+id,file:rootFiles[id],name,alt,kind:name.includes('example')?'dashboard':'photo'})),
    ...tradePhotos.map(([id,name,alt])=>({id:'w'+id,file:whatsApp.find(x=>x.id===id).file,name,alt,kind:'photo'})),
    ...references.map(([id,name,alt])=>({id:'r'+id,file:rootFiles[id],name,alt,kind:'reference'})),
    ...referenceIds.map(id=>({id:'w'+id,file:whatsApp.find(x=>x.id===id).file,name:'campaign-reference-'+id,alt:referenceDescriptions[id],kind:'reference'})),
  ];
  const catalog = {}, hashes = new Map(), manifest = [];
  for (const entry of all) {
    const input = path.join(source,entry.file), bytes=fs.readFileSync(input);
    const hash=crypto.createHash('sha256').update(bytes).digest('hex');
    if(hashes.has(hash)) throw new Error(`Duplicate source: ${entry.id} and ${hashes.get(hash)}`);
    hashes.set(hash,entry.id);
    const src='/images/marketing/'+entry.name+'.webp';
    const output = await sharp(bytes).rotate().resize({width:1200,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:82,effort:5}).toFile('public'+src);
    catalog[entry.id]={src,alt:entry.alt,width:output.width,height:output.height,kind:entry.kind};
    const keys=Object.entries(placements).filter(([,ids])=>ids.includes(entry.id)).map(([key])=>key);
    if(!keys.length)throw Error('Unplaced asset: '+entry.id);
    manifest.push({...entry,src,sha256:hash,width:output.width,height:output.height,originalBytes:bytes.length,optimizedBytes:output.size,placements:keys});
  }
  for(const [key,ids] of Object.entries(placements))for(const id of ids)if(!catalog[id])throw Error(`${key}: missing ${id}`);
  fs.writeFileSync('lib/marketing-visuals.ts', '/** Curated local images. Source and placement audit: reports/image-expansion/manifest.json. */\nexport type MarketingVisual = { src: string; alt: string; width: number; height: number; kind: "photo" | "reference" | "dashboard" };\n\nexport const marketingVisuals: Record<string, MarketingVisual> = '+JSON.stringify(catalog,null,2)+';\n\nexport const visualPlacements: Record<string, string[]> = '+JSON.stringify(placements,null,2)+';\n\nexport function getMarketingVisuals(key: string): MarketingVisual[] { return (visualPlacements[key] ?? []).map(id => marketingVisuals[id]); }\n');
  fs.writeFileSync('reports/image-expansion/manifest.json',JSON.stringify(manifest,null,2));
  const total = manifest.reduce((v,i)=>v+i.optimizedBytes,0), original=manifest.reduce((v,i)=>v+i.originalBytes,0);
  fs.writeFileSync('reports/image-expansion/README.md', `# Image expansion — 4 October 2026\n\n${manifest.length} unique source images imported from Jadeed Marketing/public.\n\nOriginal size: ${(original/1048576).toFixed(2)} MB. WebP size: ${(total/1048576).toFixed(2)} MB.\n\n`+Object.entries(placements).map(([k,v])=>`- ${k}: ${v.length} images`).join('\n')+'\n\nPhotos are illustrations, campaign images are labelled references, and dashboard examples are labelled illustrative. No imported portrait is used as a team member or testimonial author. Originals remain unchanged.\n');
  console.log(JSON.stringify({uniqueImages:manifest.length,originalMB:original/1048576,optimizedMB:total/1048576,placements:Object.fromEntries(Object.entries(placements).map(([k,v])=>[k,v.length]))},null,2));
}
main().catch(e=>{console.error(e);process.exit(1)});
