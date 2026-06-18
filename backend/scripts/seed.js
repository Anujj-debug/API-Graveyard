import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../src/config/db.js";
import API from "../src/modules/api-registry/models/api.model.js";

dotenv.config();

await connectDB();

await API.deleteMany({});

console.log("All APIs deleted");

const USER_ID = "6a135a381f3090aa7688afcc";

const apis = [
    // AI
    {
        name: "OpenAI",
        slug: "openai",
        description: "AI models for text, image and audio generation.",
        category: "AI",
        websiteUrl: "https://openai.com",
        docsUrl: "https://platform.openai.com/docs",
        company: "OpenAI",
        pricingModel: "Paid",
        officialStatus: "Active",
        communityStatus: "Active",
        addedBy: USER_ID,
    },

    {
        name: "Anthropic",
        slug: "anthropic",
        description: "Claude AI models and APIs.",
        category: "AI",
        websiteUrl: "https://anthropic.com",
        docsUrl: "https://docs.anthropic.com",
        company: "Anthropic",
        pricingModel: "Paid",
        officialStatus: "Active",
        communityStatus: "Stable",
        addedBy: USER_ID,
    },

    {
        name: "Google Gemini",
        slug: "google-gemini",
        description: "Google's multimodal AI platform.",
        category: "AI",
        websiteUrl: "https://ai.google.dev",
        docsUrl: "https://ai.google.dev/docs",
        company: "Google",
        pricingModel: "Freemium",
        officialStatus: "Active",
        communityStatus: "Active",
        addedBy: USER_ID,
    },

    {
        name: "Cohere",
        slug: "cohere",
        description: "Enterprise AI and language models.",
        category: "AI",
        websiteUrl: "https://cohere.com",
        docsUrl: "https://docs.cohere.com",
        company: "Cohere",
        pricingModel: "Paid",
        officialStatus: "Active",
        communityStatus: "Stable",
        addedBy: USER_ID,
    },

    {
        name: "Mistral",
        slug: "mistral",
        description: "Open-weight AI models and APIs.",
        category: "AI",
        websiteUrl: "https://mistral.ai",
        docsUrl: "https://docs.mistral.ai",
        company: "Mistral AI",
        pricingModel: "Freemium",
        officialStatus: "Active",
        communityStatus: "Active",
        addedBy: USER_ID,
    },

    // AUTH
    {
        name: "Clerk",
        slug: "clerk",
        description: "Authentication and user management platform.",
        category: "Auth",
        websiteUrl: "https://clerk.com",
        docsUrl: "https://clerk.com/docs",
        company: "Clerk",
        pricingModel: "Freemium",
        officialStatus: "Active",
        communityStatus: "Active",
        addedBy: USER_ID,
    },

    {
        name: "Auth0",
        slug: "auth0",
        description: "Identity and access management platform.",
        category: "Auth",
        websiteUrl: "https://auth0.com",
        docsUrl: "https://auth0.com/docs",
        company: "Auth0",
        pricingModel: "Freemium",
        officialStatus: "Active",
        communityStatus: "Stable",
        addedBy: USER_ID,
    },

    {
        name: "Firebase Auth",
        slug: "firebase-auth",
        description: "Authentication services by Google Firebase.",
        category: "Auth",
        websiteUrl: "https://firebase.google.com",
        docsUrl: "https://firebase.google.com/docs/auth",
        company: "Google",
        pricingModel: "Freemium",
        officialStatus: "Active",
        communityStatus: "Active",
        addedBy: USER_ID,
    },

    {
        name: "Supabase Auth",
        slug: "supabase-auth",
        description: "Authentication built into Supabase.",
        category: "Auth",
        websiteUrl: "https://supabase.com",
        docsUrl: "https://supabase.com/docs/guides/auth",
        company: "Supabase",
        pricingModel: "Open Source",
        officialStatus: "Active",
        communityStatus: "Active",
        addedBy: USER_ID,
    },

    {
        name: "Keycloak",
        slug: "keycloak",
        description: "Open source identity and access management.",
        category: "Auth",
        websiteUrl: "https://www.keycloak.org",
        docsUrl: "https://www.keycloak.org/documentation",
        company: "Keycloak",
        pricingModel: "Open Source",
        officialStatus: "Stable",
        communityStatus: "Stable",
        addedBy: USER_ID,
    },

    // PAYMENTS
    {
        name: "Stripe",
        slug: "stripe",
        description: "Online payment processing platform.",
        category: "Payments",
        websiteUrl: "https://stripe.com",
        docsUrl: "https://docs.stripe.com",
        company: "Stripe",
        pricingModel: "Paid",
        officialStatus: "Active",
        communityStatus: "Active",
        addedBy: USER_ID,
    },

    {
        name: "PayPal",
        slug: "paypal",
        description: "Global payments and checkout platform.",
        category: "Payments",
        websiteUrl: "https://paypal.com",
        docsUrl: "https://developer.paypal.com",
        company: "PayPal",
        pricingModel: "Paid",
        officialStatus: "Active",
        communityStatus: "Stable",
        addedBy: USER_ID,
    },

    {
        name: "Razorpay",
        slug: "razorpay",
        description: "Indian payment gateway API.",
        category: "Payments",
        websiteUrl: "https://razorpay.com",
        docsUrl: "https://razorpay.com/docs",
        company: "Razorpay",
        pricingModel: "Paid",
        officialStatus: "Active",
        communityStatus: "Active",
        addedBy: USER_ID,
    },

    {
        name: "Paddle",
        slug: "paddle",
        description: "Merchant of record payment platform.",
        category: "Payments",
        websiteUrl: "https://paddle.com",
        docsUrl: "https://developer.paddle.com",
        company: "Paddle",
        pricingModel: "Paid",
        officialStatus: "Active",
        communityStatus: "Stable",
        addedBy: USER_ID,
    },

    // COMMUNICATION
    {
        name: "Twilio",
        slug: "twilio",
        description: "SMS, Voice and Communication APIs.",
        category: "Communication",
        websiteUrl: "https://twilio.com",
        docsUrl: "https://www.twilio.com/docs",
        company: "Twilio",
        pricingModel: "Paid",
        officialStatus: "Active",
        communityStatus: "Active",
        addedBy: USER_ID,
    },
    {
        name: "Vonage",
        slug: "vonage",
        description: "Communication APIs for messaging, voice and verification.",
        category: "Communication",
        websiteUrl: "https://www.vonage.com",
        docsUrl: "https://developer.vonage.com",
        company: "Vonage",
        pricingModel: "Paid",
        officialStatus: "Active",
        communityStatus: "Stable",
        addedBy: USER_ID,
    },

    {
        name: "MessageBird",
        slug: "messagebird",
        description: "Cloud communication platform.",
        category: "Communication",
        websiteUrl: "https://www.messagebird.com",
        docsUrl: "https://developers.messagebird.com",
        company: "MessageBird",
        pricingModel: "Paid",
        officialStatus: "Active",
        communityStatus: "Maintenance",
        addedBy: USER_ID,
    },

    {
        name: "SendGrid",
        slug: "sendgrid",
        description: "Email delivery and email APIs.",
        category: "Communication",
        websiteUrl: "https://sendgrid.com",
        docsUrl: "https://docs.sendgrid.com",
        company: "Twilio",
        pricingModel: "Freemium",
        officialStatus: "Active",
        communityStatus: "Stable",
        addedBy: USER_ID,
    },

    {
        name: "Resend",
        slug: "resend",
        description: "Modern email API for developers.",
        category: "Communication",
        websiteUrl: "https://resend.com",
        docsUrl: "https://resend.com/docs",
        company: "Resend",
        pricingModel: "Freemium",
        officialStatus: "Active",
        communityStatus: "Active",
        addedBy: USER_ID,
    },

    // STORAGE


    {
        name: "Cloudinary",
        slug: "cloudinary",
        description: "Image and video management platform.",
        category: "Storage",
        websiteUrl: "https://cloudinary.com",
        docsUrl: "https://cloudinary.com/documentation",
        company: "Cloudinary",
        pricingModel: "Freemium",
        officialStatus: "Active",
        communityStatus: "Active",
        addedBy: USER_ID,
    },

    {
        name: "Uploadcare",
        slug: "uploadcare",
        description: "File uploading and media processing APIs.",
        category: "Storage",
        websiteUrl: "https://uploadcare.com",
        docsUrl: "https://uploadcare.com/docs",
        company: "Uploadcare",
        pricingModel: "Freemium",
        officialStatus: "Active",
        communityStatus: "Stable",
        addedBy: USER_ID,
    },

    {
        name: "ImageKit",
        slug: "imagekit",
        description: "Image optimization and CDN platform.",
        category: "Storage",
        websiteUrl: "https://imagekit.io",
        docsUrl: "https://docs.imagekit.io",
        company: "ImageKit",
        pricingModel: "Freemium",
        officialStatus: "Active",
        communityStatus: "Stable",
        addedBy: USER_ID,
    },

    // BACKEND

    {
        name: "Supabase",
        slug: "supabase",
        description: "Open source backend platform.",
        category: "Backend",
        websiteUrl: "https://supabase.com",
        docsUrl: "https://supabase.com/docs",
        company: "Supabase",
        pricingModel: "Open Source",
        officialStatus: "Active",
        communityStatus: "Active",
        addedBy: USER_ID,
    },

    {
        name: "Firebase",
        slug: "firebase",
        description: "Google backend platform for mobile and web apps.",
        category: "Backend",
        websiteUrl: "https://firebase.google.com",
        docsUrl: "https://firebase.google.com/docs",
        company: "Google",
        pricingModel: "Freemium",
        officialStatus: "Active",
        communityStatus: "Active",
        addedBy: USER_ID,
    },

    {
        name: "MongoDB Atlas",
        slug: "mongodb-atlas",
        description: "Managed MongoDB database service.",
        category: "Backend",
        websiteUrl: "https://www.mongodb.com/atlas",
        docsUrl: "https://www.mongodb.com/docs/atlas",
        company: "MongoDB",
        pricingModel: "Freemium",
        officialStatus: "Active",
        communityStatus: "Active",
        addedBy: USER_ID,
    },

    {
        name: "Neon",
        slug: "neon",
        description: "Serverless PostgreSQL platform.",
        category: "Backend",
        websiteUrl: "https://neon.tech",
        docsUrl: "https://neon.tech/docs",
        company: "Neon",
        pricingModel: "Freemium",
        officialStatus: "Active",
        communityStatus: "Stable",
        addedBy: USER_ID,
    },

    {
        name: "PlanetScale",
        slug: "planetscale",
        description: "MySQL database platform for developers.",
        category: "Backend",
        websiteUrl: "https://planetscale.com",
        docsUrl: "https://planetscale.com/docs",
        company: "PlanetScale",
        pricingModel: "Freemium",
        officialStatus: "Active",
        communityStatus: "Stable",
        addedBy: USER_ID,
    },
];

