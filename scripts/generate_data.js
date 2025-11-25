const fs = require('fs');
const path = require('path');

const companiesCount = 15;
const reviewsPerCompany = 60;

const categories = [
  { name: "Bank", icon: "Landmark", slug: "bank" },
  { name: "Travel Insurance", icon: "Plane", slug: "travel-insurance" },
  { name: "Car Dealer", icon: "Car", slug: "car-dealer" },
  { name: "Furniture Store", icon: "Armchair", slug: "furniture-store" },
  { name: "Jewelry Store", icon: "Gem", slug: "jewelry-store" },
  { name: "Clothing Store", icon: "Shirt", slug: "clothing-store" },
  { name: "Electronics", icon: "Cpu", slug: "electronics" },
  { name: "Fitness", icon: "Dumbbell", slug: "fitness" },
  { name: "Pet Store", icon: "Dog", slug: "pet-store" },
  { name: "Energy Supplier", icon: "Zap", slug: "energy-supplier" },
  { name: "Real Estate", icon: "Home", slug: "real-estate" },
  { name: "Insurance", icon: "Shield", slug: "insurance" }
];

const companyNames = [
  "Travel Defenders", "Trusty Bank", "Comfy Sofas", "Sparkle Gems", "Tech Haven",
  "Fit Life", "Pet Paradise", "Green Energy", "Dream Homes", "Safe Guard",
  "Auto World", "Fashion Hub", "Gourmet Eats", "Health Plus", "Edu Learn"
];

const domains = companyNames.map(name => name.toLowerCase().replace(/\s+/g, '') + ".com");

const reviewTitles = [
  "Great service!", "Terrible experience", "Okay, but could be better", "Amazing!", "Not recommended",
  "Fast shipping", "Customer support was helpful", "Product arrived damaged", "Will buy again", "Scam alert",
  "Five stars", "One star", "Average", "Best in class", "Worst ever",
  "Highly recommended", "Avoid at all costs", "Good value", "Expensive but worth it", "Quick response"
];

const reviewContents = [
  "I had a wonderful experience with this company. The staff was friendly and helpful.",
  "I will never use this service again. They were rude and unhelpful.",
  "The product is okay, but the delivery took too long.",
  "Absolutely amazing! Exceeded my expectations.",
  "Do not waste your money here. It is a scam.",
  "Shipping was super fast, received it the next day.",
  "I had an issue but customer support resolved it quickly.",
  "The item arrived broken and they refused to refund me.",
  "I love this brand, will definitely purchase more.",
  "They took my money and never delivered the product.",
  "Everything was perfect.",
  "Complete disaster from start to finish.",
  "It's an average service, nothing special.",
  "The best quality I have seen in a long time.",
  "Worst customer service I have ever encountered.",
  "I highly recommend them to everyone.",
  "Stay away! You have been warned.",
  "Good value for the price.",
  "A bit pricey, but the quality justifies it.",
  "They responded to my email within minutes."
];

const generateReviews = (companyName) => {
  const reviews = [];
  for (let i = 0; i < reviewsPerCompany; i++) {
    const rating = Math.floor(Math.random() * 5) + 1;
    reviews.push({
      id: `rev-${Math.random().toString(36).substr(2, 9)}`,
      user: `User ${Math.floor(Math.random() * 1000)}`,
      rating: rating,
      title: reviewTitles[Math.floor(Math.random() * reviewTitles.length)],
      content: reviewContents[Math.floor(Math.random() * reviewContents.length)],
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      verified: Math.random() > 0.3
    });
  }
  return reviews;
};

