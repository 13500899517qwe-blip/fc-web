/**
 * Comprehensive product database scraped from Alibaba.
 * Used as the primary product source when Payload CMS is not seeded.
 * Structure mirrors the collection schema for easy migration.
 */

export type ProductRecord = {
  sku: string
  title: string
  slug: string
  partNumber?: string
  summary?: string
  description?: string
  vehicleBrand: string
  category: string
  priceRange?: string
  moq?: string
  /** 4-6 gallery images from Alibaba CDN */
  gallery: string[]
  /** Key attributes: material, condition, color, place of origin, purpose */
  specs: Record<string, string>
  featured: boolean
}

const products: ProductRecord[] = [
  {
    "sku": "1601820278025",
    "title": "High Quality Lower Bumper Grille 86522-1M600 Fit for 2012 for Kia Cerato Forte K3",
    "slug": "bumper-grille-86522-kia-cerato",
    "partNumber": "865221M600",
    "vehicleBrand": "Kia",
    "category": "CAR GRILLE",
    "priceRange": "$16-17",
    "moq": "5 pieces",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/H2176ba85b43f4595a01703e735f0c837D.png",
      "https://s.alicdn.com/@sc04/kf/H56fd576f4d13465494f732af88e0b496J.png",
      "https://s.alicdn.com/@sc04/kf/H382286403b044f9991fbe7032dc2d3acn.png",
      "https://s.alicdn.com/@sc04/kf/H5befb761a7ad4f84a57f66072dffd674T.png",
      "https://s.alicdn.com/@sc04/kf/H873122d92ab64125b01004a21b1fe96dv.png"
    ],
    "specs": { "Material": "ABS", "Condition": "New", "Brand Name": "FENG CHENG", "Car Make": "2012 for Kia Cerato Forte K3,", "Place of Origin": "Danyang, Jiangsu (China)", "Color": "Black" },
    "featured": true
  },
  {
    "sku": "1601820163740",
    "title": "Factory Wholesale Front Bumper Grille 86350-1U000 for 2009-2013 for Kia Cerato",
    "slug": "bumper-grille-86350-kia-cerato",
    "vehicleBrand": "Kia",
    "category": "CAR GRILLE",
    "priceRange": "$24-26",
    "moq": "5 pieces",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/H5049a4d667a441289410638a35af0705x.png",
      "https://s.alicdn.com/@sc04/kf/Hfa0ebe3bc0bc4dd388fd5d386fc6034bQ.png",
      "https://s.alicdn.com/@sc04/kf/Hf38dab5ce8f5454fbd2527712a1bc771Q.png",
      "https://s.alicdn.com/@sc04/kf/H70f1b55e7bcb40688f8ee6e6f35311bc5.png",
      "https://s.alicdn.com/@sc04/kf/Hb7cf6cd6b55249d1be37dfe49a146ccc8.png",
      "https://s.alicdn.com/@sc04/kf/H58fd15e1744b4858bc25f87c6ea1f2d1d.png"
    ],
    "specs": { "Material": "ABS", "Condition": "New", "Brand Name": "FENG CHENG", "Car Make": "2009-2013 for Kia Cerato", "Place of Origin": "Danyang, Jiangsu (China)" },
    "featured": true
  },
  {
    "sku": "1601820663814",
    "title": "Brand New Front Bumper Tow Hook Cover for 2015 for Lexus IS250",
    "slug": "tow-hook-cover-lexus-is250",
    "partNumber": "5212953913",
    "vehicleBrand": "Lexus",
    "category": "BUMPER & COVER",
    "priceRange": "$6-7",
    "moq": "20 pieces",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/Hf55b46fbc08e4ae7ba9525ffa0c4bc0a1.png",
      "https://s.alicdn.com/@sc04/kf/H75b25940ddc34075955a00cedabf26f35.png",
      "https://s.alicdn.com/@sc04/kf/Hba7715e1dadf43dc8fc4447d08cdd090w.png",
      "https://s.alicdn.com/@sc04/kf/H4eab634f7ba948f794a005c32f13fed0O.png",
      "https://s.alicdn.com/@sc04/kf/Hd06b40e9735143edb21bdd99b2a48670d.png"
    ],
    "specs": { "Color": "PositionFront Bumper", "Condition": "New", "Brand Name": "FENG CHENG", "Car Make": "2015 for Lexus IS250", "OE NO.": "5212953913", "Place of Origin": "Danyang, Jiangsu (China)" },
    "featured": true
  },
  {
    "sku": "1601777844941",
    "title": "Left & Right Front Fenders for 2012-2016 for Daihatsu Grand Max",
    "slug": "front-fenders-daihatsu-grand-max",
    "vehicleBrand": "Daihatsu",
    "category": "FENDER & DOOR",
    "priceRange": "$50-60",
    "moq": "5 pieces",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/He4689ea4ff574dd1a0223626d8b40eff5.png",
      "https://s.alicdn.com/@sc04/kf/H21395ab0749d4a3d90ae39e4b7a92a46o.png",
      "https://s.alicdn.com/@sc04/kf/Ha4c6b91421364f2e8669db143662db45n.png",
      "https://s.alicdn.com/@sc04/kf/Hecb23a76e0a64a0bb8d72fa7ee86b6d0S.png",
      "https://s.alicdn.com/@sc04/kf/H90ebd51447fa4460a8d28275903a18013.png"
    ],
    "specs": { "Condition": "New", "Brand Name": "FENG CHENG", "Car Make": "2012-2016 for Daihatsu Grand Max", "Place of Origin": "Danyang, Jiangsu (China)" },
    "featured": true
  },
  {
    "sku": "1601770335214",
    "title": "Rear Door Left & Right Driver Passenger Side for 2015 for Toyota Sienna",
    "slug": "rear-door-toyota-sienna-2015",
    "vehicleBrand": "Toyota",
    "category": "FENDER & DOOR",
    "priceRange": "$110-130",
    "moq": "1 piece",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/H96e3bd0ba5654690bcfb1061405d0e5dQ.png",
      "https://s.alicdn.com/@sc04/kf/Hbf99b920a918411b8eea7080c337f5b1u.png",
      "https://s.alicdn.com/@sc04/kf/H08d11b5ba2964898836529818c8671c0Y.png",
      "https://s.alicdn.com/@sc04/kf/H15351cfe5a374fe3bb510f18862b88e4v.png",
      "https://s.alicdn.com/@sc04/kf/H09bb09ecf8164ba291eaf66d75becc60z.png",
      "https://s.alicdn.com/@sc04/kf/Ha564001a695547ccb7e399f6b06e6821S.png"
    ],
    "specs": { "Condition": "New", "Brand Name": "FENG CHENG", "Car Make": "2015 for Toyota Sienna", "Place of Origin": "Danyang, Jiangsu (China)", "Size": "OEM Standard Size" },
    "featured": true
  },
  {
    "sku": "1601770277995",
    "title": "New Steel Tailgate for 2023 for Toyota Venza",
    "slug": "steel-tailgate-toyota-venza-2023",
    "vehicleBrand": "Toyota",
    "category": "TAILGATE & PANEL",
    "priceRange": "$100-120",
    "moq": "1 piece",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/H5d6895eb79d649809b1770912c064cf6X.png",
      "https://s.alicdn.com/@sc04/kf/H4e5234af7e09421da9dd4453413b2c1ei.png",
      "https://s.alicdn.com/@sc04/kf/H659d280987164d13b1a3962c4bc3500aR.png",
      "https://s.alicdn.com/@sc04/kf/Hf69da7f3e95c4e7bbbbdb4a28a7b5535a.png",
      "https://s.alicdn.com/@sc04/kf/H69fb8719f9a142269dd0db55bb5b8696M.png",
      "https://s.alicdn.com/@sc04/kf/H1527999376f4454fa2e9a92c3ec6b15dP.png"
    ],
    "specs": { "Condition": "New", "Brand Name": "FENG CHENG", "Car Make": "2023 for Toyota Venza", "Place of Origin": "Danyang, Jiangsu (China)" },
    "featured": true
  },
  {
    "sku": "1601777848553",
    "title": "Left & Right Front Fenders for 2014 for Nissan X-Trail",
    "slug": "front-fenders-nissan-xtrail-2014",
    "vehicleBrand": "Nissan",
    "category": "FENDER & DOOR",
    "priceRange": "$50-60",
    "moq": "10 pieces",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/H56e6abdd163c40409b3169ff5fbcfc56M.png",
      "https://s.alicdn.com/@sc04/kf/Hddd1819ec77c404db0402dca35ea2285t.png",
      "https://s.alicdn.com/@sc04/kf/Hcd787683ba79453cb085c0930093642ci.png",
      "https://s.alicdn.com/@sc04/kf/H699aaa44333241f496185ba0da319c497.png",
      "https://s.alicdn.com/@sc04/kf/H05978a61e57b48b28c68af04b9b1b8a2z.png",
      "https://s.alicdn.com/@sc04/kf/Hbf7b5a8734f34c07a5c825e4cd45ce7f0.png"
    ],
    "specs": { "Material": "Steel", "Condition": "New", "Brand Name": "FENG CHENG", "Car Make": "2014 for Nissan X-Trail", "Place of Origin": "Danyang, Jiangsu (China)", "Size": "As OEM Size", "Warranty": "1 Year" },
    "featured": true
  },
  {
    "sku": "1601783962423",
    "title": "Replacement Rear Tailgate Panel for 2020 for Isuzu D-MAX",
    "slug": "tailgate-panel-isuzu-dmax-2020",
    "vehicleBrand": "Isuzu",
    "category": "TAILGATE & PANEL",
    "priceRange": "$50-60",
    "moq": "1 piece",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/Hd2738d4adccd41769c8558c5eea44942v.png",
      "https://s.alicdn.com/@sc04/kf/Hd78ef7dffa8a4623aabf104f5f8c2b22I.png",
      "https://s.alicdn.com/@sc04/kf/H544a3a47b9d1457fa725571c307a0d57N.png",
      "https://s.alicdn.com/@sc04/kf/H060276b7dec848bb809fbd79459a7cbag.png",
      "https://s.alicdn.com/@sc04/kf/H0b55cf9dcaa0422bb053de695a5aeac11.png",
      "https://s.alicdn.com/@sc04/kf/Hffc9c353c38c4127a69dedba27cecc3eE.png"
    ],
    "specs": { "Condition": "New", "Brand Name": "FENGCHENG", "Car Make": "2020 for Isuzu D-MAX", "Place of Origin": "Danyang, Jiangsu (China)", "Warranty": "1 YEAR" },
    "featured": true
  },
  {
    "sku": "1601780046835",
    "title": "Steel Engine Hood Bonnet & ABS Hood Deflector Set for 2008-2012 Isuzu D-MAX",
    "slug": "engine-hood-isuzu-dmax-2008",
    "vehicleBrand": "Isuzu",
    "category": "HOOD & BONNET",
    "priceRange": "$70-90",
    "moq": "1 piece",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/Hfbc0a11a5a0946a9a993331aa974aa57Q.png",
      "https://s.alicdn.com/@sc04/kf/Hd7eb9ecedf9c4c09aa5d3f30c4889f85s.png",
      "https://s.alicdn.com/@sc04/kf/H680eed5aa93c409689118bd8b5560bdcb.png",
      "https://s.alicdn.com/@sc04/kf/H10d28c74a3364edb9dd2a1b2ab88e6d7r.png",
      "https://s.alicdn.com/@sc04/kf/H5d92c8247137458899ef56eb3cd43e4c5.png",
      "https://s.alicdn.com/@sc04/kf/Hf37bd6e745274e8dafbc4473d757e75bb.jpg"
    ],
    "specs": { "Material": "Steel", "Condition": "New", "Color": "White", "Brand Name": "FENGCHENG", "Car Make": "2008-2012 for Isuzu D-MAX", "Place of Origin": "Danyang, Jiangsu (China)" },
    "featured": true
  },
  {
    "sku": "1601780071807",
    "title": "Left & Right Front Doors for 2012 for Isuzu D-MAX",
    "slug": "front-doors-isuzu-dmax-2012",
    "vehicleBrand": "Isuzu",
    "category": "FENDER & DOOR",
    "priceRange": "$90-100",
    "moq": "1 piece",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/Hdf684b1f094649419cb33094c41b1e6eW.png",
      "https://s.alicdn.com/@sc04/kf/Heb04f97eb1514d45b7995ea76daf8d23g.png",
      "https://s.alicdn.com/@sc04/kf/Ha9e01444abee4be091674a3ee26b2374U.png",
      "https://s.alicdn.com/@sc04/kf/H8b85cd1f03d54c2cb9040710350926f3C.png",
      "https://s.alicdn.com/@sc04/kf/Hb138dd6857b647de8956868af598f432A.png",
      "https://s.alicdn.com/@sc04/kf/Ha58e874ea53e41ca827ab590c35b7b40G.png"
    ],
    "specs": { "Condition": "New", "Brand Name": "FENGCHENG", "Car Make": "2012 for Isuzu D-MAX", "Place of Origin": "Danyang, Jiangsu (China)" },
    "featured": true
  },
  {
    "sku": "1601780104695",
    "title": "Steel Rear Gate Tailgate Assembly for 2017 for Isuzu D-MAX",
    "slug": "tailgate-assembly-isuzu-dmax-2017",
    "vehicleBrand": "Isuzu",
    "category": "TAILGATE & PANEL",
    "priceRange": "$70-80",
    "moq": "1 piece",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/Hd242bcf407d04b9abc922c793a7bf23cm.png",
      "https://s.alicdn.com/@sc04/kf/H4308329d7e134a8b9b65460cb289156fj.png",
      "https://s.alicdn.com/@sc04/kf/H1207103c7b90489c978c14311244a94fy.png",
      "https://s.alicdn.com/@sc04/kf/H05e6c4ad61b546abae04773f7ba592e61.png",
      "https://s.alicdn.com/@sc04/kf/H5a36ac95a3ba4bd68b8d273c804592b3G.png",
      "https://s.alicdn.com/@sc04/kf/Hb23e9a8a19d340cca829777cbbcdc6a6z.png"
    ],
    "specs": { "Condition": "New", "Brand Name": "FENGCHENG", "Car Make": "2017 for Isuzu D-MAX", "Place of Origin": "Danyang, Jiangsu (China)", "Warranty": "1 Year" },
    "featured": true
  },
  {
    "sku": "1601780165374",
    "title": "Twin Swing Rear Tailgate for 2012 for Isuzu D-MAX Pickup",
    "slug": "twin-swing-tailgate-isuzu-dmax-2012",
    "vehicleBrand": "Isuzu",
    "category": "TAILGATE & PANEL",
    "priceRange": "$55-60",
    "moq": "1 piece",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/H2a23b2311a204007a5c42860cabcc2ae9.png",
      "https://s.alicdn.com/@sc04/kf/H4fe8808193ec474a8168f6ef8df23653F.png",
      "https://s.alicdn.com/@sc04/kf/H231076967158485fa527110d091f50663.png",
      "https://s.alicdn.com/@sc04/kf/H46894241c1ab44679ee329f18844e95ey.png",
      "https://s.alicdn.com/@sc04/kf/H8d6716f95dbf43be8571e2846bcbab1fO.png"
    ],
    "specs": { "Condition": "New", "Brand Name": "FENGCHENG", "Place of Origin": "Danyang, Jiangsu (China)", "Warranty": "Other" },
    "featured": true
  },
  {
    "sku": "1601783883761",
    "title": "Steel Upper Radiator Mounting Bracket Reinforcement LH RH for 2012 Isuzu D-MAX",
    "slug": "radiator-bracket-isuzu-dmax-2012",
    "vehicleBrand": "Isuzu",
    "category": "BRACKET & SUPPORT",
    "priceRange": "$60-70",
    "moq": "1 piece",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/Ha4f19d90b90547d39a6cb63cd5bcc86aN.png",
      "https://s.alicdn.com/@sc04/kf/H5a2a8e3a95a540b4a3dde5aac3a554b9j.png",
      "https://s.alicdn.com/@sc04/kf/Hf7f8310906934d2dabbe01a88f8ef636l.png",
      "https://s.alicdn.com/@sc04/kf/H9a8b445fb09744d8ab02bd4badbe0a7a4.png",
      "https://s.alicdn.com/@sc04/kf/Hf1ba4f4a206e4c3783299615e1de0b16J.png",
      "https://s.alicdn.com/@sc04/kf/Hd6815a7710304f5e9e583a840f05bd227.png"
    ],
    "specs": { "Condition": "New", "Brand Name": "FENGCHENG", "Place of Origin": "Danyang, Jiangsu (China)", "Warranty": "1 year" },
    "featured": false
  },
  {
    "sku": "1601783927545",
    "title": "Factory Replacement Steel Radiator Support Structure for 2020 Isuzu D-MAX",
    "slug": "radiator-support-isuzu-dmax-2020",
    "vehicleBrand": "Isuzu",
    "category": "BRACKET & SUPPORT",
    "priceRange": "$60-65",
    "moq": "1 piece",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/H817e954df5c84a37b47ee5eb51aafef1V.png",
      "https://s.alicdn.com/@sc04/kf/H950051df2bf1423eb6eaaa1d7172d1930.png",
      "https://s.alicdn.com/@sc04/kf/H805269da35cf4cbcbf0d912b9af816ddz.png",
      "https://s.alicdn.com/@sc04/kf/H08b7849816374389bee4546703308b76f.png",
      "https://s.alicdn.com/@sc04/kf/Hd5f0cbd2ad76425abb1b980cbcf5973df.png",
      "https://s.alicdn.com/@sc04/kf/Hf61f688f48de4846b6c14cdc79efec24g.png"
    ],
    "specs": { "Condition": "New", "Brand Name": "FENGCHENG", "Place of Origin": "Danyang, Jiangsu (China)", "Warranty": "1 Year" },
    "featured": false
  },
  {
    "sku": "1601783980339",
    "title": "Modified Engine Hood for 2021 for Isuzu D-MAX",
    "slug": "modified-hood-isuzu-dmax-2021",
    "vehicleBrand": "Isuzu",
    "category": "HOOD & BONNET",
    "priceRange": "$90-110",
    "moq": "1 piece",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/H66871ecddcaf4e23a1ad6e6d5297b76fC.png",
      "https://s.alicdn.com/@sc04/kf/Ha37e5591e7ae4255a5bcc5e4316a44c9g.png",
      "https://s.alicdn.com/@sc04/kf/H88295c107f40437fbb97a702f4aee733L.png",
      "https://s.alicdn.com/@sc04/kf/H4f6563e67f644af1a5a3d34bf6a2df4eN.png",
      "https://s.alicdn.com/@sc04/kf/Haf2f30548a06423a85b5d7bbc04eb385S.png",
      "https://s.alicdn.com/@sc04/kf/H1a9823ddb87047db89097fdbe67e6094N.png"
    ],
    "specs": { "Material": "Steel", "Condition": "New", "Color": "White", "Brand Name": "FENGCHENG", "Car Make": "2021 for Isuzu D-MAX", "Place of Origin": "Danyang, Jiangsu (China)", "Warranty": "1 Year" },
    "featured": false
  },
  {
    "sku": "1601784004007",
    "title": "Left & Right Front Fenders for 2012 for Isuzu D-MAX 4WD",
    "slug": "front-fenders-isuzu-dmax-4wd-2012",
    "vehicleBrand": "Isuzu",
    "category": "FENDER & DOOR",
    "priceRange": "$65-75",
    "moq": "10 pieces",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/H96ccc22d8f4c4f2ea95c3df610683651b.png",
      "https://s.alicdn.com/@sc04/kf/Haa8f63982e4f42b9b9323277da35752f0.png",
      "https://s.alicdn.com/@sc04/kf/H843096bdd72a4c4fb7980e7ac45448f8W.png",
      "https://s.alicdn.com/@sc04/kf/H6f24b0a0405c4a84a34960e5d1063495Z.png",
      "https://s.alicdn.com/@sc04/kf/H70700f44fc594517b4617811aacbcfb9d.png",
      "https://s.alicdn.com/@sc04/kf/H05cca1a9bde44da18c850210a0520dbef.png"
    ],
    "specs": { "Material": "Steel", "Condition": "New", "Brand Name": "FENGCHENG", "Car Make": "2012 for Isuzu D-MAX 4WD", "Place of Origin": "Danyang, Jiangsu (China)", "Warranty": "1year" },
    "featured": false
  },
  {
    "sku": "1601780080796",
    "title": "Rear Cargo Tailgate Panel for 2012 for Isuzu D-MAX",
    "slug": "cargo-tailgate-isuzu-dmax-2012",
    "vehicleBrand": "Isuzu",
    "category": "TAILGATE & PANEL",
    "priceRange": "$60-80",
    "moq": "1 piece",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/H939ec033b1654131a866605d9a05456fc.png",
      "https://s.alicdn.com/@sc04/kf/H94166075dbe948e5a363a3bde77c728fW.png",
      "https://s.alicdn.com/@sc04/kf/H99123adef2314f89a8d0f42371cf22bbG.png",
      "https://s.alicdn.com/@sc04/kf/He1de637888974a768bfb32fe3b43344bW.png",
      "https://s.alicdn.com/@sc04/kf/Hf5830747ba9c4a08ac487d448ab39f3el.png",
      "https://s.alicdn.com/@sc04/kf/H7b6177fea13e4d3bb4ab00c39aefc6c34.jpg"
    ],
    "specs": { "Material": "Steel", "Condition": "New", "Brand Name": "FENGCHENG", "Car Make": "2012 for Isuzu D-MAX", "Place of Origin": "Danyang, Jiangsu (China)", "Warranty": "1 Year" },
    "featured": false
  },
  {
    "sku": "1601780083673",
    "title": "Steel Rear Tailgate for 2017 for Isuzu D-MAX Pickup Truck",
    "slug": "rear-tailgate-isuzu-dmax-2017",
    "vehicleBrand": "Isuzu",
    "category": "TAILGATE & PANEL",
    "priceRange": "$55-60",
    "moq": "1 unit",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/H294b8c2a37a6403884a33b2abb1ca4153.png",
      "https://s.alicdn.com/@sc04/kf/Hac1e13324df94c9db8508b0736244f4bd.png",
      "https://s.alicdn.com/@sc04/kf/H3a3e2014d23a4cd3ba8b3d9a4c7a83a6l.png",
      "https://s.alicdn.com/@sc04/kf/H945796faeff14ba18806a18d6a71a612y.png",
      "https://s.alicdn.com/@sc04/kf/H94b59ffe2df14abcaf202da3a909ec39k.jpg"
    ],
    "specs": { "Condition": "New", "Brand Name": "FENGCHENG", "Car Make": "2017 for Isuzu D-MAX", "Place of Origin": "Danyang, Jiangsu (China)", "Warranty": "1 Year" },
    "featured": false
  },
  {
    "sku": "1601780178085",
    "title": "2004-2007 for Great Wall Wingle Rear Middle Door Set (LH/RH)",
    "slug": "rear-door-great-wall-wingle",
    "vehicleBrand": "Great Wall",
    "category": "FENDER & DOOR",
    "priceRange": "$90-100",
    "moq": "1 piece",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/H40e9e2619c2f4a02a93e2dfd21447bf35.png",
      "https://s.alicdn.com/@sc04/kf/H1361345ca52d470eb345f5fa6270e212n.png",
      "https://s.alicdn.com/@sc04/kf/Hcb8f1846b61244c196c5a05e4eddaf99D.png",
      "https://s.alicdn.com/@sc04/kf/H77c4a578233d437fa1d10a18bd139ac4j.png",
      "https://s.alicdn.com/@sc04/kf/H4c51e77700a8433e94755f1e4b94fae0K.png",
      "https://s.alicdn.com/@sc04/kf/H3b43a0ee368d43f68b94090dea7d9569B.jpg"
    ],
    "specs": { "Condition": "New", "Brand Name": "FENGCHENG", "Car Make": "2004-2007 for Great Wall Wingle", "Place of Origin": "Danyang, Jiangsu (China)", "Warranty": "1 year" },
    "featured": false
  },
  {
    "sku": "1601783897618",
    "title": "Engine Hood Bonnet for 2017 for Isuzu D-MAX",
    "slug": "hood-isuzu-dmax-2017",
    "vehicleBrand": "Isuzu",
    "category": "HOOD & BONNET",
    "priceRange": "$100-120",
    "moq": "1 piece",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/H4689646abd6e4149a8889ac2eef24bdbI.png",
      "https://s.alicdn.com/@sc04/kf/H45db7eb20a7e4106a50fbfb09138b927T.png",
      "https://s.alicdn.com/@sc04/kf/Haa411a46b9cb459c9ccd89e0e00b7ac5l.png",
      "https://s.alicdn.com/@sc04/kf/Ha51033e173f446b78c59834a85aeafd7A.png",
      "https://s.alicdn.com/@sc04/kf/H48851e8331854218a8ff03f1f554997fK.png",
      "https://s.alicdn.com/@sc04/kf/H7233b356d0d74efaaacc5af15a2b8c33h.png"
    ],
    "specs": { "Material": "Steel", "Condition": "New", "Color": "White", "Brand Name": "FENGCHENG", "Car Make": "2017 for Isuzu D-MAX", "Place of Origin": "Danyang, Jiangsu (China)", "Warranty": "1 Year" },
    "featured": false
  },
  {
    "sku": "1601783929515",
    "title": "Steel Roof Assembly for 2012 for Isuzu D-MAX Pickup",
    "slug": "roof-assembly-isuzu-dmax-2012",
    "vehicleBrand": "Isuzu",
    "category": "ROOF & PANEL",
    "priceRange": "$55-65",
    "moq": "1 piece",
    "gallery": [
      "https://s.alicdn.com/@sc04/kf/Hd4384f4c63a243c79fa456dc3b7c4545A.png",
      "https://s.alicdn.com/@sc04/kf/Hd038db8de5b84ca688c71fde3fb96260Q.png",
      "https://s.alicdn.com/@sc04/kf/Hc163ce13fdef41d189e507f21cd3ace9x.png",
      "https://s.alicdn.com/@sc04/kf/Hfc4e6f71f6604e848371c223d6c46c671.png",
      "https://s.alicdn.com/@sc04/kf/H4a847b7032b3431ebe8295bdbe2d6c0f7.png",
      "https://s.alicdn.com/@sc04/kf/H4159670628d24ac6a69b966edb89300d5.png"
    ],
    "specs": { "Material": "Steel", "Condition": "New", "Brand Name": "FENG CHENG", "Place of Origin": "Danyang, Jiangsu (China)" },
    "featured": false
  }
]