const insertedApis = await API.insertMany(apis);

const apiMap = {};

insertedApis.forEach((api) => {
    apiMap[api.name] = api;
});

//AI Alternatives
await API.findByIdAndUpdate(apiMap["OpenAI"]._id, {
    alternatives: [
        apiMap["Anthropic"]._id,
        apiMap["Google Gemini"]._id,
        apiMap["Mistral"]._id,
    ],
});
await API.findByIdAndUpdate(apiMap["Anthropic"]._id, {
    alternatives: [
        apiMap["OpenAI"]._id,
        apiMap["Google Gemini"]._id,
        apiMap["Mistral"]._id,
    ],
});

await API.findByIdAndUpdate(apiMap["Google Gemini"]._id, {
    alternatives: [
        apiMap["OpenAI"]._id,
        apiMap["Anthropic"]._id,
        apiMap["Mistral"]._id,
    ],
});

await API.findByIdAndUpdate(apiMap["Mistral"]._id, {
    alternatives: [
        apiMap["OpenAI"]._id,
        apiMap["Anthropic"]._id,
        apiMap["Google Gemini"]._id,
    ],
});

//Payment Alternatives
await API.findByIdAndUpdate(apiMap["Stripe"]._id, {
    alternatives: [
        apiMap["PayPal"]._id,
        apiMap["Razorpay"]._id,
        apiMap["Paddle"]._id,
    ],
});
await API.findByIdAndUpdate(apiMap["PayPal"]._id, {
    alternatives: [
        apiMap["Stripe"]._id,
        apiMap["Razorpay"]._id,
        apiMap["Paddle"]._id,
    ],
});

