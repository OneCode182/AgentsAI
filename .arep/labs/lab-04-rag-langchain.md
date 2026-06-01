# Lab 04 — RAG with LangChain & Pinecone

## Overview
Introduction to Retrieval-Augmented Generation (RAG) using OpenAI, Pinecone, and LangChain. Two repositories demonstrating LLM chain fundamentals and a full RAG pipeline.

## Repositories
- **AREP-L4-P1**: LangChain LLM Chain Basics (prompt templates, LCEL chaining, streaming)
- **AREP-L4-P2**: Full RAG with Pinecone (document ingestion, vector indexing, agent-based retrieval)

## Achievements
- Built 7-section notebook covering LangChain core abstractions (P1)
- Built 10-section notebook implementing complete RAG pipeline (P2)
- Professional READMEs with badges, architecture diagrams, tables, and theoretical background
- Followed same scaffolding as L1–L3 (src/, requirements.txt, lab04-moodle.md)

## Main Topic
Retrieval-Augmented Generation (RAG) — combining semantic search with LLM generation

## Themes
- LLM chains and prompt engineering
- Vector embeddings and similarity search
- Document ingestion and chunking
- Tool-calling agents

## Technologies
- Python 3.11+
- LangChain 0.3+
- OpenAI (gpt-4o-mini, text-embedding-3-small)
- Pinecone Serverless
- BeautifulSoup4
- Jupyter Notebook

## Challenges
- LangChain API evolves rapidly — used latest v0.3+ APIs (init_chat_model, create_agent)
- Pinecone dimension must match embedding model (1536 for text-embedding-3-small)

## Conventions
- English-only documentation
- getpass for API key security
- Consistent directory structure across labs
