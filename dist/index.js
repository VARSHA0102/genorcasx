// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import multer from "multer";
import { promises as fs } from "fs";
import mammoth from "mammoth";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  contacts;
  newsletters;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.newsletters = /* @__PURE__ */ new Map();
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Contact methods
  async insertContact(insertContact) {
    const id = randomUUID();
    const contact = {
      ...insertContact,
      company: insertContact.company || null,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contacts.set(id, contact);
    console.log(`Contact stored: ${contact.name} (${contact.email})`);
    return contact;
  }
  async getAllContacts() {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  // Newsletter methods
  async insertNewsletter(insertNewsletter) {
    const id = randomUUID();
    const newsletter = {
      ...insertNewsletter,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.newsletters.set(id, newsletter);
    console.log(`Newsletter subscription: ${newsletter.email}`);
    return newsletter;
  }
  async getNewsletterByEmail(email) {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email
    );
  }
  async getAllNewsletterSubscriptions() {
    return Array.from(this.newsletters.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
};
var storage = new MemStorage();

// server/emailService.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
var createTransporter = (forceReal = false) => {
  if (forceReal || process.env.GMAIL_USER || process.env.SMTP_HOST) {
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      return nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
          // Use App Password for Gmail
        }
      });
    }
    if (process.env.SMTP_HOST) {
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    }
    console.log("\u26A0\uFE0F  No email credentials configured. Emails will be logged to console.");
    return nodemailer.createTransport({
      streamTransport: true,
      newline: "unix",
      buffer: true
    });
  }
  return nodemailer.createTransport({
    streamTransport: true,
    newline: "unix",
    buffer: true
  });
};
var sendContactEmail = async (contactData) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: contactData.email,
    to: process.env.GMAIL_USER || "genorcasx@gmail.com",
    replyTo: contactData.email,
    subject: `New Contact Form Submission from ${contactData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0ea5e9, #3b82f6); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f8fafc;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Contact Details</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${contactData.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${contactData.email}</p>
            ${contactData.company ? `<p style="margin: 10px 0;"><strong>Company:</strong> ${contactData.company}</p>` : ""}
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="color: #1e293b; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #475569;">${contactData.message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
        
        <div style="background-color: #e2e8f0; padding: 20px; text-align: center; font-size: 14px; color: #64748b;">
          <p style="margin: 0;">This email was sent from the GenOrcasX contact form.</p>
        </div>
      </div>
    `
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    if (process.env.NODE_ENV === "development") {
      console.log("\u{1F4E7} [DEV] Contact Email Captured:");
      console.log(`To: ${mailOptions.to}`);
      console.log(`From: ${mailOptions.from}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log(`Contact: ${contactData.name} (${contactData.email})`);
      console.log(`Company: ${contactData.company || "N/A"}`);
      console.log(`Message: ${contactData.message}`);
      console.log("\u2705 Email captured successfully (development mode)");
    } else {
      console.log("Contact email sent:", info.messageId);
    }
    return { success: true, messageId: info.messageId || "dev-mode" };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return { success: false, error: error.message || "Email service error" };
  }
};
var sendWelcomeEmail = async (email) => {
  const transporter = createTransporter(true);
  const mailOptions = {
    from: process.env.GMAIL_USER || "genorcasx@gmail.com",
    to: email,
    subject: "Welcome to GenOrcasX Newsletter!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0ea5e9, #3b82f6); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Welcome to GenOrcasX!</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f8fafc;">
          <h2 style="color: #1e293b;">Thank you for subscribing!</h2>
          <p style="color: #475569; line-height: 1.6;">
            You're now part of our community and will receive updates about:
          </p>
          
          <ul style="color: #475569; line-height: 1.8;">
            <li>Latest AI tools and features</li>
            <li>Industry insights and best practices</li>
            <li>Product updates and announcements</li>
            <li>Exclusive content and early access</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://genorcasx.com/tools" style="background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Explore Our AI Tools
            </a>
          </div>
        </div>
        
        <div style="background-color: #e2e8f0; padding: 20px; text-align: center; font-size: 14px; color: #64748b;">
          <p style="margin: 0;">
            If you didn't sign up for this newsletter, you can 
            <a href="#" style="color: #0ea5e9;">unsubscribe here</a>.
          </p>
        </div>
      </div>
    `
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    if (process.env.GMAIL_USER && info.messageId !== "dev-mode") {
      console.log("\u{1F4E7} Newsletter Welcome Email Sent:");
      console.log(`To: ${email}`);
      console.log(`From: ${mailOptions.from}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log(`\u2705 Welcome email sent successfully! Message ID: ${info.messageId}`);
    } else {
      console.log("\u{1F4E7} [DEV] Newsletter Welcome Email Logged:");
      console.log(`To: ${email}`);
      console.log(`From: ${mailOptions.from}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log("\u2705 Email captured in development mode (no real email sent)");
      console.log("\u{1F4A1} To send real emails, set up Gmail credentials in .env file");
    }
    return { success: true, messageId: info.messageId || "dev-mode" };
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return { success: false, error: error.message || "Email service error" };
  }
};

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var newsletters = pgTable("newsletters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  company: true,
  message: true
});
var insertNewsletterSchema = createInsertSchema(newsletters).pick({
  email: true
});