await API.findByIdAndUpdate(apiMap["Razorpay"]._id, {
    alternatives: [
        apiMap["Stripe"]._id,
        apiMap["PayPal"]._id,
        apiMap["Paddle"]._id,
    ],
});

await API.findByIdAndUpdate(apiMap["Paddle"]._id, {
    alternatives: [
        apiMap["Stripe"]._id,
        apiMap["PayPal"]._id,
        apiMap["Razorpay"]._id,
    ],
});

//Comminication Alternatives
await API.findByIdAndUpdate(apiMap["Twilio"]._id, {
    alternatives: [
        apiMap["Vonage"]._id,
        apiMap["MessageBird"]._id,
    ],
});
await API.findByIdAndUpdate(apiMap["Vonage"]._id, {
    alternatives: [
        apiMap["Twilio"]._id,
        apiMap["MessageBird"]._id,
    ],
});

await API.findByIdAndUpdate(apiMap["MessageBird"]._id, {
    alternatives: [
        apiMap["Twilio"]._id,
        apiMap["Vonage"]._id,
    ],
});

//Auth Alternatives
await API.findByIdAndUpdate(apiMap["Auth0"]._id, {
    alternatives: [
        apiMap["Clerk"]._id,
        apiMap["Firebase Auth"]._id,
        apiMap["Keycloak"]._id,
    ],
});
await API.findByIdAndUpdate(apiMap["Clerk"]._id, {
    alternatives: [
        apiMap["Auth0"]._id,
        apiMap["Firebase Auth"]._id,
        apiMap["Keycloak"]._id,
    ],
});

