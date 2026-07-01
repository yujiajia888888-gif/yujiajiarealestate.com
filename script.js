const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const year = document.querySelector("[data-year]");
const languageButtons = document.querySelectorAll("[data-lang]");
const agencyListingsContainer = document.querySelector("[data-agency-listings]");
const listingsUpdated = document.querySelector("[data-listings-updated]");

const fallbackAgencyListings = [
  {
    id: "15606293",
    status: "For Lease",
    price: "$1,450/M",
    address: "#761 98 Rue Charlotte",
    location: "Ville-Marie, Montréal",
    beds: 1,
    bathrooms: 1,
    image: "https://realestate.marketingwebsites.ca/property-images/15606293/15606293-01.jpg",
    url: "https://expquebec.com/en/properties/mls/15606293",
  },
  {
    id: "16635321",
    status: "For Lease",
    price: "$2,100/M",
    address: "#201 2235 Route 133",
    location: "Saint-Jean-sur-Richelieu, Montérégie",
    beds: 3,
    bathrooms: 1,
    image: "https://realestate.marketingwebsites.ca/property-images/16635321/16635321-01.jpg",
    url: "https://expquebec.com/en/properties/mls/16635321",
  },
  {
    id: "28515632",
    status: "For Lease",
    price: "$1,900/M",
    address: "#202 2235 Route 133",
    location: "Saint-Jean-sur-Richelieu, Montérégie",
    beds: 3,
    bathrooms: 1,
    image: "https://realestate.marketingwebsites.ca/property-images/28515632/28515632-01.jpg",
    url: "https://expquebec.com/en/properties/mls/28515632",
  },
  {
    id: "26923064",
    status: "For Sale",
    price: "$309,000",
    address: "#304 110 Av. du Golf",
    location: "La Prairie, Montérégie",
    beds: 1,
    bathrooms: 1,
    image: "https://realestate.marketingwebsites.ca/property-images/26923064/26923064-01.jpg",
    url: "https://expquebec.com/en/properties/mls/26923064",
  },
  {
    id: "24566260",
    status: "For Sale",
    price: "$1,199,000",
    address: "8630 Rue Sherbrooke E.",
    location: "Mercier/Hochelaga-Maisonneuve, Montréal",
    beds: 0,
    bathrooms: 0,
    image: "https://realestate.marketingwebsites.ca/property-images/24566260/24566260-01.jpg",
    url: "https://expquebec.com/en/properties/mls/24566260",
  },
  {
    id: "16451247",
    status: "For Sale",
    price: "$98,000",
    address: "8630 Rue Sherbrooke E.",
    location: "Mercier/Hochelaga-Maisonneuve, Montréal",
    beds: 0,
    bathrooms: 0,
    image: "https://realestate.marketingwebsites.ca/property-images/16451247/16451247-01.jpg",
    url: "https://expquebec.com/en/properties/mls/16451247",
  },
  {
    id: "15377722",
    status: "For Sale",
    price: "$460,000",
    address: "#1628 1518 Rue Sherbrooke O.",
    location: "Ville-Marie, Montréal",
    beds: 1,
    bathrooms: 1,
    image: "https://realestate.marketingwebsites.ca/property-images/15377722/15377722-01.jpg",
    url: "https://expquebec.com/en/properties/mls/15377722",
  },
  {
    id: "18454919",
    status: "For Lease",
    price: "$1,550/M",
    address: "#1628 1518 Rue Sherbrooke O.",
    location: "Ville-Marie, Montréal",
    beds: 1,
    bathrooms: 1,
    image: "https://realestate.marketingwebsites.ca/property-images/18454919/18454919-01.jpg",
    url: "https://expquebec.com/en/properties/mls/18454919",
  },
];