// server/routes.ts
import { Tiktoken } from "js-tiktoken/lite";
import o200k_base from "js-tiktoken/ranks/o200k_base";
var upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB limit
  }
});
async function registerRoutes(app2) {
  app2.post("/api/tools/tokenize", async (req, res) => {
    try {
      const { text: text2 } = req.body;
      if (!text2 || typeof text2 !== "string") {
        return res.status(400).json({ error: "Text is required and must be a string" });
      }
      const encoder = new Tiktoken(o200k_base);
      const tokenIds = encoder.encode(text2);
      const tokens = tokenIds.map((id, i) => ({
        index: i + 1,
        token: encoder.decode([id]),
        id
      }));
      const result = {
        original_text: text2,
        model: "gpt-4o",
        token_count: tokenIds.length,
        tokens,
        statistics: {
          avg_token_length: tokens.reduce((sum, t) => sum + t.token.length, 0) / tokens.length,
          unique_tokens: [...new Set(tokens.map((t) => t.token))].length,
          character_count: text2.length,
          word_count: text2.trim().split(/\s+/).filter(Boolean).length
        }
      };
      res.json({ success: true, result });
    } catch (error) {
      console.error("Tokenization error:", error);
      res.status(500).json({ error: error.message || "Failed to tokenize text" });
    }
  });
  app2.post("/api/tools/chunk", async (req, res) => {
    try {
      const { text: text2, chunk_size, overlap = 0 } = req.body;
      if (!text2 || !chunk_size) {
        return res.status(400).json({ error: "Text and chunk_size are required" });
      }
      const chunkSizeNum = parseInt(chunk_size);
      const overlapNum = parseInt(overlap) || 0;
      if (chunkSizeNum <= 0) {
        return res.status(400).json({ error: "Chunk size must be positive" });
      }
      const encoder = new Tiktoken(o200k_base);
      const tokenIds = encoder.encode(text2);
      const chunks = [];
      let start = 0;
      while (start < tokenIds.length) {
        const end = Math.min(start + chunkSizeNum, tokenIds.length);
        const chunkTokenIds = tokenIds.slice(start, end);
        const chunkText = encoder.decode(chunkTokenIds);
        chunks.push({
          index: chunks.length + 1,
          content: chunkText,
          length: chunkText.length,
          token_count: chunkTokenIds.length,
          start_token_index: start,
          end_token_index: end - 1,
          word_count: chunkText.trim().split(/\s+/).filter(Boolean).length
        });
        start = Math.max(start + chunkSizeNum - overlapNum, start + 1);
      }
      const result = {
        original_text: text2,
        chunk_size: chunkSizeNum,
        overlap: overlapNum,
        total_chunks: chunks.length,
        chunks,
        statistics: {
          total_characters: text2.length,
          total_tokens: tokenIds.length,
          avg_chunk_length: chunks.reduce((sum, c) => sum + c.length, 0) / chunks.length,
          avg_tokens_per_chunk: chunks.reduce((sum, c) => sum + c.token_count, 0) / chunks.length,
          coverage_percentage: chunks.map((c) => c.content).join("").length / text2.length * 100
        }
      };
      res.json({ success: true, result });
    } catch (error) {
      console.error("Chunking error:", error);
      res.status(500).json({ error: "Failed to chunk text" });
    }
  });
  app2.post("/api/tools/chat", async (req, res) => {
    try {
      const { groq_api_key, message, model = "llama-3.1-8b-instant" } = req.body;
      if (!groq_api_key || !message) {
        return res.status(400).json({ error: "Groq API key and message are required" });
      }
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groq_api_key}`
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: "You are a helpful AI assistant created by GenOrcasX. Provide clear, accurate, and helpful responses."
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 1e3
        })
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Groq API error: ${error}`);
      }
      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content;
      const result = {
        model_used: model,
        user_message: message,
        assistant_response: assistantMessage,
        tokens_used: data.usage?.total_tokens || 0,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        metadata: {
          finish_reason: data.choices[0]?.finish_reason,
          prompt_tokens: data.usage?.prompt_tokens,
          completion_tokens: data.usage?.completion_tokens
        }
      };
      res.json({ success: true, result });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message || "Failed to process chat request" });
    }
  });
  app2.post("/api/tools/embed", async (req, res) => {
    try {
      const { text: text2, model, dimensions, apikey } = req.body;
      if (!text2 || !model?.trim()) {
        return res.status(400).json({ error: "Text and model are required" });
      }
      if (apikey?.trim()) {
        const selectedModel = model;
        const response = await fetch("https://api.openai.com/v1/embeddings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apikey}`
          },
          body: JSON.stringify({
            input: text2,
            model: selectedModel,
            ...dimensions ? { dimensions: parseInt(dimensions) } : {}
          })
        });
        if (!response.ok) {
          const errorText = await response.text();
          return res.status(response.status).json({ error: `OpenAI error: ${errorText}` });
        }
        const result2 = await response.json();
        const embedding = result2.data?.[0]?.embedding;
        return res.json({
          success: true,
          result: {
            text: text2,
            model_used: selectedModel,
            dimensions: embedding.length,
            embedding,
            statistics: {
              text_length: text2.length,
              word_count: text2.split(/\s+/).length,
              vector_magnitude: Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0)),
              min_value: Math.min(...embedding),
              max_value: Math.max(...embedding)
            },
            note: "This is a real embedding from OpenAI."
          }
        });
      }
      const mockEmbedding = Array.from({ length: dimensions || 1536 }, () => Math.random() * 2 - 1);
      const result = {
        text: text2,
        model_used: model,
        dimensions: mockEmbedding.length,
        embedding: mockEmbedding,
        statistics: {
          text_length: text2.length,
          word_count: text2.split(/\s+/).length,
          vector_magnitude: Math.sqrt(mockEmbedding.reduce((sum, val) => sum + val * val, 0)),
          min_value: Math.min(...mockEmbedding),
          max_value: Math.max(...mockEmbedding)
        },
        note: "This is a demo embedding. Provide OpenAI API key for real embeddings."
      };
      res.json({ success: true, result });
    } catch (error) {
      console.error("Embedding error:", error);
      res.status(500).json({ error: "Failed to generate embeddings" });
    }
  });
  app2.post("/api/tools/evaluate", async (req, res) => {
    try {
      const { model_responses, ground_truth, metrics = "basic" } = req.body;
      if (!model_responses) {
        return res.status(400).json({ error: "Model responses are required" });
      }
      const responses = model_responses.split("\n").filter((r) => r.trim());
      const truths = ground_truth ? ground_truth.split("\n").filter((r) => r.trim()) : [];
      const evaluation = {
        response_count: responses.length,
        avg_response_length: responses.reduce((sum, r) => sum + r.length, 0) / responses.length,
        total_words: responses.reduce((sum, r) => sum + r.split(/\s+/).length, 0),
        unique_words: [...new Set(responses.join(" ").split(/\s+/))].length,
        readability_scores: responses.map((response, index) => {
          const sentences = response.split(/[.!?]+/).filter((s) => s.trim()).length;
          const words = response.split(/\s+/).length;
          const avgWordsPerSentence = words / Math.max(sentences, 1);
          return {
            response_index: index + 1,
            word_count: words,
            sentence_count: sentences,
            avg_words_per_sentence: avgWordsPerSentence,
            readability_grade: Math.max(1, Math.min(12, avgWordsPerSentence - 5))
            // Simplified formula
          };
        }),
        similarity_analysis: truths.length > 0 ? responses.map((response, index) => {
          const truth = truths[index] || truths[0];
          const responseWords = new Set(response.toLowerCase().split(/\s+/));
          const truthWords = new Set(truth.toLowerCase().split(/\s+/));
          const intersection = new Set([...responseWords].filter((x) => truthWords.has(x)));
          const union = /* @__PURE__ */ new Set([...responseWords, ...truthWords]);
          return {
            response_index: index + 1,
            jaccard_similarity: intersection.size / union.size,
            common_words: intersection.size,
            response_unique_words: responseWords.size - intersection.size,
            truth_unique_words: truthWords.size - intersection.size
          };
        }) : null,
        overall_score: {
          consistency: responses.length > 1 ? 1 - new Set(responses).size / responses.length : 1,
          // How similar responses are
          completeness: Math.min(1, responses.join("").length / 1e3),
          // Arbitrary completeness metric
          relevance: truths.length > 0 ? responses.reduce((sum, resp, idx) => {
            const truth = truths[idx] || truths[0];
            return sum + (resp.length > 0 && truth.length > 0 ? 0.8 : 0.3);
          }, 0) / responses.length : 0.7
        }
      };
      res.json({ success: true, result: evaluation });
    } catch (error) {
      console.error("Evaluation error:", error);
      res.status(500).json({ error: "Failed to evaluate responses" });
    }
  });
  app2.post("/api/tools/rag", upload.single("file"), async (req, res) => {
    try {
      const { groq_api_key, openai_embed_key, query } = req.body;
      const file = req.file;
      if (!groq_api_key || !query) {
        return res.status(400).json({ error: "Groq API key and query are required" });
      }
      let documentText = "";
      if (file) {
        try {
          if (file.mimetype === "application/pdf") {
            const pdfParse = (await import("pdf-parse")).default;
            const dataBuffer = await fs.readFile(file.path);
            const pdfData = await pdfParse(dataBuffer);
            documentText = pdfData.text;
          } else if (file.mimetype.includes("word")) {
            const result2 = await mammoth.extractRawText({ path: file.path });
            documentText = result2.value;
          } else {
            documentText = await fs.readFile(file.path, "utf-8");
          }
          await fs.unlink(file.path);
        } catch (fileError) {
          console.error("File processing error:", fileError);
          documentText = "Sample document content for demonstration. Upload a real document for actual processing.";
        }
      } else {
        documentText = "No document provided. This is a sample RAG response using the query alone.";
      }
      const chunks = [];
      const chunkSize = 1e3;
      for (let i = 0; i < documentText.length; i += chunkSize) {
        chunks.push(documentText.slice(i, i + chunkSize));
      }
      const relevantChunks = chunks.slice(0, 3);
      const context = relevantChunks.join("\n\n");
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groq_api_key}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant. Answer the user's question based on the provided context. If the context doesn't contain relevant information, say so clearly."
            },
            {
              role: "user",
              content: `Context:
${context}

Question: ${query}

Please answer based on the provided context.`
            }
          ],
          temperature: 0.3,
          max_tokens: 800
        })
      });
      if (!response.ok) {
        throw new Error(`Groq API error: ${await response.text()}`);
      }
      const data = await response.json();
      const answer = data.choices[0]?.message?.content;
      const result = {
        query,
        document_info: {
          filename: file?.originalname || "No file",
          size: file?.size || 0,
          type: file?.mimetype || "unknown",
          text_length: documentText.length,
          chunks_created: chunks.length
        },
        relevant_chunks: relevantChunks.map((chunk, index) => ({
          index: index + 1,
          content: chunk.substring(0, 200) + (chunk.length > 200 ? "..." : ""),
          full_content: chunk
        })),
        answer,
        metadata: {
          model_used: "llama-3.1-8b-instant",
          tokens_used: data.usage?.total_tokens || 0,
          retrieval_method: "simple_chunking",
          context_length: context.length,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      };
      res.json({ success: true, result });
    } catch (error) {
      console.error("RAG error:", error);
      res.status(500).json({ error: error.message || "Failed to process RAG request" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.insertContact(validatedData);
      const emailResult = await sendContactEmail({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company || void 0,
        message: validatedData.message
      });
      let message = "Thank you for your message! We'll get back to you soon.";
      if (!emailResult.success) {
        console.error("Failed to send contact email:", emailResult.error);
        message = "Thank you for your message! We've received it and will get back to you soon. (Note: Email notification may be delayed)";
      }
      res.json({
        success: true,
        message,
        contact
      });
    } catch (error) {
      console.error("Contact form error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({
          error: "Please check your input data",
          details: error.errors
        });
      }
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });
  app2.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const existingSubscription = await storage.getNewsletterByEmail(validatedData.email);
      if (existingSubscription) {
        return res.json({
          success: true,
          message: "You're already subscribed to our newsletter!"
        });
      }
      const subscription = await storage.insertNewsletter(validatedData);
      const emailResult = await sendWelcomeEmail(validatedData.email);
      let message = "Thank you for subscribing! Check your email for confirmation.";
      if (!emailResult.success) {
        console.error("Failed to send welcome email:", emailResult.error);
        message = "Thank you for subscribing! You're now on our newsletter list. (Welcome email may be delayed)";
      }
      res.json({
        success: true,
        message,
        subscription
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({
          error: "Please provide a valid email address",
          details: error.errors
        });
      }
      res.status(500).json({ error: "Failed to subscribe to newsletter" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path2 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var vite_config_default = defineConfig({
  base: "./",
  // ✅ root-relative paths
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: "dist",
    // ✅ must be relative to root
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: void 0
      }
    }
  },
  server: {
    fs: {
      strict: true
    }
  },
  assetsInclude: ["**/*.md"]
});

// server/vite.ts
import { nanoid } from "nanoid";
var __dirname2 = path2.dirname(fileURLToPath2(import.meta.url));
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