export default products

export function getProductBySku(sku: string): ProductRecord | undefined {
  return products.find(p => p.sku === sku)
}

export function getProductBySlug(slug: string): ProductRecord | undefined {
  // Match by slug or SKU (since static slugs = SKU)
  return products.find(p => p.slug === slug || p.sku === slug)
}

export function findProductsByBrand(brand: string): ProductRecord[] {
  return products.filter(p => p.vehicleBrand.toLowerCase() === brand.toLowerCase())
}

export function findProductsByCategory(category: string): ProductRecord[] {
  return products.filter(p => p.category === category)
}

/**
 * All 96 products from Alibaba store — basic catalog data.
 * Products with detail data (gallery + specs) are in the main array above.
 */
export const catalogProducts: Array<{
  sku: string
  title: string
  slug: string
  vehicleBrand: string
  category: string
  priceRange?: string
  moq?: string
}> = products.map(({ gallery, specs, partNumber, featured, ...rest }) => rest)

/** Simple slugify: lowercase, replace non-alnum with hyphens */
function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

/**
 * Find a product by any slug format — supports both SKU-based slugs
 * and Payload CMS title-based slugs (long, hyphenated titles).
 */
/**
 * Lightweight product for catalog entries without full detail data.
 * Generated on-the-fly to ensure every product in the catalog has a page.
 */