const translations = {
  en: {
    "metadata.title": "Jiajia Yu Real Estate | yujiajiarealestate.ca",
    "metadata.description":
      "Jiajia Yu is a residential and commercial real estate broker serving Montreal, the South Shore, Laval, and Greater Montreal in English, French, and Mandarin Chinese.",
    "brand.role": "Real Estate Broker",
    "nav.listings": "Listings",
    "nav.services": "Services",
    "nav.guides": "Guides",
    "nav.areas": "Areas",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.open": "Open navigation",
    "hero.eyebrow": "Residential and commercial real estate broker",
    "hero.title": "Move with strategy in Greater Montreal.",
    "hero.copy":
      "Jiajia Yu helps buyers, sellers, and investors make clear real estate decisions across Montreal, the South Shore, Laval, and surrounding areas.",
    "hero.cta": "Book a Consultation",
    "hero.call": "Call 514-557-1514",
    "proof.languages": "Languages: English, French, Mandarin",
    "proof.guidance": "Residential and commercial guidance",
    "intro.eyebrow": "Clear guidance",
    "intro.title": "Built for serious decisions, not pressure.",
    "intro.copy1":
      "Real estate decisions are easier when the process is organized. Jiajia brings structure, discipline, and honest advice to each step, from search strategy and pricing context to offer terms and negotiation.",
    "intro.copy2":
      "Whether you are buying your first home, preparing to sell, reviewing a commercial opportunity, or comparing investment options, you get direct communication and a practical plan.",
    "listings.eyebrow": "Featured listings",
    "listings.title": "Featured listings and current eXp Québec listings.",
    "listings.copy":
      "Review Jiajia's featured listing links below, then browse every listing currently shown on his eXp Québec profile. Availability and prices can change, so use the source listing pages for the latest details.",
    "listings.loading": "Loading current eXp Québec listings...",
    "listings.error": "Current listings could not be loaded. Please open the eXp Québec profile for the latest inventory.",
    "listings.updated": "Auto-updated from eXp Québec",
    "listing.businessSale": "Business for sale",
    "listing.restaurant": "Restaurant",
    "listing.commercialSale": "Commercial building for sale",
    "listing.commercialResidential": "Commercial, Residential",
    "listing.condoSale": "Condo for sale",
    "listing.oneBedOneBath": "1 bedroom · 1 bathroom",
    "listing.twoBedOneBath": "2 bedrooms · 1 bathroom",
    "listing.threeBedOneBath": "3 bedrooms · 1 bathroom",
    "listing.threeBedTwoBath": "3 bedrooms · 2 bathrooms",
    "listing.apartmentRent": "Condo / Apartment for rent",
    "listing.houseRent": "Condominium house for rent",
    "listing.threeBedThreeBath": "3 bedrooms · 3 bathrooms",
    "listing.expAgency": "eXp agency listing",
    "listing.bedroomSingular": "bedroom",
    "listing.bedroomPlural": "bedrooms",
    "listing.bathroomSingular": "bathroom",
    "listing.bathroomPlural": "bathrooms",
    "listing.view": "View on Centris",
    "exp.eyebrow": "eXp Québec agency",
    "exp.title": "All current listings from Jiajia's eXp Québec profile.",
    "exp.copy":
      "This section loads every listing currently shown on Jiajia's eXp Québec profile. Use the agency listings button to browse the full eXp Québec inventory.",
    "exp.viewProfile": "View all eXp agency listings",
    "exp.viewAll": "View Jiajia's eXp profile",
    "exp.viewListing": "View on eXp Québec",
    "services.eyebrow": "Services",
    "services.title": "Support for buyers, sellers, and investors.",
    "services.buyers.title": "Buyer Representation",
    "services.buyers.copy": "Define criteria, compare properties, understand value, prepare offers, and move through closing.",
    "services.sellers.title": "Seller Strategy",
    "services.sellers.copy": "Prepare the property, position the price, plan the launch, qualify buyers, and negotiate carefully.",
    "services.commercial.title": "Commercial Real Estate",
    "services.commercial.copy": "Review location, property use, numbers, risk, and long-term fit before moving forward.",
    "services.investors.title": "Investor Guidance",
    "services.investors.copy": "Evaluate opportunities with discipline, clear assumptions, and practical market context.",
    "guides.eyebrow": "Client guides",
    "guides.title": "Buyer and seller guides inspired by OACIQ public resources.",
    "guides.copy":
      "These guides highlight the main decisions, documents, protections, and professional steps to understand before a residential purchase or sale in Québec.",
    "guides.buyers.title": "Buyer's Guide",
    "guides.buyers.step1": "Clarify your budget, financing capacity, closing costs, and search priorities.",
    "guides.buyers.step2": "Understand the broker's role, representation options, and the duties owed to you.",
    "guides.buyers.step3": "Review property information, seller declarations, visit notes, comparable sales, and market value.",
    "guides.buyers.step4": "Prepare the promise to purchase with clear price, inclusions, deadlines, inspection, and financing conditions.",
    "guides.buyers.step5": "Respond carefully to counter-proposals and keep every change documented in writing.",
    "guides.buyers.step6": "Complete conditions, coordinate the notary file, and sign the deed of sale when the transaction is ready.",
    "guides.buyers.source": "OACIQ residential purchase resource",
    "guides.sellers.title": "Seller's Guide",
    "guides.sellers.step1": "Review the brokerage contract, your obligations, remuneration terms, and the planned selling strategy.",
    "guides.sellers.step2": "Prepare declarations, documents, property details, photos, and a showing plan before marketing begins.",
    "guides.sellers.step3": "Position the asking price using market value, comparable properties, condition, and competition.",
    "guides.sellers.step4": "Study every promise to purchase, including price, conditions, deadlines, inclusions, and exclusions.",
    "guides.sellers.step5": "Negotiate counter-proposals in writing and understand how each new proposal changes the agreement.",
    "guides.sellers.step6": "Follow inspection, financing, and notary steps through to the deed of sale.",
    "guides.sellers.source": "OACIQ residential sale resource",
    "areas.eyebrow": "Service areas",
    "areas.title": "Montreal, South Shore, Laval.",
    "areas.copy":
      "Jiajia works across Greater Montreal and helps clients compare neighborhoods, property types, lifestyle needs, commute patterns, and resale signals before making a move.",
    "areas.montreal": "Urban condos, residential homes, and commercial opportunities.",
    "areas.southShore": "Family moves, lifestyle planning, and long-term value.",
    "areas.laval": "Residential and commercial guidance in a growing market.",
    "about.eyebrow": "About Jiajia",
    "about.title": "Strategy, honesty, and discipline.",
    "about.copy1":
      "Jiajia Yu is a residential and commercial real estate broker based in Greater Montreal. Fluent in English, French, and Mandarin Chinese, he helps buyers, sellers, and investors understand the market and make confident decisions.",
    "about.copy2":
      "With a background in real estate and personal training, Jiajia brings structure, responsibility, and client-focused service to every relationship.",
    "about.details": "Professional Details",
    "about.brokerageLabel": "Brokerage",
    "contact.eyebrow": "Contact",
    "contact.title": "Ready to talk about your next move?",
    "contact.copy": "Send a quick note and your email app will open with the details ready to send to Jiajia.",
    "form.name": "Name",
    "form.email": "Email",
    "form.interest": "Interest",
    "form.choose": "Choose one",
    "form.buying": "Buying a home",
    "form.selling": "Selling a property",
    "form.commercial": "Commercial real estate",
    "form.investment": "Investment property",
    "form.valuation": "Market valuation",
    "form.message": "Message",
    "form.placeholder": "Tell me what you are planning.",
    "form.submit": "Open Email Draft",
    "form.status": "Opening your email app with a draft message for Jiajia.",
    "form.subject": "Website inquiry from",
    "form.subjectFallback": "a client",
    "footer.copyright": "Jiajia Yu Real Estate. All rights reserved.",
    "footer.tagline": "Residential and Commercial Real Estate Broker · Greater Montreal",
  },
  fr: {
    "metadata.title": "Jiajia Yu Immobilier | yujiajiarealestate.ca",
    "metadata.description":
      "Jiajia Yu est courtier immobilier résidentiel et commercial dans le Grand Montréal, au service de Montréal, de la Rive-Sud, de Laval et des environs en anglais, français et mandarin.",
    "brand.role": "Courtier immobilier",
    "nav.listings": "Inscriptions",
    "nav.services": "Services",
    "nav.guides": "Guides",
    "nav.areas": "Secteurs",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.open": "Ouvrir la navigation",
    "hero.eyebrow": "Courtier immobilier résidentiel et commercial",
    "hero.title": "Avancez avec stratégie dans le Grand Montréal.",
    "hero.copy":
      "Jiajia Yu aide les acheteurs, vendeurs et investisseurs à prendre des décisions immobilières claires à Montréal, sur la Rive-Sud, à Laval et dans les environs.",
    "hero.cta": "Réserver une consultation",
    "hero.call": "Appeler 514-557-1514",
    "proof.languages": "Langues : anglais, français, mandarin",
    "proof.guidance": "Accompagnement résidentiel et commercial",
    "intro.eyebrow": "Conseils clairs",
    "intro.title": "Des décisions importantes, sans pression.",
    "intro.copy1":
      "Les décisions immobilières sont plus simples lorsque le processus est bien structuré. Jiajia apporte organisation, discipline et conseils honnêtes à chaque étape, de la stratégie de recherche au contexte de prix, en passant par les conditions d’offre et la négociation.",
    "intro.copy2":
      "Que vous achetiez votre première propriété, prépariez une vente, analysiez une occasion commerciale ou compariez des options d’investissement, vous recevez une communication directe et un plan pratique.",
    "listings.eyebrow": "Inscriptions en vedette",
    "listings.title": "Inscriptions en vedette et inscriptions eXp Québec actuelles.",
    "listings.copy":
      "Consultez les liens d'inscriptions en vedette de Jiajia, puis parcourez chaque inscription actuellement affichée sur son profil eXp Québec. La disponibilité et les prix peuvent changer; utilisez les pages sources pour les détails les plus récents.",
    "listings.loading": "Chargement des inscriptions eXp Québec actuelles...",
    "listings.error": "Les inscriptions actuelles n'ont pas pu être chargées. Ouvrez le profil eXp Québec pour l'inventaire le plus récent.",
    "listings.updated": "Mis à jour automatiquement depuis eXp Québec",
    "listing.businessSale": "Commerce à vendre",
    "listing.restaurant": "Restaurant",
    "listing.commercialSale": "Bâtiment commercial à vendre",
    "listing.commercialResidential": "Commercial, résidentiel",
    "listing.condoSale": "Condo à vendre",
    "listing.oneBedOneBath": "1 chambre · 1 salle de bain",
    "listing.twoBedOneBath": "2 chambres · 1 salle de bain",
    "listing.threeBedOneBath": "3 chambres · 1 salle de bain",
    "listing.threeBedTwoBath": "3 chambres · 2 salles de bain",
    "listing.apartmentRent": "Condo / Appartement à louer",
    "listing.houseRent": "Maison en copropriété à louer",
    "listing.threeBedThreeBath": "3 chambres · 3 salles de bain",
    "listing.expAgency": "Inscription de l'agence eXp",
    "listing.bedroomSingular": "chambre",
    "listing.bedroomPlural": "chambres",
    "listing.bathroomSingular": "salle de bain",
    "listing.bathroomPlural": "salles de bain",
    "listing.view": "Voir sur Centris",
    "exp.eyebrow": "Agence eXp Québec",
    "exp.title": "Toutes les inscriptions actuelles du profil eXp Québec de Jiajia.",
    "exp.copy":
      "Cette section charge chaque inscription actuellement affichée sur le profil eXp Québec de Jiajia. Utilisez le bouton des inscriptions de l'agence pour parcourir tout l'inventaire eXp Québec.",
    "exp.viewProfile": "Voir toutes les inscriptions eXp de l'agence",
    "exp.viewAll": "Voir le profil eXp de Jiajia",
    "exp.viewListing": "Voir sur eXp Québec",
    "services.eyebrow": "Services",
    "services.title": "Accompagnement pour acheteurs, vendeurs et investisseurs.",
    "services.buyers.title": "Représentation d’acheteurs",
    "services.buyers.copy": "Définir les critères, comparer les propriétés, comprendre la valeur, préparer les offres et avancer jusqu’à la clôture.",
    "services.sellers.title": "Stratégie de vente",
    "services.sellers.copy": "Préparer la propriété, positionner le prix, planifier le lancement, qualifier les acheteurs et négocier avec soin.",
    "services.commercial.title": "Immobilier commercial",
    "services.commercial.copy": "Analyser l’emplacement, l’usage, les chiffres, les risques et l’adéquation à long terme avant d’avancer.",
    "services.investors.title": "Conseils aux investisseurs",
    "services.investors.copy": "Évaluer les occasions avec discipline, hypothèses claires et contexte de marché pratique.",
    "guides.eyebrow": "Guides clients",
    "guides.title": "Guides acheteur et vendeur inspirés des ressources publiques de l'OACIQ.",
    "guides.copy":
      "Ces guides résument les principales décisions, documents, protections et étapes professionnelles à comprendre avant un achat ou une vente résidentielle au Québec.",
    "guides.buyers.title": "Guide de l'acheteur",
    "guides.buyers.step1": "Clarifier votre budget, votre capacité de financement, les frais de clôture et vos priorités de recherche.",
    "guides.buyers.step2": "Comprendre le rôle du courtier, les options de représentation et les devoirs envers vous.",
    "guides.buyers.step3": "Examiner les renseignements sur l'immeuble, les déclarations du vendeur, les notes de visite, les comparables et la valeur marchande.",
    "guides.buyers.step4": "Préparer la promesse d'achat avec prix, inclusions, délais, inspection et conditions de financement clairs.",
    "guides.buyers.step5": "Répondre avec prudence aux contre-propositions et documenter chaque changement par écrit.",
    "guides.buyers.step6": "Réaliser les conditions, coordonner le dossier notarial et signer l'acte de vente lorsque la transaction est prête.",
    "guides.buyers.source": "Ressource OACIQ sur l'achat résidentiel",
    "guides.sellers.title": "Guide du vendeur",
    "guides.sellers.step1": "Revoir le contrat de courtage, vos obligations, la rémunération et la stratégie de vente prévue.",
    "guides.sellers.step2": "Préparer les déclarations, documents, détails de propriété, photos et plan de visites avant la mise en marché.",
    "guides.sellers.step3": "Positionner le prix demandé selon la valeur marchande, les comparables, l'état de l'immeuble et la concurrence.",
    "guides.sellers.step4": "Étudier chaque promesse d'achat, y compris le prix, les conditions, les délais, les inclusions et les exclusions.",
    "guides.sellers.step5": "Négocier les contre-propositions par écrit et comprendre comment chaque nouvelle proposition modifie l'entente.",
    "guides.sellers.step6": "Suivre les étapes d'inspection, de financement et de notaire jusqu'à l'acte de vente.",
    "guides.sellers.source": "Ressource OACIQ sur la vente résidentielle",
    "areas.eyebrow": "Secteurs desservis",
    "areas.title": "Montréal, Rive-Sud, Laval.",
    "areas.copy":
      "Jiajia travaille dans le Grand Montréal et aide ses clients à comparer les quartiers, types de propriétés, besoins de style de vie, trajets et signaux de revente avant de passer à l’action.",
    "areas.montreal": "Condos urbains, maisons résidentielles et occasions commerciales.",
    "areas.southShore": "Déménagements familiaux, planification du mode de vie et valeur à long terme.",
    "areas.laval": "Accompagnement résidentiel et commercial dans un marché en croissance.",
    "about.eyebrow": "À propos de Jiajia",
    "about.title": "Stratégie, honnêteté et discipline.",
    "about.copy1":
      "Jiajia Yu est courtier immobilier résidentiel et commercial basé dans le Grand Montréal. Parlant anglais, français et mandarin, il aide les acheteurs, vendeurs et investisseurs à comprendre le marché et à prendre des décisions avec confiance.",
    "about.copy2":
      "Avec une expérience en immobilier et en entraînement personnel, Jiajia apporte structure, responsabilité et service axé sur le client à chaque relation.",
    "about.details": "Détails professionnels",
    "about.brokerageLabel": "Agence",
    "contact.eyebrow": "Contact",
    "contact.title": "Prêt à discuter de votre prochain projet?",
    "contact.copy": "Envoyez une courte note et votre application courriel ouvrira un message prêt à envoyer à Jiajia.",
    "form.name": "Nom",
    "form.email": "Courriel",
    "form.interest": "Intérêt",
    "form.choose": "Choisir une option",
    "form.buying": "Acheter une propriété",
    "form.selling": "Vendre une propriété",
    "form.commercial": "Immobilier commercial",
    "form.investment": "Propriété d’investissement",
    "form.valuation": "Évaluation du marché",
    "form.message": "Message",
    "form.placeholder": "Parlez-moi de votre projet.",
    "form.submit": "Ouvrir un brouillon courriel",
    "form.status": "Ouverture de votre application courriel avec un brouillon pour Jiajia.",
    "form.subject": "Demande du site web de",
    "form.subjectFallback": "un client",
    "footer.copyright": "Jiajia Yu Immobilier. Tous droits réservés.",
    "footer.tagline": "Courtier immobilier résidentiel et commercial · Grand Montréal",
  },
  zh: {
    "metadata.title": "Jiajia Yu 房地产 | yujiajiarealestate.ca",
    "metadata.description":
      "Jiajia Yu 是服务大蒙特利尔地区的住宅及商业地产经纪，服务范围包括蒙特利尔、南岸、拉瓦尔及周边地区，可用英语、法语和中文沟通。",
    "brand.role": "房地产经纪",
    "nav.listings": "房源",
    "nav.services": "服务",
    "nav.guides": "指南",
    "nav.areas": "服务区域",
    "nav.about": "关于",
    "nav.contact": "联系",
    "nav.open": "打开导航",
    "hero.eyebrow": "住宅及商业地产经纪",
    "hero.title": "在大蒙特利尔，用策略稳步前进。",
    "hero.copy":
      "Jiajia Yu 帮助买家、卖家和投资者在蒙特利尔、南岸、拉瓦尔及周边地区做出清晰的房地产决策。",
    "hero.cta": "预约咨询",
    "hero.call": "致电 514-557-1514",
    "proof.languages": "语言：英语、法语、中文",
    "proof.guidance": "住宅与商业地产服务",
    "intro.eyebrow": "清晰指导",
    "intro.title": "重要决定，需要策略，不需要压力。",
    "intro.copy1":
      "房地产决策在流程清楚时会更容易。Jiajia 在每一步提供结构、纪律和诚实建议，从找房策略、价格判断，到报价条件和谈判。",
    "intro.copy2":
      "无论您是购买第一套房、准备出售、评估商业机会，还是比较投资选择，您都会得到直接沟通和实用计划。",
    "listings.eyebrow": "精选房源",
    "listings.title": "精选房源和当前 eXp Québec 房源。",
    "listings.copy":
      "先查看 Jiajia 的精选房源链接，再浏览他 eXp Québec 资料页上当前显示的每一个房源。房源状态和价格可能变化，请以源页面的最新信息为准。",
    "listings.loading": "正在加载最新 eXp Québec 房源...",
    "listings.error": "当前房源暂时无法加载。请打开 eXp Québec 资料查看最新库存。",
    "listings.updated": "已从 eXp Québec 自动更新",
    "listing.businessSale": "生意出售",
    "listing.restaurant": "餐厅",
    "listing.commercialSale": "商业楼宇出售",
    "listing.commercialResidential": "商业、住宅",
    "listing.condoSale": "公寓出售",
    "listing.oneBedOneBath": "1 间卧室 · 1 间浴室",
    "listing.twoBedOneBath": "2 间卧室 · 1 间浴室",
    "listing.threeBedOneBath": "3 间卧室 · 1 间浴室",
    "listing.threeBedTwoBath": "3 间卧室 · 2 间浴室",
    "listing.apartmentRent": "公寓出租",
    "listing.houseRent": "共管住宅出租",
    "listing.threeBedThreeBath": "3 间卧室 · 3 间浴室",
    "listing.expAgency": "eXp 公司房源",
    "listing.bedroomSingular": "间卧室",
    "listing.bedroomPlural": "间卧室",
    "listing.bathroomSingular": "间浴室",
    "listing.bathroomPlural": "间浴室",
    "listing.view": "在 Centris 查看",
    "exp.eyebrow": "eXp Québec 公司",
    "exp.title": "Jiajia 的 eXp Québec 资料页上的全部当前房源。",
    "exp.copy":
      "本区块会载入 Jiajia eXp Québec 资料页当前显示的每一个房源。点击公司房源按钮可浏览 eXp Québec 的全部房源库存。",
    "exp.viewProfile": "查看 eXp 公司全部房源",
    "exp.viewAll": "查看 Jiajia 的 eXp 资料",
    "exp.viewListing": "在 eXp Québec 查看",
    "services.eyebrow": "服务",
    "services.title": "为买家、卖家和投资者提供支持。",
    "services.buyers.title": "买家代理",
    "services.buyers.copy": "明确需求、比较房源、判断价值、准备报价，并顺利推进到交割。",
    "services.sellers.title": "卖房策略",
    "services.sellers.copy": "准备物业、制定价格、规划上市、筛选买家，并谨慎谈判。",
    "services.commercial.title": "商业地产",
    "services.commercial.copy": "在行动前评估位置、用途、数字、风险和长期匹配度。",
    "services.investors.title": "投资指导",
    "services.investors.copy": "以纪律、清晰假设和实用市场背景来评估机会。",
    "guides.eyebrow": "客户指南",
    "guides.title": "参考 OACIQ 公众资源的买家与卖家指南。",
    "guides.copy": "这些指南总结在魁北克住宅买卖前应了解的主要决定、文件、保护机制和专业步骤。",
    "guides.buyers.title": "买家指南",
    "guides.buyers.step1": "先明确预算、贷款能力、成交费用和找房优先事项。",
    "guides.buyers.step2": "了解经纪角色、代理选择，以及经纪对您的专业义务。",
    "guides.buyers.step3": "查看物业资料、卖方声明、看房记录、可比成交和市场价值。",
    "guides.buyers.step4": "准备购买承诺时，清楚列明价格、包含项目、期限、验屋和贷款条件。",
    "guides.buyers.step5": "谨慎回应还价，并将每一次修改以书面方式记录。",
    "guides.buyers.step6": "完成条件、协调公证文件，并在交易准备好后签署买卖契约。",
    "guides.buyers.source": "OACIQ 住宅购买资源",
    "guides.sellers.title": "卖家指南",
    "guides.sellers.step1": "审阅经纪合约、您的义务、佣金条款和销售策略。",
    "guides.sellers.step2": "上市前准备卖方声明、文件、物业资料、照片和看房安排。",
    "guides.sellers.step3": "根据市场价值、可比物业、房屋状况和竞争情况制定挂牌价。",
    "guides.sellers.step4": "仔细审阅每一份购买承诺，包括价格、条件、期限、包含和不包含项目。",
    "guides.sellers.step5": "以书面方式谈判还价，并理解每一次新提案如何改变协议。",
    "guides.sellers.step6": "跟进验屋、贷款和公证步骤，直到签署买卖契约。",
    "guides.sellers.source": "OACIQ 住宅出售资源",
    "areas.eyebrow": "服务区域",
    "areas.title": "蒙特利尔、南岸、拉瓦尔。",
    "areas.copy":
      "Jiajia 服务大蒙特利尔地区，帮助客户在行动前比较社区、物业类型、生活需求、通勤和转售信号。",
    "areas.montreal": "城市公寓、住宅房屋和商业机会。",
    "areas.southShore": "家庭搬迁、生活规划和长期价值。",
    "areas.laval": "在成长市场中提供住宅与商业地产指导。",
    "about.eyebrow": "关于 Jiajia",
    "about.title": "策略、诚实与纪律。",
    "about.copy1":
      "Jiajia Yu 是大蒙特利尔地区的住宅及商业地产经纪。可用英语、法语和中文沟通，帮助买家、卖家和投资者了解市场并自信决策。",
    "about.copy2":
      "凭借房地产和私人训练背景，Jiajia 为每段客户关系带来结构、责任感和以客户为中心的服务。",
    "about.details": "专业信息",
    "about.brokerageLabel": "所属地产公司",
    "contact.eyebrow": "联系",
    "contact.title": "准备聊聊您的下一步计划吗？",
    "contact.copy": "发送一条简短信息，您的邮件应用会自动打开一封准备发送给 Jiajia 的草稿。",
    "form.name": "姓名",
    "form.email": "邮箱",
    "form.interest": "需求",
    "form.choose": "请选择",
    "form.buying": "买房",
    "form.selling": "卖房",
    "form.commercial": "商业地产",
    "form.investment": "投资物业",
    "form.valuation": "市场估价",
    "form.message": "留言",
    "form.placeholder": "请告诉我您的计划。",
    "form.submit": "打开邮件草稿",
    "form.status": "正在打开您的邮件应用，并生成发给 Jiajia 的草稿。",
    "form.subject": "网站咨询来自",
    "form.subjectFallback": "一位客户",
    "footer.copyright": "Jiajia Yu 房地产。保留所有权利。",
    "footer.tagline": "住宅及商业地产经纪 · 大蒙特利尔",
  },
};