await API.findByIdAndUpdate(apiMap["Firebase Auth"]._id, {
    alternatives: [
        apiMap["Auth0"]._id,
        apiMap["Clerk"]._id,
        apiMap["Keycloak"]._id,
    ],
});

await API.findByIdAndUpdate(apiMap["Keycloak"]._id, {
    alternatives: [
        apiMap["Auth0"]._id,
        apiMap["Clerk"]._id,
        apiMap["Firebase Auth"]._id,
    ],
});

// Storage Alternatives
await API.findByIdAndUpdate(apiMap["Cloudinary"]._id, {
    alternatives: [
        apiMap["Uploadcare"]._id,
        apiMap["ImageKit"]._id,
    ],
});
await API.findByIdAndUpdate(apiMap["Uploadcare"]._id, {
    alternatives: [
        apiMap["Cloudinary"]._id,
        apiMap["ImageKit"]._id,
    ],
});

await API.findByIdAndUpdate(apiMap["ImageKit"]._id, {
    alternatives: [
        apiMap["Cloudinary"]._id,
        apiMap["Uploadcare"]._id,
    ],
});

// Backend Alternatives
await API.findByIdAndUpdate(apiMap["Supabase"]._id, {
    alternatives: [
        apiMap["Firebase"]._id,
        apiMap["MongoDB Atlas"]._id,
        apiMap["Neon"]._id,
        apiMap["PlanetScale"]._id,
    ],
});
await API.findByIdAndUpdate(apiMap["Firebase"]._id, {
    alternatives: [
        apiMap["Supabase"]._id,
        apiMap["MongoDB Atlas"]._id,
        apiMap["Neon"]._id,
        apiMap["PlanetScale"]._id,
    ],
});

await API.findByIdAndUpdate(apiMap["MongoDB Atlas"]._id, {
    alternatives: [
        apiMap["Supabase"]._id,
        apiMap["Firebase"]._id,
        apiMap["Neon"]._id,
        apiMap["PlanetScale"]._id,
    ],
});

await API.findByIdAndUpdate(apiMap["Neon"]._id, {
    alternatives: [
        apiMap["Supabase"]._id,
        apiMap["Firebase"]._id,
        apiMap["MongoDB Atlas"]._id,
        apiMap["PlanetScale"]._id,
    ],
});

await API.findByIdAndUpdate(apiMap["PlanetScale"]._id, {
    alternatives: [
        apiMap["Supabase"]._id,
        apiMap["Firebase"]._id,
        apiMap["Neon"]._id,
        apiMap["MongoDB Atlas"]._id,
    ],
});

console.log(`Seeded ${insertedApis.length} APIs`);
console.log("Alternatives linked successfully");

process.exit(0);