function catalogLookup(urlSlug: string): ProductRecord | undefined {
  for (const entry of catalogProducts) {
    const titleSlug = slugify(entry.title)
    if (urlSlug.includes(titleSlug) || titleSlug.includes(urlSlug)) {
      return {
        sku: entry.sku,
        title: entry.title,
        slug: entry.slug,
        vehicleBrand: entry.vehicleBrand,
        category: entry.category,
        priceRange: entry.priceRange,
        moq: entry.moq,
        gallery: [],
        specs: {},
        featured: false,
      }
    }
  }
  return undefined
}

export function findProductByAnySlug(urlSlug: string): ProductRecord | undefined {
  // Direct match first (fast path)
  const direct = getProductBySlug(urlSlug)
  if (direct) return direct

  // Try matching slugified title against URL slug
  const detailed = products.find(p => {
    const titleSlug = slugify(p.title)
    return urlSlug.includes(titleSlug) || titleSlug.includes(urlSlug)
  })
  if (detailed) return detailed

  // Fall back to catalog entries (lightweight, no gallery)
  return catalogLookup(urlSlug)
}

export function getAllBrands(): string[] {
  return [...new Set(products.map(p => p.vehicleBrand))].sort()
}

export function getAllCategories(): string[] {
  return [...new Set(products.map(p => p.category))].sort()
}

export function searchProducts(q: string): ProductRecord[] {
  const query = q.toLowerCase()
  return products.filter(p =>
    p.title.toLowerCase().includes(query) ||
    p.sku.toLowerCase().includes(query) ||
    p.partNumber?.toLowerCase().includes(query) ||
    p.vehicleBrand.toLowerCase().includes(query)
  )
}