let activeLanguage = "en";
let agencyListings = fallbackAgencyListings;
let agencyListingsGeneratedAt = null;

const getSavedLanguage = () => {
  try {
    return localStorage.getItem("site-language");
  } catch {
    return null;
  }
};

const saveLanguage = (language) => {
  try {
    localStorage.setItem("site-language", language);
  } catch {
    /* Ignore storage errors in private browsing or local file previews. */
  }
};

const t = (key) => translations[activeLanguage]?.[key] || translations.en[key] || key;

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });

const formatQuantity = (count, singularKey, pluralKey) => {
  if (!Number.isFinite(count)) return "";
  const label = count === 1 ? t(singularKey) : t(pluralKey);
  return activeLanguage === "zh" ? `${count} ${label}` : `${count} ${label}`;
};

const formatListingSpecs = (listing) =>
  [
    formatQuantity(listing.beds, "listing.bedroomSingular", "listing.bedroomPlural"),
    formatQuantity(listing.bathrooms, "listing.bathroomSingular", "listing.bathroomPlural"),
  ]
    .filter(Boolean)
    .join(" · ");

const formatGeneratedDate = (value) => {
  if (!value) return "";
  const locale = activeLanguage === "zh" ? "zh-Hans-CA" : activeLanguage === "fr" ? "fr-CA" : "en-CA";
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(value));
};

