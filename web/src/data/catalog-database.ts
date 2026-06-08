/**
 * Complete product catalog — all 96 products from Alibaba store.
 * Products with full detail (gallery + specs) are in products-database.ts.
 * This covers basic listing data for all products in the store.
 */
import type { ProductRecord } from './products-database'

export interface CatalogEntry {
  sku: string
  title: string
  vehicleBrand: string
  category: string
  priceRange?: string
  moq?: string
}

// Generate slug from SKU (aliId) since slug is deterministic
function makeSlug(sku: string, title: string): string {
  return sku
}

const all: CatalogEntry[] = [
  { "sku": "1601820278025", "title": "High Quality Lower Bumper Grille 86522-1M600 Fit for 2012 for Kia Cerato Forte K3", vehicleBrand: "Kia", category: "CAR GRILLE", priceRange: "$16-17", moq: "5 pieces" },
  { "sku": "1601820163740", "title": "Factory Wholesale Front Bumper Grille 86350-1U000 for 2009-2013 for Kia Cerato", vehicleBrand: "Kia", category: "CAR GRILLE", priceRange: "$24-26", moq: "5 pieces" },
  { "sku": "1601820663814", "title": "Brand New Front Bumper Tow Hook Cover for 2015 for Lexus IS250", vehicleBrand: "Lexus", category: "BUMPER & COVER", priceRange: "$6-7", moq: "20 pieces" },
  { "sku": "1601777844941", "title": "Left & Right Front Fenders for 2012-2016 for Daihatsu Grand Max", vehicleBrand: "Daihatsu", category: "FENDER & DOOR", priceRange: "$50-60", moq: "5 pieces" },
  { "sku": "1601770335214", "title": "Rear Door Left & Right Driver Passenger Side for 2015 for Toyota Sienna", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$110-130", moq: "1 piece" },
  { "sku": "1601770277995", "title": "New Steel Tailgate for 2023 for Toyota Venza", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$100-120", moq: "1 piece" },
  { "sku": "1601777848553", "title": "Left & Right Front Fenders for 2014 for Nissan X-Trail", vehicleBrand: "Nissan", category: "FENDER & DOOR", priceRange: "$50-60", moq: "10 pieces" },
  { "sku": "1601783962423", "title": "Replacement Rear Tailgate Panel for 2020 for Isuzu D-MAX", vehicleBrand: "Isuzu", category: "TAILGATE & PANEL", priceRange: "$50-60", moq: "1 piece" },
  { "sku": "1601780046835", "title": "Steel Engine Hood Bonnet & ABS Hood Deflector Set for 2008-2012 Isuzu D-MAX", vehicleBrand: "Isuzu", category: "HOOD & BONNET", priceRange: "$70-90", moq: "1 piece" },
  { "sku": "1601780071807", "title": "Left & Right Front Doors for 2012 for Isuzu D-MAX", vehicleBrand: "Isuzu", category: "FENDER & DOOR", priceRange: "$90-100", moq: "1 piece" },
  { "sku": "1601780104695", "title": "Steel Rear Gate Tailgate Assembly for 2017 for Isuzu D-MAX", vehicleBrand: "Isuzu", category: "TAILGATE & PANEL", priceRange: "$70-80", moq: "1 piece" },
  { "sku": "1601780165374", "title": "Twin Swing Rear Tailgate for 2012 for Isuzu D-MAX Pickup", vehicleBrand: "Isuzu", category: "TAILGATE & PANEL", priceRange: "$55-60", moq: "1 piece" },
  { "sku": "1601783883761", "title": "Steel Upper Radiator Mounting Bracket Reinforcement LH RH for 2012 Isuzu D-MAX", vehicleBrand: "Isuzu", category: "BRACKET & SUPPORT", priceRange: "$60-70", moq: "1 piece" },
  { "sku": "1601783927545", "title": "Factory Replacement Steel Radiator Support Structure for 2020 Isuzu D-MAX", vehicleBrand: "Isuzu", category: "BRACKET & SUPPORT", priceRange: "$60-65", moq: "1 piece" },
  { "sku": "1601783980339", "title": "Modified Engine Hood for 2021 for Isuzu D-MAX", vehicleBrand: "Isuzu", category: "HOOD & BONNET", priceRange: "$90-110", moq: "1 piece" },
  { "sku": "1601784004007", "title": "Left & Right Front Fenders for 2012 for Isuzu D-MAX 4WD", vehicleBrand: "Isuzu", category: "FENDER & DOOR", priceRange: "$65-75", moq: "10 pieces" },
  { "sku": "1601780080796", "title": "Rear Cargo Tailgate Panel for 2012 for Isuzu D-MAX", vehicleBrand: "Isuzu", category: "TAILGATE & PANEL", priceRange: "$60-80", moq: "1 piece" },
  { "sku": "1601780083673", "title": "Steel Rear Tailgate for 2017 for Isuzu D-MAX Pickup Truck", vehicleBrand: "Isuzu", category: "TAILGATE & PANEL", priceRange: "$55-60", moq: "1 unit" },
  { "sku": "1601780178085", "title": "2004-2007 for Great Wall Wingle Rear Middle Door Set (LH/RH)", vehicleBrand: "Great Wall", category: "FENDER & DOOR", priceRange: "$90-100", moq: "1 piece" },
  { "sku": "1601783897618", "title": "Engine Hood Bonnet for 2017 for Isuzu D-MAX", vehicleBrand: "Isuzu", category: "HOOD & BONNET", priceRange: "$100-120", moq: "1 piece" },
  { "sku": "1601783929515", "title": "Steel Roof Assembly for 2012 for Isuzu D-MAX Pickup", vehicleBrand: "Isuzu", category: "ROOF & PANEL", priceRange: "$55-65", moq: "1 piece" },
  { "sku": "1601783975319", "title": "Left & Right Rear Middle Doors for 2020 for Isuzu D-MAX", vehicleBrand: "Isuzu", category: "FENDER & DOOR", priceRange: "$110-130", moq: "1 piece" },
  { "sku": "1601783998123", "title": "Genuine Quality Steel Tailgate for 2017 for Isuzu D-MAX", vehicleBrand: "Isuzu", category: "TAILGATE & PANEL", priceRange: "$60-70", moq: "1 piece" },
  { "sku": "1601779415137", "title": "Primed Front Door Set (Left/Right) for 2004-2007 Great Wall Wingle", vehicleBrand: "Great Wall", category: "FENDER & DOOR", priceRange: "$90-100", moq: "1 piece" },
  { "sku": "1601780028959", "title": "Steel Side Outer Panel for 2004-2007 for Great Wall Wingle", vehicleBrand: "Great Wall", category: "SIDE PANEL", priceRange: "$110-120", moq: "1 piece" },
  { "sku": "1601780080854", "title": "Left & Right Front Side Doors for 2012 for Isuzu Rui Mai RE-MAX", vehicleBrand: "Isuzu", category: "FENDER & DOOR", priceRange: "$70-80", moq: "1 piece" },
  { "sku": "1601780159249", "title": "Full Steel Side Panel & Door Panel for 2012 for Isuzu D-MAX", vehicleBrand: "Isuzu", category: "SIDE PANEL", priceRange: "$110-130", moq: "1 piece" },
  { "sku": "1601784018073", "title": "Left & Right Front Doors for 2020 for Isuzu D-MAX", vehicleBrand: "Isuzu", category: "FENDER & DOOR", priceRange: "$100-120", moq: "1 piece" },
  { "sku": "1601780035978", "title": "Topones Left & Right Rear Middle Doors for 2008-2012 Great Wall Wingle", vehicleBrand: "Great Wall", category: "FENDER & DOOR", priceRange: "$85-100", moq: "1 piece" },
  { "sku": "1601780107652", "title": "Left & Right Rear Middle Doors for 2012 for Isuzu D-MAX", vehicleBrand: "Isuzu", category: "FENDER & DOOR", priceRange: "$80-90", moq: "1 piece" },
  { "sku": "1601780143497", "title": "High Quality Car Engine Bonnet for 2012 for Isuzu D-MAX", vehicleBrand: "Isuzu", category: "HOOD & BONNET", priceRange: "$75-80", moq: "1 piece" },
  { "sku": "1601783865883", "title": "Left & Right Front Fenders for 2012 for Isuzu D-MAX 2WD", vehicleBrand: "Isuzu", category: "FENDER & DOOR", priceRange: "$60-70", moq: "10 pieces" },
  { "sku": "1601783909528", "title": "Steel Rear Splash Guards LH RH for 2012 Isuzu D-MAX 2WD", vehicleBrand: "Isuzu", category: "MUDGUARD & FLAP", priceRange: "$90-110", moq: "1 piece" },
  { "sku": "1601783991307", "title": "High Quality Steel Engine Bonnet for 2021 for Isuzu D-MAX", vehicleBrand: "Isuzu", category: "HOOD & BONNET", priceRange: "$85-100", moq: "1 piece" },
  { "sku": "1601708329277", "title": "Car Roof Panel for 2005-2012 for Toyota Hilux Vigo Double Cabin", vehicleBrand: "Toyota", category: "ROOF & PANEL", priceRange: "$50-55", moq: "1 piece" },
  { "sku": "1601708440630", "title": "Left & Right Front Door for 2012 for Toyota Hilux Vigo Pickup", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$70-75", moq: "2 pieces" },
  { "sku": "1601710300971", "title": "Replacement Steel Front Mud Flaps for 2021 Toyota Hilux Revo 4WD", vehicleBrand: "Toyota", category: "MUDGUARD & FLAP", priceRange: "$55-60", moq: "1 piece" },
  { "sku": "1601711126299", "title": "High Quality Left & Right Front Mud Flaps for 2015 Toyota Hilux Revo", vehicleBrand: "Toyota", category: "MUDGUARD & FLAP", priceRange: "$30-40", moq: "1 piece" },
  { "sku": "1601708596030", "title": "Left & Right Front Mudguards for 2012 Toyota Hilux Vigo", vehicleBrand: "Toyota", category: "MUDGUARD & FLAP", priceRange: "$50-60", moq: "5 pieces" },
  { "sku": "1601709041449", "title": "Roof Panel for 2012 for Toyota Hilux Vigo Pickup", vehicleBrand: "Toyota", category: "ROOF & PANEL", priceRange: "$50-55", moq: "10 pieces" },
  { "sku": "1601709778998", "title": "Hood / Engine Cover for 2021 for Toyota Hilux Revo Double Cabin", vehicleBrand: "Toyota", category: "HOOD & BONNET", priceRange: "$60-65", moq: "1 piece" },
  { "sku": "1601713459171", "title": "Brand New OEM Steel Trunk Lid for 2014 for Toyota Vios Yaris", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$65-70", moq: "1 piece" },
  { "sku": "1601711960349", "title": "Brand New Rear Access Door for 2015 for Toyota Hilux Vigo", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$85-100", moq: "1 piece" },
  { "sku": "1601605885050", "title": "2018-2024 Jeep Wrangler JL Carbon Fiber Engine Hood Cover", vehicleBrand: "Jeep", category: "HOOD & BONNET", priceRange: "$198-204", moq: "5 pieces" },
  { "sku": "1601716693127", "title": "Left Rear Fender with Fuel Tank Hole for 2018 Toyota Camry", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$60-70", moq: "10 pieces" },
  { "sku": "1601716822270", "title": "Left & Right Front Door Panels for 2024 for Toyota Camry", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$65-75", moq: "1 piece" },
  { "sku": "1601719138498", "title": "Replacement Rear Right Quarter Panel for 2019 Toyota RAV4", vehicleBrand: "Toyota", category: "SIDE PANEL", priceRange: "$90-95", moq: "5 pieces" },
  { "sku": "1601715684249", "title": "Replacement Front Door Panels (L/R) for Toyota Camry 2015-2017", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$85-100", moq: "1 piece" },
  { "sku": "1601716653270", "title": "Right Rear Fender for 2018 for Toyota Camry", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$80-85", moq: "10 boxes" },
  { "sku": "1601719337468", "title": "High Quality Bolt-on Front Engine Hood for 2011 Toyota RAV4 (ME)", vehicleBrand: "Toyota", category: "HOOD & BONNET", priceRange: "$110-120", moq: "1 piece" },
  { "sku": "1601707606738", "title": "Tailgate for 2005-2012 for Toyota Hilux Vigo & Fortuner", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$55-60", moq: "1 piece" },
  { "sku": "1601707656643", "title": "Left & Right Front Mudguards for 2008 Toyota Hilux Vigo", vehicleBrand: "Toyota", category: "MUDGUARD & FLAP", priceRange: "$25-30", moq: "10 pieces" },
  { "sku": "1601715633477", "title": "High Quality Steel Engine Hood for 2018 Toyota Camry", vehicleBrand: "Toyota", category: "HOOD & BONNET", priceRange: "$70-80", moq: "1 piece" },
  { "sku": "1601719057942", "title": "Brand New Metal Trunk Lid Tailgate for 2019 Toyota RAV4", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$71-78", moq: "1 piece" },
  { "sku": "1601707741141", "title": "Center Opening Tailgate for 2005-2012 Toyota Hilux Vigo", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$55-60", moq: "1 piece" },
  { "sku": "1601707817179", "title": "Left Rear Mudguard for 2005-2012 Toyota Hilux Vigo", vehicleBrand: "Toyota", category: "MUDGUARD & FLAP", priceRange: "$55-65", moq: "1 piece" },
  { "sku": "1601716600409", "title": "CR Rear Body Panel Kit for 2018 for Toyota Camry", vehicleBrand: "Toyota", category: "SIDE PANEL", priceRange: "$35-40", moq: "5 pieces" },
  { "sku": "1601716785440", "title": "Left & Right Rear Door Panels for 2024 for Toyota Camry", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$75-85", moq: "1 piece" },
  { "sku": "1601717531161", "title": "Rear Tailgate Trunk Lid (CR) for 2024 for Toyota Camry", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$85-95", moq: "1 piece" },
  { "sku": "1601718227718", "title": "Brand New Tailgate Frame (Electric) for 2016 Toyota RAV4", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$100-110", moq: "1 piece" },
  { "sku": "1601718258486", "title": "Brand New Tailgate Frame (Manual) for 2016 Toyota RAV4", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$75-80", moq: "1 piece" },
  { "sku": "1601720204066", "title": "Brand New Fengcheng Steel Black Engine Hood for 2015 Toyota Highlander", vehicleBrand: "Toyota", category: "HOOD & BONNET", priceRange: "$90-110", moq: "1 piece" },
  { "sku": "1601720363041", "title": "Metal Rear Left Mud Flap for 2015 Toyota Highlander", vehicleBrand: "Toyota", category: "MUDGUARD & FLAP", priceRange: "$90-100", moq: "5 pieces" },
  { "sku": "1601717702421", "title": "Left Rear Quarter Panel for 2009-2013 Toyota RAV4", vehicleBrand: "Toyota", category: "SIDE PANEL", priceRange: "$45-50", moq: "10 pieces" },
  { "sku": "1601709817596", "title": "Engine Hood for 2015 for Toyota Hilux Revo Double Cabin", vehicleBrand: "Toyota", category: "HOOD & BONNET", priceRange: "$55-65", moq: "1 piece" },
  { "sku": "1601714214665", "title": "2023 for Toyota Yaris New Steel Trunk Lid", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$65-70", moq: "1 piece" },
  { "sku": "1601719126604", "title": "Replacement Rear Left Quarter Panel for 2019 Toyota RAV4", vehicleBrand: "Toyota", category: "SIDE PANEL", priceRange: "$85-95", moq: "5 pieces" },
  { "sku": "1601707682474", "title": "Steel Engine Hood for 2005-2012 Toyota Hilux Vigo", vehicleBrand: "Toyota", category: "HOOD & BONNET", priceRange: "$100-110", moq: "1 piece" },
  { "sku": "1601708469722", "title": "Left & Right Front Mudguards for 2012 Toyota Hilux Vigo", vehicleBrand: "Toyota", category: "MUDGUARD & FLAP", priceRange: "$50-60", moq: "10 pieces" },
  { "sku": "1601710676219", "title": "Front Fender (2WD) for 2015 Toyota Hilux Revo", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$15-25", moq: "1 piece" },
  { "sku": "1601714792508", "title": "Brand New Steel Left Rear Mud Flap for 2023 Toyota Yaris", vehicleBrand: "Toyota", category: "MUDGUARD & FLAP", priceRange: "$90-100", moq: "10 pieces" },
  { "sku": "1601719172212", "title": "2019 Toyota RAV4 Steel Front Hood Bonnet", vehicleBrand: "Toyota", category: "HOOD & BONNET", priceRange: "$65-70", moq: "1 piece" },
  { "sku": "1601719196024", "title": "Brand New Metal Front L/R Doors for 2019 Toyota RAV4", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$70-80", moq: "1 piece" },
  { "sku": "1601709622999", "title": "Factory Direct Dual Side Opening Tailgate for 2015 Toyota Hilux Revo", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$50-60", moq: "1 piece" },
  { "sku": "1601715566634", "title": "High Quality Trunk Lid for 2015-2017 Toyota Camry", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$110-125", moq: "1 piece" },
  { "sku": "1601717559114", "title": "Left & Right Front Mud Flaps & Fenders for 2024 Toyota Camry", vehicleBrand: "Toyota", category: "MUDGUARD & FLAP", priceRange: "$45-55", moq: "1 piece" },
  { "sku": "1601708453583", "title": "Steel Rear Tailgate Panel for 2012 Toyota Hilux Vigo", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$60-65", moq: "1 piece" },
  { "sku": "1601708482767", "title": "Radiator Support Panel for Toyota Hilux Vigo 2012+", vehicleBrand: "Toyota", category: "BRACKET & SUPPORT", priceRange: "$45-55", moq: "1 piece" },
  { "sku": "1601713935129", "title": "New Steel Rear Door Panel for 2014 Toyota Yaris", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$72-77", moq: "1 piece" },
  { "sku": "1601697745426", "title": "2014 Toyota Corolla US Version Mud Flaps Front L/R", vehicleBrand: "Toyota", category: "MUDGUARD & FLAP", priceRange: "$52-56", moq: "1 piece" },
  { "sku": "1601697767571", "title": "Right Rear Outer Fender for 2014 Toyota Corolla", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$73-75", moq: "10 pieces" },
  { "sku": "1601705584804", "title": "Mud Flaps for 2012 Toyota Hilux Vigo Single Cabin 4WD", vehicleBrand: "Toyota", category: "MUDGUARD & FLAP", priceRange: "$56-60", moq: "5 pieces" },
  { "sku": "1601705038965", "title": "Rear L/R Doors for 2022 Toyota Corolla Cross", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$105-110", moq: "1 set" },
  { "sku": "1601705168747", "title": "OEM Rear Liftgate with Backup Camera for 2022 Toyota Corolla Cross", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$96-106", moq: "1 piece" },
  { "sku": "1601705490807", "title": "Direct Fit Metal Tailgate Panel for 2022 Toyota Corolla Cross", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$60-65", moq: "5 pieces" },
  { "sku": "1601706834767", "title": "Center Opening Tailgate for 2005-2012 Toyota Hilux Vigo Single Cab", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$35-40", moq: "1 piece" },
  { "sku": "1601706913108", "title": "Center Opening Tailgate Without Holes for Toyota Hilux Vigo", vehicleBrand: "Toyota", category: "TAILGATE & PANEL", priceRange: "$35-40", moq: "1 piece" },
  { "sku": "1601697274227", "title": "Front L/R Fender Mud Flaps for 2014 Toyota Corolla", vehicleBrand: "Toyota", category: "MUDGUARD & FLAP", priceRange: "$27-30", moq: "10 pieces" },
  { "sku": "1601697697866", "title": "2014 Toyota Corolla Rear Fender Side Panel", vehicleBrand: "Toyota", category: "SIDE PANEL", priceRange: "$70-75", moq: "10 pieces" },
  { "sku": "1601705515512", "title": "Genuine Front Fenders for 2022 Toyota Corolla Cross", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$24-30", moq: "10 pieces" },
  { "sku": "1601705692620", "title": "Rear L/R Middle Doors for 2015 Toyota Hilux Vigo", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$80-87", moq: "1 piece" },
  { "sku": "1601706662783", "title": "Radiator Support for 2005-2012 Toyota Hilux Vigo", vehicleBrand: "Toyota", category: "BRACKET & SUPPORT", priceRange: "$29-32", moq: "5 pieces" },
  { "sku": "1601697713986", "title": "FENG CHENG Original Rear Body Panel for 2014 Toyota Corolla", vehicleBrand: "Toyota", category: "SIDE PANEL", priceRange: "$27-30", moq: "5 pieces" },
  { "sku": "1601704584923", "title": "New Steel Rear L/R Doors for 2019 Toyota Corolla", vehicleBrand: "Toyota", category: "FENDER & DOOR", priceRange: "$120-130", moq: "20 pieces" },
  { "sku": "1601799459963", "title": "Steel Bonnet with Holes for Nissan Patrol 1987-1997", vehicleBrand: "Nissan", category: "HOOD & BONNET", priceRange: "$160-170", moq: "1 piece" },
  { "sku": "1601801172045", "title": "High Strength Steel Hood for Nissan NV1500 2012-2021", vehicleBrand: "Nissan", category: "HOOD & BONNET", priceRange: "$92-100", moq: "10 pieces" },
  { "sku": "1601799572477", "title": "Steel Tailgate for Nissan Kicks P15 2018 Car Body Kit Auto Body Parts Wholesale", vehicleBrand: "Nissan", category: "TAILGATE & PANEL", priceRange: "Contact for price", moq: "Min. Order negotiable" },
  { "sku": "1601607008497", "title": "Factory 12V LED Tail Light for Triton L200 2015-2018 New Auto Lighting System with Smoke Black Frame", vehicleBrand: "Mitsubishi", category: "TAIL LIGHT", priceRange: "Contact for price", moq: "Min. Order negotiable" },
  { "sku": "1601599860364", "title": "New-Style Modified LED Rear Tail Lamps for Toyota Hiace Clear Lens with Red Color ABS Material", vehicleBrand: "Toyota", category: "TAIL LIGHT", priceRange: "Contact for price", moq: "Min. Order negotiable" },
  { "sku": "1601602184613", "title": "Modified Tail Lamps (Formula Style) for Toyota Tundra, Model Years 2014-2021", vehicleBrand: "Toyota", category: "TAIL LIGHT", priceRange: "Contact for price", moq: "Min. Order negotiable" },
  { "sku": "1601599848990", "title": "New LED Rear Tail Lamps for Jeep Wrangler JK Clear Lens 2008-2017 Model Years", vehicleBrand: "Jeep", category: "TAIL LIGHT", priceRange: "Contact for price", moq: "Min. Order negotiable" },
  { "sku": "1601606993293", "title": "LED Tail Lights Lamp Red Rear Brake Light Turn Signal DRL for 2015-2022 Hilux Vigo Revo Rocco", vehicleBrand: "Toyota", category: "TAIL LIGHT", priceRange: "Contact for price", moq: "Min. Order negotiable" },
  { "sku": "1601600058144", "title": "LED Tail Lights for Jeep Compass 2011-2016 Model Years Modified Rear Tail Lamps", vehicleBrand: "Jeep", category: "TAIL LIGHT", priceRange: "Contact for price", moq: "Min. Order negotiable" },
  { "sku": "1601599913799", "title": "New LED Rear Tail Lamps for Jeep Wrangler JL Tan/Yellowish-Brown Model Years 2018-2024", vehicleBrand: "Jeep", category: "TAIL LIGHT", priceRange: "Contact for price", moq: "Min. Order negotiable" },
  { "sku": "1601599388596", "title": "For Mitsubishi L200 05 LED Rear Tail Lamps, Model Year 2005", vehicleBrand: "Mitsubishi", category: "TAIL LIGHT", priceRange: "Contact for price", moq: "Min. Order negotiable" }
]

export function getCatalog(): CatalogEntry[] {
  return all
}

export function findInCatalog(sku: string): CatalogEntry | undefined {
  return all.find(p => p.sku === sku)
}

export function searchCatalog(q: string): CatalogEntry[] {
  const query = q.toLowerCase()
  return all.filter(p =>
    p.title.toLowerCase().includes(query) ||
    p.sku.includes(query) ||
    p.vehicleBrand.toLowerCase().includes(query)
  )
}

export function catalogByBrand(brand: string): CatalogEntry[] {
  return all.filter(p => p.vehicleBrand.toLowerCase() === brand.toLowerCase())
}

export function catalogByCategory(category: string): CatalogEntry[] {
  return all.filter(p => p.category === category)
}

export function catalogBrands(): string[] {
  return [...new Set(all.map(p => p.vehicleBrand))].sort()
}

export function catalogCategories(): string[] {
  return [...new Set(all.map(p => p.category))].sort()
}

export function slugForProduct(sku: string, title: string): string {
  return sku
}