const companyDescriptions = [
  // Travel Defenders
  `<h2>About Travel Defenders</h2>
<p>Travel Defenders is your trusted partner in comprehensive travel insurance solutions. With over 15 years of experience protecting travelers worldwide, we understand that peace of mind is essential when you're away from home.</p>
<h3>Our Mission</h3>
<p>We believe every journey should be worry-free. Our mission is to provide comprehensive coverage that protects you against unexpected events, from medical emergencies to trip cancellations, ensuring you can focus on creating memories.</p>
<h3>Why Choose Travel Defenders?</h3>
<ul>
<li>24/7 global emergency assistance in over 150 countries</li>
<li>Comprehensive coverage for medical emergencies, trip cancellations, and lost baggage</li>
<li>Fast claim processing with 95% approval rate</li>
<li>Competitive pricing with customizable plans</li>
<li>Award-winning customer service team</li>
</ul>
<h3>Our Services</h3>
<p>From single-trip coverage to annual multi-trip policies, we offer flexible solutions for leisure travelers, business professionals, and adventure seekers. Our policies include medical coverage up to $1M, emergency evacuation, and trip interruption benefits.</p>`,

  // Trusty Bank
  `<h2>Welcome to Trusty Bank</h2>
<p>Trusty Bank has been serving communities for over 50 years, providing innovative banking solutions that combine traditional values with modern technology. We're committed to helping individuals and businesses achieve their financial goals.</p>
<h3>Our Vision</h3>
<p>To be the most trusted financial partner in every community we serve, delivering personalized banking experiences that empower our customers to build a secure financial future.</p>
<h3>What Sets Us Apart</h3>
<ul>
<li>Personalized banking with dedicated relationship managers</li>
<li>Competitive interest rates on savings and loans</li>
<li>Advanced mobile and online banking platform</li>
<li>Free financial planning consultations</li>
<li>Community-focused with local decision-making</li>
</ul>
<h3>Products & Services</h3>
<p>We offer a full range of banking services including checking and savings accounts, mortgages, business loans, investment services, and wealth management. Our digital banking platform provides 24/7 access to your accounts with industry-leading security.</p>`,

  // Comfy Sofas
  `<h2>Discover Comfy Sofas</h2>
<p>Comfy Sofas has been crafting premium furniture for over 30 years, combining timeless design with exceptional comfort. Every piece is handcrafted by skilled artisans using sustainable materials and traditional techniques.</p>
<h3>Our Commitment</h3>
<p>We believe furniture should be an investment that lasts generations. Our commitment to quality craftsmanship, sustainable sourcing, and customer satisfaction drives everything we do.</p>
<h3>Why Customers Love Us</h3>
<ul>
<li>Handcrafted furniture made to order</li>
<li>Lifetime warranty on frame construction</li>
<li>Sustainable and ethically sourced materials</li>
<li>Free design consultation and room planning</li>
<li>White-glove delivery and setup service</li>
</ul>
<h3>Our Collections</h3>
<p>From contemporary sectionals to classic Chesterfields, our collections feature customizable options including fabric selection, cushion firmness, and configuration. Each piece is built to your specifications in our workshop.</p>`,

  // Sparkle Gems
  `<h2>About Sparkle Gems</h2>
<p>Sparkle Gems is a family-owned jewelry boutique specializing in ethically sourced diamonds and precious gemstones. For three generations, we've been helping customers celebrate life's special moments with exquisite, handcrafted jewelry.</p>
<h3>Our Philosophy</h3>
<p>We believe jewelry should tell a story. Each piece we create is a unique expression of love, achievement, or personal style, crafted with meticulous attention to detail and ethical sourcing practices.</p>
<h3>What Makes Us Special</h3>
<ul>
<li>Certified conflict-free diamonds and gemstones</li>
<li>Custom design services with master jewelers</li>
<li>Lifetime cleaning and inspection services</li>
<li>Transparent pricing with no hidden fees</li>
<li>Comprehensive insurance and appraisal services</li>
</ul>
<h3>Our Services</h3>
<p>Beyond our curated collection, we offer bespoke design services, jewelry repair, restoration of heirloom pieces, and professional appraisals. Our gemologists are GIA-certified and committed to helping you make informed decisions.</p>`,

  // Tech Haven
  `<h2>Welcome to Tech Haven</h2>
<p>Tech Haven is your destination for cutting-edge electronics and expert technical support. Since 2005, we've been helping customers navigate the ever-evolving world of technology with personalized service and competitive pricing.</p>
<h3>Our Mission</h3>
<p>To democratize technology by providing access to the latest innovations, expert guidance, and exceptional support that empowers everyone to leverage technology for work, creativity, and entertainment.</p>
<h3>Why Shop With Us</h3>
<ul>
<li>Price match guarantee on all products</li>
<li>Free technical support and setup assistance</li>
<li>Extended warranty options available</li>
<li>Trade-in program for old devices</li>
<li>Expert staff with manufacturer certifications</li>
</ul>
<h3>Products & Services</h3>
<p>We carry the latest laptops, smartphones, gaming systems, smart home devices, and accessories from top brands. Our services include device setup, data transfer, repairs, and custom PC building.</p>`,
];

const companies = companyNames.map((name, index) => {
  const reviews = generateReviews(name);
  const totalRating = reviews.reduce((acc, rev) => acc + rev.rating, 0);
  const avgRating = (totalRating / reviews.length).toFixed(1);

  return {
    id: `comp-${index}`,
    name: name,
    domain: domains[index],
    logo: `/logos/${domains[index]}.png`,
    rating: parseFloat(avgRating),
    reviewCount: reviews.length,
    location: "New York, USA",
    website: `https://www.${domains[index]}`,
    email: `support@${domains[index]}`,
    phone: "+1 555-0123",
    about: `${name} is a leading provider of quality services in their industry. We strive for customer satisfaction.`,
    description: companyDescriptions[index % companyDescriptions.length],
    ratingBreakdown: {
      serviceQuality: (Math.random() * 1 + 4).toFixed(1),
      communication: (Math.random() * 1 + 4).toFixed(1),
      delivery: (Math.random() * 1 + 4).toFixed(1),
      valueForMoney: (Math.random() * 1 + 4).toFixed(1),
      recommendation: (Math.random() * 1 + 4).toFixed(1)
    },
    reviews: reviews
  };
});

const homeData = {
  hero: {
    title: "Read reviews. Write reviews. Find companies you can trust.",
    subtitle: "Compare companies, check their reviews and find the best professionals.",
    searchPlaceholder: "Search for a company or category..."
  },
  categories: categories,
  recentReviews: companies.flatMap(c => c.reviews.slice(0, 1).map(r => ({
    ...r,
    company: c.name,
    companyDomain: c.domain,
    companyLogo: c.logo
  }))).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8)
};

fs.writeFileSync(path.join(__dirname, '../src/data/companies.json'), JSON.stringify(companies, null, 2));
fs.writeFileSync(path.join(__dirname, '../src/data/home.json'), JSON.stringify(homeData, null, 2));

console.log("Data generated successfully.");