const renderListingsUpdated = () => {
  if (!listingsUpdated) return;
  const date = formatGeneratedDate(agencyListingsGeneratedAt);
  listingsUpdated.textContent = date ? `${t("listings.updated")} · ${date}` : "";
};

const renderAgencyListings = () => {
  if (!agencyListingsContainer) return;

  if (!agencyListings.length) {
    agencyListingsContainer.innerHTML = `<p class="listing-status">${escapeHtml(t("listings.error"))}</p>`;
    agencyListingsContainer.setAttribute("aria-busy", "false");
    renderListingsUpdated();
    return;
  }

  agencyListingsContainer.innerHTML = agencyListings
    .map(
      (listing) => `
        <article class="listing-card agency-listing-card">
          <img src="${escapeHtml(listing.image)}" alt="${escapeHtml(`eXp Québec listing at ${listing.address}`)}" loading="lazy" decoding="async" />
          <div class="listing-card-body">
            <div class="listing-meta">
              <span>${escapeHtml(t("listing.expAgency"))}</span>
              <strong>${escapeHtml(listing.price)}</strong>
            </div>
            <h3>${escapeHtml(listing.address)}</h3>
            <p>${escapeHtml(listing.location)}</p>
            <p class="listing-specs">${escapeHtml(formatListingSpecs(listing))}</p>
            <a class="listing-link" href="${escapeHtml(listing.url)}" target="_blank" rel="noopener">
              ${escapeHtml(t("exp.viewListing"))}
            </a>
          </div>
        </article>
      `,
    )
    .join("");

  agencyListingsContainer.setAttribute("aria-busy", "false");
  renderListingsUpdated();
};

const loadAgencyListings = async () => {
  if (!agencyListingsContainer) return;

  agencyListingsContainer.setAttribute("aria-busy", "true");

  try {
    const response = await fetch(`listings.json?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Listings request failed: ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.listings) || data.listings.length === 0) {
      throw new Error("Listings JSON is empty.");
    }

    agencyListings = data.listings;
    agencyListingsGeneratedAt = data.generatedAt || null;
  } catch (error) {
    console.warn(error);
  }

  renderAgencyListings();
};

const applyLanguage = (language) => {
  activeLanguage = translations[language] ? language : "en";
  document.documentElement.lang = activeLanguage === "zh" ? "zh-Hans" : activeLanguage;
  document.documentElement.dataset.language = activeLanguage;
  document.title = t("metadata.title");

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", t("metadata.description"));
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === activeLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderAgencyListings();
  saveLanguage(activeLanguage);
};

if (year) {
  year.textContent = new Date().getFullYear();
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
});

applyLanguage(getSavedLanguage() || "en");
loadAgencyListings();

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 10);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (nav && navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    header.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      header.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const interest = String(data.get("interest") || "").trim();
    const message = String(data.get("message") || "").trim();

    const body = [
      `${t("form.name")}: ${name}`,
      `${t("form.email")}: ${email}`,
      `${t("form.interest")}: ${interest}`,
      "",
      message,
    ].join("\n");

    const mailto = new URL("mailto:Yujiajia0514@hotmail.com");
    mailto.searchParams.set("subject", `${t("form.subject")} ${name || t("form.subjectFallback")}`);
    mailto.searchParams.set("body", body);

    formStatus.textContent = t("form.status");
    window.location.href = mailto.toString();
  });
}
